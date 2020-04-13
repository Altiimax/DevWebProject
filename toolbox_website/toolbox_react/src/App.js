import React from 'react';
import './App.css';
import {apiRequest} from './apiRequest.js';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

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
    //document.getElementById("apiOut").innerHTML = apiOutput;
  }
});

req.send();


class App extends React.Component {
  constructor(){
    super();
    this.state={
      popupVisible:false
    }
  };

  chngPVis(s){
    this.setState({popupVisible:s});
  }

  render() {
    return (
      <div>
        <header>
          <p id="apiOut"></p>
          <p>This is a first test !</p>
        </header>
  
        <body>
          <Button onClick={()=>{this.chngPVis(true)}} variant="primary" >popup test</Button>
  
          <Modal show={this.state.popupVisible} onHide={()=>{this.chngPVis(false)}}>
              <Modal.Header closeButton>
                <Modal.Title>Popup Test</Modal.Title>
              </Modal.Header>
  
              <Modal.Body>
                <p>Popup test - content</p>
              </Modal.Body>
  
              <Modal.Footer>
                <Button onClick={()=>{this.chngPVis(false)}} variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
              </Modal.Footer>
            </Modal >
        </body>
  
      </div>
    );
  }
}

export default App;
