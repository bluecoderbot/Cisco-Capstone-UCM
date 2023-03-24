import os
from flask import Flask, jsonify, send_file, request
import json
import numpy as np
import yaml
import time
import random

from six.moves import urllib


#------------------------------------------------------------------------------
import TopologytoInstructions
import Gen_new_Instructions

#------------------------------------------------------------------------------

PREFECT_PATH = '/Users/kumaranakilan/Desktop/dc-check/tests/loader/valid-1.yaml'
MISTAKE_PATH = '/Users/kumaranakilan/Desktop/dc-check/tests/loader/valid-2.yaml'

PREFECT_SERVER = 'http://localhost:2777/rack/rack19/conns'
MISTAKE_SERVER = 'http://localhost:2778/rack/rack19/conns'

#------------------------------------------------------------------------------


f = open('boxids.json',)
boxids = json.load(f)

f2 = open('Id-names.json',)
box_names = json.load(f2)

f3 = open('instructions.json',)
INST = json.load(f3)


with open(PREFECT_PATH) as f4:
    
    network_rack_PERFECT = yaml.load(f4, Loader=yaml.FullLoader)
    
    
with open(MISTAKE_PATH) as f5:
    
    network_rack_MISTAKES = yaml.load(f5, Loader=yaml.FullLoader)
    


#------------------------------------------------------------------------------

def make_mistake(wire_arr):
    
    wire_arr_1 = np.asarray(wire_arr.copy())

    
    wire_arr_2 = np.asarray(wire_arr.copy())

    idss = random.sample(range(0, len(wire_arr_1)), 2)
    idss2 = idss.copy()
    idss2.reverse()
    
    
    wire_arr_2[idss, ] = wire_arr_2[idss2]
    
    wire_arr_2[:, 0] = wire_arr_1[:, 0] 
    
    
    return wire_arr_2.tolist()

#------------------------------------------------------------------------------

switch_order = INST['order']
instructions = INST['instructions']

technican_behavior = [0, 1, 0]


#------------------------------------------------------------------------------




network_rack_PERFECT['connections']['rack19'] = []

network_rack_MISTAKES['connections']['rack19'] = []


#------------------------------------------------------------------------------

iterator = 0 
for ind in switch_order:
    
    print("Recived instructions for swtich ", ind, " from DB" )
    print("instruction type: PLUG IN \n")
    
    
    instrMISTAKE = []
    
    
    
    if technican_behavior[iterator] == 1:
        
        
        instrMISTAKE = make_mistake(instructions[ind])
    else:
    
        instrMISTAKE = (instructions[ind]).copy()
    
    
    time.sleep(0.5)
    
    print("instruction type: PLUG IN \n")
    #print(instructions[ind])
    
    
    for i in range(len(instructions[ind])):
        
        
        
        
        isnt = [instructions[ind][i][1] ] + [instructions[ind][i][2] ] + [int(ind)] + [instructions[ind][i][0] ]
        
        isnt2 = [instrMISTAKE[i][1] ] + [instrMISTAKE[i][2] ] + [int(ind)] + [instrMISTAKE[i][0] ]
        
    
    
    #PERFECT TECHNICIAN 
    
        print("perfect technican wiring from: Server ", isnt[0], " port: ", isnt[1], "to switch", isnt[2], " port: ", isnt[3] )

        (network_rack_PERFECT['connections']['rack19'] ).append( isnt)

    
    #MISTAKE-MAKING TECHNICIAN 
    
        print("mistake technican wiring from: Server ", isnt2[0], " port: ", isnt2[1], "to switch", isnt2[2], " port: ", isnt2[3] )

        (network_rack_MISTAKES['connections']['rack19'] ).append( isnt2)

        print("\n")
    
    
    
    
    
    with open(PREFECT_PATH, 'w') as perfectYAML:
        data1 = yaml.dump(network_rack_PERFECT, perfectYAML)

        print("YAML Write successful")
    
    
    with open(MISTAKE_PATH, 'w') as mistakeYAML:
        data2 = yaml.dump(network_rack_MISTAKES, mistakeYAML)

        print("YAML Write successful")
    
    
    
    print("\n\n")
    
    
    
    
    
    print("running test ...")
    time.sleep(0.5)
    
    if Gen_new_Instructions.run_test(PREFECT_SERVER, MISTAKE_SERVER):
        print("test Successful")
    else:
        print("test Failed")
        
        
        new_inst = Gen_new_Instructions.generateNewInst(box_names, boxids, MISTAKE_SERVER, PREFECT_SERVER)
        
        
        for n_inst in new_inst[0]:
            network_rack_MISTAKES['connections']['rack19'].remove(n_inst.tolist())


        for n_inst in new_inst[1]:
            network_rack_MISTAKES['connections']['rack19'].append(n_inst.tolist())
    
    
    
    
    
    time.sleep(0.5)
    
    
    
    
    
    iterator = iterator + 1
    
#------------------------------------------------------------------------------

