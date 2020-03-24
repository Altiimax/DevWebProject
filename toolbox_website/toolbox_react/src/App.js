import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import Welcome from './test.js';
import Greet from './components/Greetings';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  return (
    <Router>
      <Route exact path='/'>
        <div className="App">
        <header className="App-header">
        <div className='Greetings'>
        <Greet name='Host' />  
        </div>
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
      </Route>
      <Route exact path='/sign-up' component={SignUp}>
      </Route>
      <Route exact path='/sign-in' component={SignIn}>
      </Route>
    </Router>
  );
}

export default App;
