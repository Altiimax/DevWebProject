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
        <h3 className='Text'>Welcome to the application {props.name}! 
        This application is on construction!
        {"\n"} What would you do?</h3>
    </div>
    );
}
export default Greet;