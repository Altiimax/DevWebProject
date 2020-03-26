import React from 'react';
import logo from './logo.svg';
import './App.css';
import {apiRequest} from './apiRequest.js';

  let req = new apiRequest();
  req.open("GET", "http://127.0.0.1:8000/api/persons/");
  req.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log("resp status :" + this.status);
      console.log("resp text :" + this.responseText);
    }
  });
  
  req.send();


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
