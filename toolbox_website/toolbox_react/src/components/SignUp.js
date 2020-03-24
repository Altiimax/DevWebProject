import React from 'react';

/**
 * This component is used to register the information set by 
 * the user to the database. He must enter his forename, surename,
 * email address, alias, ... 
 * @param
 */
const SignUp = () => {
    return(
        <form className="FormSign">
            <div>
                <label className="FormField_Label" htmlFor='email'>E-mail address </label>
                <input type='email' className='FormField_Input' name ='email' placeholder='Enter your e-mail address'/>
            </div>
            <div>
                <label className="FormField_Label" htmlFor='forename'>First name </label>
                <input type='text' className='FormField_Input' name ='forename' placeholder='Enter your forename'/>
            </div>
            <div>
                <label className="FormField_Label" htmlFor='surename'>Last name </label>
                <input type='text' className='FormField_Input' name ='surename' placeholder='Enter your surename'/>
            </div>
            <div>
                <label className="FormField_Label" htmlFor='birthDate'>Birthdate </label>
                <input type='date' className='FormField_Input' name ='birthDate'/>
            </div>
            <div>
                <label className="FormField_Label" htmlFor='alias'>Alias </label>
                <input type='text' className='FormField_Input' name ='alias' placeholder='Enter your alias'/>
            </div>
            <div>
                <label className="FormField_Label" htmlFor='newPassword'>New password </label>
                <input type='password' className='FormField_Input' name ='newPassword' placeholder='Enter a new password'/>
            </div>
            <div>
                <label className="FormField_Label" htmlFor='confirmPassword'>Password confirmation </label>
                <input type='password' className='FormField_Input' name ='confirmPassword' placeholder='Verify your password'/>
            </div>
            <div>
                <button className="nokButton">Cancel registration</button>
                <button className="okButton">Complete registration</button>
            </div>
        </form>
    );
}

export default SignUp;