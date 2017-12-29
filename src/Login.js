import React from 'react';
import './App.css';

import { sampleUser } from './seed.js';

class Login extends React.Component {
  state = {
    email: sampleUser.email,
    password: sampleUser.password,
  }

  render() {
    return (
      <div className='login-form'>
        Sign in
        <form onSubmit={this.props.onLogin}>

          <input
            name='email'
            value={this.state.email}
            readOnly={true}
          />

          <br />

          <input
            type='password'
            name='password'
            value={this.state.password}
            readOnly={true}
          />

          <br />

          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default Login;
