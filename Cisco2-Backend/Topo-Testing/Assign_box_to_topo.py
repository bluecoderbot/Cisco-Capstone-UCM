import os
from flask import Flask, jsonify, send_file, request
import json
import numpy as np


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