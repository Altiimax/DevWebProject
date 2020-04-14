import React, {Component} from "react";
//import Modal from "react-responsive-modal";
import "../css/Header.css";
import icon from "../assets/logo.png";
import {Modal, Button, Form, Nav, NavDropdown, FormControl, Navbar} from 'react-bootstrap';
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
            <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home">
            <a className="logo" href="/">
                <img className="img-responsive logo" src={icon} alt="" data-logo-alt={icon} />
            </a>
            <a className='navbar-brand' href='/'>ToolBox</a>
        </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="/profile">My profile</Nav.Link>
        <Button onClick={()=>{this.onOpenSignUp()}} variant="primary" >Sign-up</Button>
        <Button onClick={()=>{this.onOpenSignIn()}} variant="primary" >Sign-in</Button>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
        </Nav>
        <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
        </Form>
    </Navbar.Collapse>
    </Navbar>    
        <div>
        <Modal show={this.state.signUp}>
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

        <Modal show={this.state.signIn}>
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
  
            <Modal.Body>
                <SignIn/>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={()=>{this.onCloseSignIn()}} variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal >

  
      </div>
        </>
         );
    }

}
export default Header;