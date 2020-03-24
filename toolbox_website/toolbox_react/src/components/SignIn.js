import React, { Component } from 'react'

/**
 * This component is the formular the user must fill to connect 
 * to his account.
 * @param 
 * @return "XML form"  
 */
class SignIn extends Component {
    render() {
        return (
            <form className="FormSign">
                <div>
                    <label className="FormField_Label" htmlFor='alias'>Alias </label> 
                    <input type='text' name ='alias' placeholder='Enter your alias'/>
                </div>
                <div>
                    <label className="FormField_Label" htmlFor='email'>E-mail address </label> 
                    <input type='email' name ='email' placeholder='Enter your e-mail address'/>
                </div>
                <div>
                    <label className="FormField_Label" htmlFor='password'>Password </label> 
                    <input type='password' name ='password' placeholder='Enter your password'/>
            </div>
            <div>
                <button className="nokButton">Cancel</button>
                <button className="okButton">Confirm</button>
            </div>  
            </form>
        )
    }
}

export default SignIn
