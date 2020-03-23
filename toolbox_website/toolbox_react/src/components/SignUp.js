import React from 'react';

/**
 * This component is used to register the information set by 
 * the user to the database. He must enter his forename, surename,
 * email address, localisation, ... 
 * @param
 */
const SignUp = () => {
    return(
        <form className="formSignUp">
            <label>
                Forename :{'\n'} 
            <input type='text' name ='forename'/>
            </label>
            {'\n'}
            <label>
                 Surename:{'\n'} 
            <input type='text' name ='surename'/>
            </label>
            <button>
                Send informations
            </button>
        </form>
    );
}

export default SignUp;