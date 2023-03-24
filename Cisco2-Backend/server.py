#libraries used
import os
from flask import Flask, jsonify, send_file, request
import requests
import json
from boxQRCode import boxQRCode
from PIL import Image
from sqlalchemy import create_engine, exc
from sqlalchemy.orm import scoped_session, sessionmaker

import numpy as np
from six.moves import urllib

# Database connection: 
engine=create_engine("postgresql://postgres:postgres@127.0.0.1:5432/postgres") 
db = scoped_session(sessionmaker(bind=engine))

### ---------- HELPER FUNCTIONS ---------- ### 

# Get env vars:
app = Flask(__name__)

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

#Description
def findKey(targetK, dCt):
    for ID_key in dCt.keys():
        
        if dCt[ID_key] == targetK:
            return ID_key
    return None

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

#Description
def stringtoinstr(dct, B_names, B_ID):
    ret = []
    for key in dct.keys():
        fbx = findKey( findKey(dct[key]['peer']['serialNumber'], B_names['names']['servers']), B_ID)
        rt = [int(key), int(fbx), int(dct[key]['peer']['port'] ) ]
        ret.append(rt)
    return ret

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

#Description
def wires_plaintext(wire_stack):
    plain_ret = []
    
    for singe_wire in wire_stack:
        plain_ret.append("connect switch port "+ str(singe_wire[0]) + " to server " + str(singe_wire[1]) + " at port " + str(singe_wire[2]))

    return plain_ret

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
        
#Description
def solveTOPO(inTopo, B_names, B_ID):

    #identify managment switch
    mgmtID = B_names['names']['switches']['mgmt']
    
    plain_text = {}
    instructions = {}
    switch_order = []

    curr_st = stringtoinstr(inTopo['switches'][mgmtID], B_names, B_ID)
    SSID = findKey( findKey(mgmtID, B_names['names']['switches']), B_ID)
    
    switch_order.append(SSID)
    instructions[str(SSID)] = curr_st
    plain_text[str(SSID)] = wires_plaintext(curr_st) 

    for key in inTopo['switches'].keys():
        if key != mgmtID:
            curr_st = stringtoinstr(inTopo['switches'][key], B_names, B_ID)
            
            SSID = findKey( findKey(key, B_names['names']['switches']), B_ID)
            switch_order.append( SSID )
            
            instructions[SSID] = curr_st
            plain_text[SSID] = wires_plaintext(curr_st)

            # for more complex topologies will check for path to mgmt switch from current switch

    retinstructions = {"order": switch_order, "instructions" : instructions, "plain_text" : plain_text}
    
    return retinstructions

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

#Description
def assignTOPO(inTopo, B_names, B_ID):

    catalog2 = {}
    for key, val in (B_names['names']['servers']).items():
        catalog2[key] = val

    for key, val in (B_names['names']['switches']).items():
        catalog2[key] = val

    final_topo = {}
    final_topo['rack'] = inTopo['rack']
    final_topo['servers'] = {}
    final_topo['switches'] = {}
    boxkeys = ['servers', 'switches']

    for bk in boxkeys:
        for key, val in (inTopo[bk]).items():
            sevTopo = {}
            for key2, val2 in (inTopo[bk][key]).items():
                serialNumber3 = catalog2[B_ID[ val2['peer']['boxNumber'] ] ]

                val3 = {'peer': {'port': val2['peer']['port'], 'serialNumber': serialNumber3}}

                sevTopo[key2] = val3

            final_topo[bk][catalog2[B_ID[key]] ] = sevTopo

    return final_topo

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

#Description
def getTOPOapi(urlLINK):
    U_R_L = urllib.request.urlopen(urlLINK)
        
    return [U_R_L.getcode(), json.loads(U_R_L.read())] [U_R_L.getcode()==200]

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

#Description
def run_test():
    prefect_WIRING = getTOPOapi(PREFECT_SERVER)

    prefect_MISTAKE = getTOPOapi(MISTAKE_SERVER)

    return prefect_MISTAKE == prefect_WIRING

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

#Description
def diff_wires(wires_has, wires_missing):
    retWires = []
    
    unk_wrong = np.unique(wires_has, axis=0)
    
    for i3 in range(len(unk_wrong)):
        matcher = (np.tile( unk_wrong[i3], (len(wires_missing), 1)) == wires_missing)*1
        matcher2 = matcher[:, 0]*matcher[:, 1]*matcher[:, 2]*matcher[:, 3]

        if( sum(matcher2) == 0):
            retWires.append( unk_wrong[i3])

    return retWires


