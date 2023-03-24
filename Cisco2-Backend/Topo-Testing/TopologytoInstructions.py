import os
from flask import Flask, jsonify, send_file, request
import json
import numpy as np


def findKey(targetK, dCt):
    for ID_key in dCt.keys():
        
        if dCt[ID_key] == targetK:
            return ID_key
    return None


def stringtoinstr(dct, B_names, B_ID):
    ret = []
    
    for key in dct.keys():
        
        
        
        fbx = findKey( findKey(dct[key]['peer']['serialNumber'], B_names['names']['servers']), B_ID)
        
        rt = [int(key), int(fbx), int(dct[key]['peer']['port'] ) ]
        
        ret.append(rt)

    return ret


def wires_plaintext(wire_stack):
    plain_ret = []
    
    for singe_wire in wire_stack:
        plain_ret.append("connect switch port "+ str(singe_wire[0]) + " to server " + str(singe_wire[1]) + " at port " + str(singe_wire[2]))

    return plain_ret
        



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