import React, { Component } from 'react';
import '../css/SignUp.css'
//import GreenCheck from './assets/Green-Check.png'
/**
 * This component is used to register the information set by 
 * the user to the database. He must enter his forename, surename,
 * email address, alias, password, ... 
 * @param
 */
class SignUp extends Component {

    constructor(){
        super();

        this.state ={
            email:'',
            firstname:'',
            lastname:'',
            birthDate:'',
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
        },
            function(){
                if (name === 'birthDate'){ //Verify if the age is correct
                    let now = new Date();
                    let input = new Date(value);
                    let age = Math.floor((now-input)/ 31557600000);
                    if (age < 18){
                        let errorMessage = "You must be 18 to register to this application! But your age is : "+ age;
                        document.getElementById('date_error').innerHTML = errorMessage;
                    }
                    else {
                        document.getElementById('date_error').innerHTML = '';
                        //document.getElementById('greencheck').innerHTML = '<img className="img-greenCheck" src='+{GreenCheck}+' alt="This field as passed the test"/>'
                    }
                }

                if(name ==='newPassword'){ //Verify if password has a minimum length of 8
                    if(value!=='' && value.length < 8){
                        let errorMessage = "The password must be 8 characters minimum!";
                        document.getElementById('newpassword_error').innerHTML = errorMessage;
                    }
                    else{
                        document.getElementById('newpassword_error').innerHTML = '';
                    }
                }

                if(name ==='confirmPassword'){ //Verify if passwords are matching
                    if(value!== '' && this.state.newPassword !== this.state.confirmPassword){
                        let errorMessage = "Your passwords doesn't match!";
                        document.getElementById('password_error').innerHTML = errorMessage;
                    }
                    else{
                        document.getElementById('password_error').innerHTML = '';
                    }
                }
            }
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
            <>
            <form id="signUpForm" onSubmit={this.handleSubmit}>
                <label className='FormField_Label' htmlFor='email'>E-mail address </label>
                <input type='email' className='FormField_Input' name ='email' placeholder='Enter your e-mail address' value={this.state.email} onChange={this.handleChange}/>
        
                <label className='FormField_Label' htmlFor='firstname'>First name </label>
                <input type='text' className='FormField_Input' name ='firstname' placeholder='Enter your forename' value={this.state.firstname} onChange={this.handleChange}/>
            
                <label className='FormField_Label' htmlFor='lastname'>Last name </label>
                <input type='text' className='FormField_Input' name ='lastname' placeholder='Enter your surename' value={this.state.lastname} onChange={this.handleChange}/>
            
                <label className='FormField_Label' htmlFor='birthDate'>Birthdate </label> <span className='check-img' id='greencheck'></span>
                <input type='date' className='FormField_Input' name ='birthDate' value={this.state.birthDate} onChange={this.handleChange}/>
                <span className="error"><p id="date_error"></p></span>

                <label className='FormField_Label' htmlFor='alias'>Alias </label>
                <input type='text' className='FormField_Input' name ='alias' placeholder='Enter your alias' value={this.state.alias} onChange={this.handleChange}/>
            
                <label className='FormField_Label' htmlFor='newPassword'>New password </label>
                <input type='password' className='FormField_Input' name ='newPassword' placeholder='Enter a new password' value={this.state.newPassword} onChange={this.handleChange}/>
                <span className="error"><p id="newpassword_error"></p></span>
            
                <label className='FormField_Label' htmlFor='confirmPassword'>Password confirmation </label>
                <input type='password' className='FormField_Input' name ='confirmPassword' placeholder='Enter your password' value={this.state.confirmPassword} onChange={this.handleChange}/>
                <span className="error"><p id="password_error"></p></span>

                <div></div>
                <label className='FormField_CheckBox' htmlFor='hasagreed'></label>
                <input type='checkbox' className='FormField_Input_Check' name='hasagreed' value={this.state.hasagreed} onChange={this.handleChange}/> I agree with all the statements in <a href='' className='FormField_TermsLink'>terms of service.</a>
            </form>
            </>
        );
    }
}

export default SignUp;