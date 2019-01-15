
# 
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/map")
def map():
    return render_template("index.html")


# @app.route("/")
# def home():
#     return "Welcome!"

if __name__ == '__main__':
   app.run(debug = True)