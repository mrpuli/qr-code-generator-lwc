import qrcode
import base64
from io import BytesIO
from flask import Flask, request, jsonify

app = Flask(__name__)

# Function to generate QR code and return it as base64 string
def generate_qr_code_base64(url):
    # Create QR code for the given URL
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Generate the image of the QR code
    img = qr.make_image(fill='black', back_color='white')

    # Convert image to bytes
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    qr_code_bytes = buffer.getvalue()

    # Encode the bytes to base64
    qr_code_base64 = base64.b64encode(qr_code_bytes).decode('utf-8')

    return qr_code_base64

# Flask route to accept GET request and return QR code
@app.route('/generate_qr', methods=['GET'])
def generate_qr():
    # Get the 'url' parameter from the GET request
    url = request.args.get('url')

    if not url:
        return jsonify({"error": "URL parameter is required"}), 400

    try:
        # Generate the QR code as base64
        qr_code_base64 = generate_qr_code_base64(url)

        # Return the base64 string in a JSON response
        return jsonify({"qr_code_base64": qr_code_base64})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)
