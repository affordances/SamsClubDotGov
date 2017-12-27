import React from 'react';
import isEmail from 'validator/lib/isEmail';
import './App.css';

import {
  Link,
} from 'react-router-dom'

class Register extends React.Component {
  state = {
    fields: {
      name: '',
      email: '',
    },
    fieldErrors: {},
  };

  onFormSubmit = (evt) => {
    const person = this.state.fields;
    const fieldErrors = this.validate(person);
    this.setState({ fieldErrors });
    evt.preventDefault();

    if (Object.keys(fieldErrors).length) return;

    this.setState({
      fields: {
        name: '',
        email: '',
      },
    });
  };

  onInputChange = (evt) => {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  };

  validate = (person) => {
    const errors = {};
    if (!person.name) errors.name = 'Name Required';
    if (!person.email) errors.email = 'Email Required';
    if (person.email && !isEmail(person.email)) errors.email = 'Invalid Email';
    return errors;
  };

  render() {
    return (
      <div className='login-form'>
        Create account
        <form onSubmit={this.onFormSubmit}>

          <input
            placeholder='Name'
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange}
          />

          <span style={{ color: 'red' }}>{ this.state.fieldErrors.name }</span>

          <br />

          <input
            placeholder='Email'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
          />

          <span style={{ color: 'red' }}>{ this.state.fieldErrors.email }</span>

          <br />

          <input type='submit' />
        </form>
        <div>
          Already have an account? <Link to='/login'>Sign in</Link>
        </div>
      </div>
    );
  }
}

export default Register;
