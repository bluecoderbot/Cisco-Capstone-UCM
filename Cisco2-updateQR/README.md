# Cisco2
Repo for Cisco2
Readme


# Installation process:
cd /correctFile
pip install -r requirements.txt
python3 -m venv server-dev
cd server-dev/bin
source ./activate
pip install Flask

# Run server:
export FLASK_APP=server.py
flask run

# @app.route("/get_topo")
When this route is called, it will contact the server of the dummy API, and retrieve the topology. For now, there is only one topology, but eventually when there is more than one topology, an ID will need to be passed as a parameter.

Once the topology is retrieved, the JSON is parsed into cards and switches. A card contains an ID, and an array of connections. A switch contains a name, and an array of cards. The switch is then added to an array of switches. Its placement in the array would correspond to its name, so switch "one" will be added at index 1.

When the app is in use by a technician, they first need to use this route to retrieve the topology, or else the next route will not work. So front-end ideally would ask what topology the technician would like to access (since there is only one topology at the moment, maybe just skip this), and call this route. 

# @app.route("/get_instructions/<int:switchNumber>")
This route will return the connections that need to be made to a switch. The parameter "switchNumber" is the name of the switch. In the dummyAPI, this would correspond to the "zero", "one", and so on. This function will retrieve the switch from the arrays, then return the connections in JSON format.

Example: 
    Call: /get_instructions/1

Result: {
  "connections": {
    "1/1": {
      "peer": {
        "mac": "11:22:33:44:55:66",
        "serialNumber": "SN41754"
      }
    },
    "1/2": {
      "peer": {
        "mac": "11:22:33:44:55:67",
        "serialNumber": "SN41755"
      }
    }
  }
}

Of course, the result can be more specific and organized, but since this is only a dummyAPI, theres no reason to until we have the actual API.

# boxQRCode()
The boxQRCode() class handles the creation of a QR Code label, and adding the box number on the label. For now, the box number is the same as the switch number (assuming that each carboard box contains one switch), but this can be changed later. The label is saved locally on the computer. This should be changed once the database is up and running, and just store all the labels to the corresponding topology in the database.

This class is used in the new server.py file. There is a new @app.route("/get_qrcode/<int:switchNumber>"). This route can be used by the receiving department to generate the qrcode. For now, the technician passes the switch number (same assumption as above) as a parameter, but again, this will be changed. Also, printing the label shouldn't be a worry, since for this project, everything is virtual. So we can just save the image, and assume that if the system is ever in production, the receiving department would print the label.

