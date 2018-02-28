import React from 'react';
import './App.css';

class MyInfo extends React.Component {
  render() {
    return (
      <div className='my-info-container-container'>
        <div className='my-info-left-container'>
          <div className='my-info-left-item-container'>
            <div className='my-info-header'>Name:</div>
            <div>{this.props.user.name}</div>
          </div>
          <div className='my-info-left-item-container'>
            <div className='my-info-header'>HIN:</div>
            <div>{this.props.user.hin}</div>
          </div>
          <div className='my-info-left-item-container'>
            <div className='my-info-header'>Address:</div>
            <div>{this.props.user.address.street}, {this.props.user.address.cityAndState}</div>
          </div>
          <div className='my-info-left-item-container'>
            <div className='my-info-header'>Phone:</div>
            <div>{this.props.user.phone}</div>
          </div>
          <div className='my-info-left-item-container'>
            <div className='my-info-header'>Sex:</div>
            <div>{this.props.user.sex}</div>
          </div>
        </div>
        <div className='my-info-right-container'>
          <div className='my-info-right-item-container'>
            <div className='my-info-header'>Age:</div>
            <div>{this.props.user.age}</div>
          </div>
          <div className='my-info-right-item-container'>
            <div className='my-info-header'>Blood type:</div>
            <div>{this.props.user.bloodType}</div>
          </div>
          <div className='my-info-right-item-container'>
            <div className='my-info-header'>Weight:</div>
            <div>{this.props.user.weight}</div>
          </div>
          <div className='my-info-right-item-container'>
            <div className='my-info-header'>Blood pressure:</div>
            <div>{this.props.user.bloodPressure}</div>
          </div>
          <div className='my-info-right-item-container'>
            <div className='my-info-header'>Allergies:</div>
            <div>{this.props.user.allergies.join(', ')}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyInfo;
