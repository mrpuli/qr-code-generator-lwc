# Project Goal
To create a Salesforce Lightning Web Component that generates a QR code for the entered url.

# Functionality
The component calls the apex function imperatively and passes the entered url as a parameter.
A callout is made to an external endpoint which returns a json response with the base64 QR code image data.
The generated QR code is displayed in the component. 
QR code can also be exported as a PDF. This functionality is implemented using jsPDF.

# How the QR code is generated
The external endpoint is a Python Flask web service which I have hosted on PythonAnywhere.com
QR code is generated using the qrcode, base64 libraries
Code for this script is in the qr.py file

# Live Demo
Live demo of this repo can be found at https://mrpuli-dev-ed.develop.my.site.com/qrcodegenerator/