import React, { Component } from 'react';
import {Link} from 'react-router-dom';

/**
 * This component is used to register the information set by 
 * the user to the database. He must enter his forename, surename,
 * email address, alias, ... 
 * @param
 */
class SignUp extends Component {

    constructor(){
        super();

        this.state ={
            email:'',
            firstname:'',
            lastname:'',
            birthdate:'',
            alias:'',
            newPassword:'',
            confirmPassword:'',
            hasagreed: false
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
                        <label className='FormField_Label' htmlFor='email'>E-mail address </label>
                        <input type='email' className='FormField_Input' name ='email' placeholder='Enter your e-mail address' value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label className='FormField_Label' htmlFor='firstname'>First name </label>
                        <input type='text' className='FormField_Input' name ='firstname' placeholder='Enter your forename' value={this.state.firstname} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label className='FormField_Label' htmlFor='lastname'>Last name </label>
                        <input type='text' className='FormField_Input' name ='lastname' placeholder='Enter your surename' value={this.state.lastname} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label className='FormField_Label' htmlFor='birthDate'>Birthdate </label>
                        <input type='date' className='FormField_Input' name ='birthDate' value={this.state.birthdate} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label className='FormField_Label' htmlFor='alias'>Alias </label>
                        <input type='text' className='FormField_Input' name ='alias' placeholder='Enter your alias' value={this.state.alias} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label className='FormField_Label' htmlFor='newPassword'>New password </label>
                        <input type='password' className='FormField_Input' name ='newPassword' placeholder='Enter a new password' value={this.state.newPassword} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label className='FormField_Label' htmlFor='confirmPassword'>Password confirmation </label>
                        <input type='password' className='FormField_Input' name ='confirmPassword' placeholder='Verify your password' value={this.state.confirmPassword} onChange={this.handleChange}/>
                    </div>
                    <div className='divider'/>
                    <div>
                        <label className='FormField_CheckBox' htmlFor='hasagreed'/>
                        <input type='checkbox' className='FormField_Input_Check' name='hasagreed' value={this.state.hasagreed} onChange={this.handleChange}/> I agree with all the statements in <a href='' className='FormField_TermsLink'>terms of service.</a>
                    </div>
                    <div className='divider'/>
                    <div>
                        <button type='reset' className='nokButton'>Cancel registration</button>
                        <div className='divider'/>
                        <button type='submit' className='okButton'>Complete registration</button>
                    </div>
                </form>
                <div className='divider'/>
            <div>
                <button className='goBackMenuButton'><Link to='/' className='FormField_Link'>Go back to the Menu</Link></button>
            </div>
            </div>
        );
    }
}

export default SignUp;