#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

#Description
def generateNewInst(b_Names, b_IDs, mistake_server, perfect_server):    
    mistake_WIRING = getTOPOapi(mistake_server)
    
    #Makes a call to TopologytoInstructions program: requires server access
    wrongINST = solveTOPO(mistake_WIRING, b_Names, b_IDs)

    wrongWIRES = wrongINST['instructions']
    wrongWIRES2 = []
    for i2 in range(len(wrongWIRES)):
        if len(wrongWIRES[i2]) >0:
            wrongWIRES2.append(wrongWIRES[i2])

    wrongWIRES3 = []    

    for i2 in range(len(wrongWIRES2)):
        for x2 in range(len(wrongWIRES2[i2])):
            wrongWIRES3.append([int(wrongINST['order'][i2])] + wrongWIRES2[i2][x2])

    #------------------------------------------------------------------------------        
            
    prefect_WIRING = getTOPOapi(perfect_server)
    
    #Makes a call to TopologytoInstructions program: requires server access
    correctINST = solveTOPO(prefect_WIRING, b_Names, b_IDs)

    correctWIRES = correctINST['instructions']

    correctWIRES2 = []
    for i2 in range(len(correctWIRES)):
        if len(correctWIRES[i2]) >0:
            correctWIRES2.append(correctWIRES[i2])

    correctWIRES3 = []
    for i2 in range(len(correctWIRES2)):
        for x2 in range(len(correctWIRES2[i2])):

            correctWIRES3.append([int(correctINST['order'][i2])] + correctWIRES2[i2][x2])

    #------------------------------------------------------------------------------        
                    
    PLUGOUT = np.asarray(diff_wires(wrongWIRES3, correctWIRES3))

    PLUGOUT[:,[0, 2]] = PLUGOUT[:, [2, 0]]
    PLUGOUT[:,[1, 3]] = PLUGOUT[:, [3, 1]]

    print('PLUGOUT:\n', np.asarray(PLUGOUT) )
    
    #------------------------------------------------------------------------------
    
    print('\n\n')
    PLUGIN = np.asarray(diff_wires(correctWIRES3, wrongWIRES3))

    PLUGIN[:,[0, 2]] = PLUGIN[:, [2, 0]]
    PLUGIN[:,[1, 3]] = PLUGIN[:, [3, 1]]

    print('PLUGIN:\n', np.asarray(PLUGIN))

    return [PLUGOUT, PLUGIN]


##---------- SERVER ROUTES ----------##

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

idNames = {
	"names": {
		"servers": {

			"server1": "12345678",
		    "server2": "11345678",
		    "server3": "12145678",
		    "server4": "12315678",
		    "server5": "12341678"

		},
		"switches": {

			"mgmt": "abcdef",
		    "tor1": "abcdeg",
		    "tor2": "abcdeh"

		}
	}
}



PREFECT_SERVER = 'http://localhost:2777/rack/rack19/conns'
MISTAKE_SERVER = 'http://localhost:2778/rack/rack19/conns'



# Root/index route (hello world test for now)
@app.route("/")
def index():
    return "hello world"

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

"""
Get the instructions of a certain device number. Used for QR Code link
- Goes in database, retrieve instructions, parses JSON, return JSON of 
    plaintext instructions for individual device
"""
@app.route("/get_deviceInstructions/<int:deviceNumber>", methods = ["POST","GET"])
def get_deviceInstructions(deviceNumber):
    #params = request.get_json()
    name = "SAMPLE"
    #access the database and get the instructions
    dbResults = db.execute("""SELECT instructions FROM projects WHERE name=:name;""",{"name":name}).fetchone()
    data = eval(dbResults[0])
    # Note: make sure that data from DB is json format to work with code below

    #read the instructions
    #go through the plaintext and find the correct switch, then return the plaintext instructions
    # in json format
    
    for key in data['PLAIN_TEXT']:
        if (int(key) == deviceNumber):
            deviceInstructions = json.dumps(data['PLAIN_TEXT'][key], indent=2, sort_keys=False)
            return deviceInstructions

    return ("No device found.")

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

"""
    ASSUMPTION: one network device per box. Box number corresponds to network device id.

    This route will create a qr code for a certain box. This function will be used by the
    receiving department to generate qr codes. For now, when the route is called, it will
    display the qr code in an html site. Ideally, the receiving department will print this
    out.
"""

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

