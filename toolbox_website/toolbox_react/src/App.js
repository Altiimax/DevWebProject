import React from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './test.js'
import Greet from './components/Greetings';
import SignIn from './components/SignIn';

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
      <div className='Greetings'>
      <Greet name='Allan' />  
      </div>
      <div className='SignIn'>
      <SignIn />
      </div>
    </div>
  );
}

export default App;
