import React from "react";
import "./App.css";

import { Redirect } from "react-router-dom";
import { sampleUser } from "./seed.js";

class Login extends React.Component {
  state = {
    email: sampleUser.email,
    password: sampleUser.password,
  };

  render() {
    if (!this.props.loggedIn) {
      return (
        <div className="login-form-container">
          <div className="login-form">
            <form onSubmit={this.props.onLogin}>
              <div className="login-form-input">
                <input name="email" value={this.state.email} readOnly={true} />
              </div>

              <div className="login-form-input">
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  readOnly={true}
                />
              </div>

              <div className="login-form-submit">
                <input type="submit" value="Let's go!" />
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Login;
