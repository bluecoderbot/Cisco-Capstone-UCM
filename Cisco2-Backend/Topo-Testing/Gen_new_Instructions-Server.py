import os
from flask import Flask, jsonify, send_file, request
import json
import numpy as np
import yaml
import time
import random

from six.moves import urllib

import TopologytoInstructions



def getTOPOapi(urlLINK):
    U_R_L = urllib.request.urlopen(urlLINK)
        
    return [U_R_L.getcode(), json.loads(U_R_L.read())] [U_R_L.getcode()==200]

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

def run_test(PREFECT_SERVER, MISTAKE_SERVER):
    prefect_WIRING = getTOPOapi(PREFECT_SERVER)

    prefect_MISTAKE = getTOPOapi(MISTAKE_SERVER)

    return prefect_MISTAKE == prefect_WIRING

#------------------------------------------------------------------------------
#------------------------------------------------------------------------------
#------------------------------------------------------------------------------

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