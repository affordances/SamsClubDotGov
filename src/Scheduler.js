import React from 'react';
import './App.css';

import {
  Link,
  Redirect,
} from 'react-router-dom'

class Scheduler extends React.Component {
  render() {
    if (this.props.loggedIn)
    {return (
      <div>
        Scheduler
      </div>
    );}
    else {return (
      <Redirect to='/login'/>
    );}
  }
}

export default Scheduler;
