import React, { Component } from 'react';
import "../css/Form.css";

const initialState={
    alias:'',
    email:'',
    password:'',
    aliasError:'',
    emailError:'',
    passwordError:''
}

/**
 * This component is the formular the user must fill to connect 
 * to his account.
 * @param 
 * @return 'XML form'  
 */
class SignIn extends Component {
    
    constructor(){
        super();

        this.state = initialState;
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate(){
        let aliasError='';
        let emailError='';
        let passwordError='';

        if(!this.state.alias){
            aliasError='Alias field should not be empty!';  
        }

        if(!this.state.email.includes('@')){
            emailError ='Invalid email, should contain an @ sign';
        }

        if(this.state.password.length<8){
            passwordError='Your password is too short, it must be 8 characters length!';
        }

        if(emailError || aliasError || passwordError){
            this.setState({emailError, aliasError, passwordError});
            return false;
        }
        return true;
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid){
        console.log('The form was submitted with the following data:');
        console.log(this.state);
        this.setState(initialState);
        }
    }

    render() {
        return (
            <>
            <form id="signInForm" onSubmit={this.handleSubmit}>
                <label className='FormField_Label' htmlFor='alias'>Alias :</label> 
                <input type='text' className='FormField_Input' name='alias' placeholder='Enter your alias' value={this.state.alias} onChange={this.handleChange}/>
                <div className='error'>{this.state.aliasError}</div>
            
                <label className='FormField_Label' htmlFor='email'>E-mail address </label> 
                <input type='email' className='FormField_Input' name ='email' placeholder='Enter your e-mail address' value={this.state.email} onChange={this.handleChange}/>
                <div className='error'>{this.state.emailError}</div>

                <label className='FormField_Label' htmlFor='password'>Password </label> 
                <input type='password' className='FormField_Input' name ='password' placeholder='Enter your password' value={this.state.password} onChange={this.handleChange}/>
                <div className='error'>{this.state.passwordError}</div>
                <input type='submit'/>
            </form>
            </>
        )
    }
}

export default SignIn