@app.route("/get_qrcode/<int:deviceNumber>")
def get_qrcode(deviceNumber):
    #create an object of the boxQRCode class
    img = boxQRCode()
    #get the name of the local qr code image file
    imageName = img.generateQRCode(deviceNumber)
    #return the image
    return send_file(
            imageName,
            mimetype='image/png',
            attachment_filename='qr.png'
        )

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

"""
    Add project route
    @params: (network_designer, topology, name)
    Input is via POST only
"""
@app.route("/add_project", methods=["POST"])
def add_project():
    params = request.get_json()
    network_designer = str(params["network_designer"]).upper()
    topology = str(params["topology"]).upper()
    name = str(params["name"]).upper()
    try:
        db.execute("""INSERT INTO projects (network_designer,topology,name)
        VALUES (network_designer=:network_designer, topology=:topology, name=:name)
        """, {"network_designer":network_designer, "topology":topology, "name":name})
        db.execute("""INSERT INTO network_components (name) 
        VALUES (name=:name""",{"name":name})
        db.commit()
    except:
        return jsonify({"error":"Error"}),200
    return jsonify({"error":"Success"}),200

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

"""
    Delete project route:
    @params: (name)
    input is via POST only
"""
@app.route("/delete_project", methods = ["POST"])
def delete_project():
    params = request.get_json()
    name = str(params["name"]).upper()
    try:
        db.execute("""DELETE FROM projects WHERE name=:name;""", {"name":name})
        db.execute("""DELETE FROM network_components WHERE name:=name""",{"name":name})
        db.commit()
    except:
        return jsonify({"error":"Error"}),200
    return jsonify({"error":"Success"}),200

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

"""
    add_instructions route:
    @params: (name, instructions)
    input is via POST only
"""

@app.route("/add_instructions", methods = ["POST"])
def add_instructions():
    params = request.get_json()
    name = str(params["name"]).upper()
    instructions = str(params["instructions"]).upper()
    try:
        db.execute("""UPDATE projects
    SET instructions=:instructions WHERE name=:name;""",{"instructions":instructions, "name":name})
        db.commit()
    except:
        return jsonify({"error":"Error"}),200
    return jsonify({"error":"Success"}),200
    
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

"""
    add_devices route:
    @params: (name, device)
    input is via POST only
"""
@app.route("/add_devices", methods = ["POST"])
def add_devices():
    params = request.get_json()
    name = str(params["name"]).upper()
    device = str(params["device"]).upper()
    try:
        db.execute("""UPDATE network_components 
    SET serialNums=array_append(serialNums,:device) 
    WHERE name=:name;""",{"name":name,"device":device})
        db.commit()
    except:
        return jsonify({"error":"Error"}),200
    return jsonify({"error":"Success"}),200    

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

"""
    get project info
    @params: (name)
    input is via POST only
"""
@app.route("/get_projectInfo", methods = ["POST"])
def get_projectInfo():
    params =  request.get_json()
    name = str(params["name"]).upper()
    try:
        projectInfo = db.execute("""SELECT * FROM projects WHERE name=:name;""",{"name":name})
        devices = db.execute("""SELECT serialNums FROM network_components WHERE name=:name""",{"name":name})
    except:
        return jsonify({"error":"Error"}),200
    return jsonify({"error":"Success", "projectInfo":projectInfo, "devices":devices}),200   

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

'''
Topology to instructions route
'''
@app.route("/topoToInst", methods = ["POST"])
def topoToInst():
    params = request.get_json()
    inTopo = params["inTopo"]
    #B_names = params["B_names"] #this reads from id_names.json-> from external file
    B_names = idNames
    B_ID = params["B_ID"]
    inst = solveTOPO(inTopo, B_names, B_ID)
    return jsonify(inst),200

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------    

'''
Get test results route
'''
@app.route("get_test_results", methods = ["POST", "GET"])
def get_test_results():
    result = run_test()
    return jsonify({"result":result})

#'''
#Testing endpoint
#@params: (id)
#'''

@app.route("/getpost_test", methods = ["GET","POST"])
def getpost_test():
    params = request.get_json()
    idNum = str(params["id"])
    if(request.method == 'GET'):
        return jsonify({"id":idNum,"error":"Success", "method":"GET"}),200
    if(request.method == 'POST'):
        return jsonify({"id":idNum,"error":"Success","method":"POST"}),200


