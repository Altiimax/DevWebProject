import React from 'react';
/**
 * This component is used to render a personalised greeting message.
 * It rendre the greetings message in h1.
 * @param {*} props 
 */

const Greet = (props) =>{
    return(
    <h1>Welcome to the application {props.name}!
    {"\n"} What would you do?</h1> //ici le /n ne fonctionne pas!
    );
}
export default Greet;