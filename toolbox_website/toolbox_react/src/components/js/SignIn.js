import React, { Component } from 'react';
import {Link} from 'react-router-dom';

/**
 * This component is the formular the user must fill to connect 
 * to his account.
 * @param 
 * @return 'XML form'  
 */
class SignIn extends Component {
    
    constructor(){
        super();

        this.state ={
            alias:'',
            email:'',
            password:''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
            <div className='FormSign'>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label className='FormField_Label' htmlFor='alias'>Alias </label> 
                    <input type='text' className='FormField_Input' name ='alias' placeholder='Enter your alias' value={this.state.alias} onChange={this.handleChange}/>
                </div>
                <div>
                    <label className='FormField_Label' htmlFor='email'>E-mail address </label> 
                    <input type='email' className='FormField_Input' name ='email' placeholder='Enter your e-mail address' value={this.state.email} onChange={this.handleChange}/>
                </div>
                <div>
                    <label className='FormField_Label' htmlFor='password'>Password </label> 
                    <input type='password' className='FormField_Input' name ='password' placeholder='Enter your password' value={this.state.password} onChange={this.handleChange}/>
                </div>
                <div>
                    <button type='reset' className='nokButton'>Cancel</button>
                    <div className="divider"/>
                    <button type='submit' className='okButton'>Confirm</button>
                </div>  
            </form>
            </div>
        )
    }
}

export default SignIn
