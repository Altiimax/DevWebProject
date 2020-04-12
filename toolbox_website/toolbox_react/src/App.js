import React from 'react';
import './App.css';
import {apiRequest} from './apiRequest.js';


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
        if(p != "pwd_test"){
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


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p id="apiOut"></p>
      </header>
    </div>
  );
}

export default App;
