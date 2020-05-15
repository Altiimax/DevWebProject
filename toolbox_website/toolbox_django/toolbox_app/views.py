from django.shortcuts import render
from django.http import HttpResponse

from .models import *

def index(request):
    output = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Toolbox-website Dev</title>
        <style>
        html {
            background-color: #0093E9;
            background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
        }
        div {
            width: 99%;
            padding: 5px;
            position: absolute;
            top: 50%;
            left: 50%;
            -ms-transform: translateX(-50%) translateY(-50%);
            -webkit-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);

            font-family: "Courier New", Courier, monospace;
            text-align: center;
        } 
        h1 {
            font-size: 2.5em;
        }
        #links {
            font-size: 1.5em;
        }
        #check p {
            font-size: 1em;
        }
        </style>
    </head>
    <body>
        <div>
            <h1>Welcome to the Tool-Box development server!</h1> 
            <section id="check">
                <p>&#x2705 Successfully connected to database at 109.128.245.26:5432</p>
                <p>&#x2705 Successfully started Django development server</p>
            </section>
            <br>
            <br>
            <section id="links">
            Click <a href="https://documenter.getpostman.com/view/10766769/SzS7Rmiy?version=latest#c0580a28-18f6-4d29-a045-0decf58798a1">here</a> to check our API or 
            <a href="http://127.0.0.1:8000/admin">here</a> to login as admin. 
            </section>
        </div>
        <img src="/media/toolsImgs/Concrete3_1.jpg" />
    </body>
    </html>
    """
    return HttpResponse(output)

