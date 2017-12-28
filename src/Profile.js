import React from 'react';
import './App.css';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.sampleUser.name}
        </div>
        <div>
          {this.props.sampleUser.plan} plan
        </div>
      </div>
    );
  }
}

export default Profile;
