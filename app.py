from flask import Flask, jsonify, render_template
app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/maps")
def index():
    return render_template('maps.html')