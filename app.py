import json
import os
from datetime import datetime
from flask import Flask, render_template, request
from flask_session import Session
from tempfile import mkdtemp
import requests


# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route("/", methods = ["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template("index.html")

# not used anymore
# @app.route("/astronauts", methods = ["GET", "POST"])
# def astronauts():
#     if request.method == "GET":
#         return render_template("astronauts.html")

@app.route("/map", methods = ["GET", "POST"])
def map():
    if request.method == "GET":
        return render_template("map.html")

@app.route("/launches", methods = ["GET", "POST"])
def launches():
    if request.method == "GET":
        return render_template("launches.html")

@app.route("/image", methods = ["GET", "POST"])
def image():
    if request.method == "GET":
        return render_template("image.html")

@app.route("/register", methods = ["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("register.html")

@app.route("/login", methods = ["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")

if __name__ == '__main__':
    app.run()