from flask import Flask, send_from_directory

app = Flask(__name__)

# Serve index.html from root
@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

# Serve CSS and JS files from root
@app.route('/<filename>')
def serve_root_files(filename):
    return send_from_directory('.', filename)

# Serve icons from the /icons folder
@app.route('/icons/<path:filename>')
def serve_icons(filename):
    return send_from_directory('icons', filename)

# Serve fonts from the /popinns folder
@app.route('/Poppins/<path:filename>')
def serve_fonts(filename):
    return send_from_directory('Poppins', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
