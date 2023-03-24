
#these libraries are needed to make the qrcode to work
import qrcode
import PIL
from PIL import Image, ImageDraw, ImageFont

class boxQRCode:
    def __init__(self):
        print("Object Created")

    """
        textImage() adds text to the image. At the top of the qr code, a string will 
        display the device number, which helps the technician find the correct box to open in
        a certain order. All devices 0 will have 'Type: mgmt' printed as well.
    """
    def textImage(pngImage, deviceNumber):
        draw = ImageDraw.Draw(pngImage)
        font = ImageFont.truetype("Courier_Regular.ttf", 25)
        if (deviceNumber == 0):
            draw.text((50, 10), "DeviceNumber: {}  mgmt".format(deviceNumber), font = font)
        else:
            draw.text((50, 10), "DeviceNumber: {}".format(deviceNumber), font = font)
        return draw
    """
    generateQRCode() will make a qrcode that contains a link to the get_instructions() 
    route on the server. get_instructions() requires a deviceNumber as a parameter, so
    for that reason, generateQRCode() will also take a deviceNumber as a parameter.
    """
    def generateQRCode(self, deviceNumber):
        #change the address link once the server is setup
        link = "http://13.57.81.55/get_deviceInstructions/{}".format(deviceNumber)
        qr = qrcode.QRCode()
        qr.add_data(link)
        qr.make()

        #make an image
        img = qr.make_image()
        #call textImage() to add the box number at the bottom of the qr code.
        draw = boxQRCode.textImage(img, deviceNumber)

        #save the image locally.
        img.save("deviceInstruction{}.png".format(deviceNumber))

        #return the NAME of the qr code image. This will be saved locally.
        return ("deviceInstruction{}.png".format(deviceNumber))