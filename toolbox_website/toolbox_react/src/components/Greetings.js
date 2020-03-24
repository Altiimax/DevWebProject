import React from 'react';
/**
 * This component is used to render a personalised greeting message.
 * It rendre the greetings message in h1.
 * @param {*} props 
 */

const Greet = (props) =>{
    return(
    //ici le /n ne fonctionne pas!
    <div>
        <h3>Welcome to the application {props.name}! 
        This application is on construction!
        {"\n"} What would you do?</h3>
        <h6>Add /sign-in in the url to go to sign-in page!</h6>
        <h6>Or add /sign-up for the sign-up page!</h6>
    </div>
    );
}
export default Greet;