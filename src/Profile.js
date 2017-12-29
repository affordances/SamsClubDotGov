import React from 'react';
import './App.css';

import {
  Redirect,
} from 'react-router-dom'

class Profile extends React.Component {
  render() {
    if (this.props.loggedIn)
    {return (
      <div>
        <div>
          {this.props.user.name}
        </div>
        <div>
          {this.props.user.plan} plan
        </div>
      </div>
    );}
    else {return (
      <Redirect to='/login'/>
    );}
  }
}

export default Profile;
