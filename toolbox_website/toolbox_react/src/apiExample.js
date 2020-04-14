import React, { Component } from 'react';
import {apiRequest} from './apiRequest.js';
import "./apiExample.css";

let apiOutput;

let req = new apiRequest();
req.open("GET", "http://127.0.0.1:8000/api/persons/");
req.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log("resp status :" + this.status);
    console.log("resp text :" + this.responseText);
    let obj = JSON.parse(this.responseText);
    apiOutput = "<table><th> <td>id</td> <td>last name</td> <td>first name</td> <td>Alias</td> <td>email</td></th>";
    for( let o of obj){
      apiOutput += "<tr>";
      for( let p in o){
        if(p !== "pwd_test"){
          apiOutput += "<td>" + o[p] + "</td>";
        }
      }
      apiOutput += "</tr>";
    }
    apiOutput += "</table>";
    document.getElementById("apiOut").innerHTML = apiOutput;
  }
});

req.send();

class apiExample extends Component {
    render() {
        return (
            <div className="API">
                <section className="API-body"> 
                    <h1>API EXAMPLE</h1>
                    <p id="apiOut"></p>
                </section>
            </div>
        )
    }
}

export default apiExample;
