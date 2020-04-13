import React, {Component} from "react";
//import Modal from "react-responsive-modal";
import "../css/Header.css";
import icon from "../assets/logo.png";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
//import "bootstrap/dist/css/bootstrap.min.css";


class Header extends Component {
    constructor(props){
        super(props)

        this.state = {
            signIn: false,
            signUp : false
        }
    }

    onOpenSignIn = () => {
        this.setState({signIn: true})
    }

    onCloseSignIn = () => {
        this.setState({signIn: false})
    }

    onOpenSignUp = () => {
        this.setState({signUp: true})
    }

    onCloseSignUp = () => {
        this.setState({signUp: false})
    }

    render(){
     return(
        <>
        <nav className='navbar'>
        <div className='container-fluid'>
            <div className='navbar-header'>
            <a className="logo" href="/">
                <img className="img-responsive logo" src={icon} alt="" data-logo-alt={icon} />
            </a>
            <a className='navbar-brand' href='/'>ToolBox</a>
          </div>
          <ul className='nav navbar-nav'>
            <li className='active'><a href='/profile'>My profile</a></li>
            <li><a href='/sign-In'>Sign-In</a></li>
            <li><a href='/sign-Up'>Sign-Up</a></li>
          </ul>
        </div>
        </nav>
        </>
         );
    }

}
export default Header;