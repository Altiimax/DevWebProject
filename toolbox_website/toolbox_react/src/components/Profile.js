import React, { Component } from 'react';
import {Link} from 'react-router-dom';
/**
 * This component is used to display the account informations 
 * of the member.
 * @param 
 */


class Profile extends Component {
  render() {
    return (
      <div className='profilPage'>
        <div className='buttonsProfile'>
          <button className='myToolsButton'><Link to='/' className='FormField_Link'>Go back to the Menu</Link></button>
          <div class='divider'/>
          <button className='myToolsButton'><Link to='/help' className='FormField_Link'>My Tools</Link></button>
          <div class='divider'/>
          <button className='myGroupsButton'><Link to='/help' className='FormField_Link'>My groups</Link></button>
          <div class='divider'/>
          <button className='helpButton'><Link to='/help' className='FormField_Link'>Help</Link></button>
          <div class='divider'/>
          <button className='myProfileButton'><Link to='/help' className='FormField_Link'>Parameters</Link></button>
        </div>
      </div>
    )
  }
}

export default Profile;