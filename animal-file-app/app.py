from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_details = {
        'name': file.filename,
        'size': len(file.read()),
        'type': file.content_type
    }
    print(file_details)
    return jsonify(file_details)

if __name__ == '__main__':
    app.run(debug=True)