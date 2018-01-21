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
      <div className='login-form-container'>
        <div className='login-form'>
          <div className='login-form-header'>Sign in</div>
          <form onSubmit={this.props.onLogin}>

            <input
              className='login-form-input'
              name='email'
              value={this.state.email}
              readOnly={true}
            />

            <input
              className='login-form-input'
              type='password'
              name='password'
              value={this.state.password}
              readOnly={true}
            />

            <input
              className='login-form-submit'
              type='submit'
              value='Submit'
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
