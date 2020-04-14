import React, {Component} from "react";
//import Modal from "react-responsive-modal";
import "../css/Header.css";
import icon from "../assets/toolBox_logo.png";
import {Modal, Button, Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./SignUp";
import SignIn from "./SignIn";


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
            <Navbar expand="lg" fixed="top">
                <Navbar.Brand href="#home">
                    <a className="logo" href="/"><img src={icon} alt="" data-logo-alt={icon}/></a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Nav.Item id="homeNav">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item id="helpNav">
                            <Nav.Link href="/help">Help</Nav.Link>
                        </Nav.Item>
                        <Nav.Item id="myGroupsNav">
                            <Nav.Link href="/profile">My groups</Nav.Link>
                        </Nav.Item>
                        <Nav.Item id="myToolsNav">
                            <Nav.Link href="/profile">My tools</Nav.Link>
                        </Nav.Item>
                        <Nav.Item id="myProfileNav">
                            <Nav.Link href="/profile">My profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item id="signInNav">
                            <Button onClick={()=>{this.onOpenSignIn()}} variant="primary" >Sign-in</Button>
                        </Nav.Item>
                        <Nav.Item id="signUpNav">
                            <Button onClick={()=>{this.onOpenSignUp()}} variant="primary" >Sign-up</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>   

            <div>
                {/* Sign-in popup */}
                <Modal show={this.state.signIn} onHide={()=>{this.onCloseSignIn()}}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
""
                <Modal.Body>
                    <SignIn/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={()=>{this.onCloseSignIn()}} variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
                </Modal >

                {/* Sign-up popup */}
                <Modal show={this.state.signUp} onHide={()=>{this.onCloseSignUp()}}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <SignUp/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={()=>{this.onCloseSignUp()}} variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
                </Modal >
            </div>
            </>
        );
    }

}
export default Header;