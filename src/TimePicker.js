import React from 'react';
import './App.css';

class TimePicker extends React.Component {
  render() {
    return (
      <div className='timepicker-container'>
        <div className='time-option-container'>
          <div className='time-option'>{this.props.ticket.appointmentTimes[0]}</div>
            <div className='time-option-button'>
              <button onClick={this.props.updateCheckout(4, this.props.ticket.appointmentTimes[0], 'time')}>
                Select
              </button>
            </div>
        </div>
        <div className='time-option-container'>
          <div className='time-option'>{this.props.ticket.appointmentTimes[1]}</div>
            <div className='time-option-button'>
              <button onClick={this.props.updateCheckout(4, this.props.ticket.appointmentTimes[1], 'time')}>
                Select
              </button>
            </div>
        </div>
        <div className='time-option-container'>
          <div className='time-option'>{this.props.ticket.appointmentTimes[2]}</div>
          <div className='time-option-button'>
            <button onClick={this.props.updateCheckout(4, this.props.ticket.appointmentTimes[2], 'time')}>
              Select
            </button>
          </div>
        </div>
      </div>
      );
  }
}

export default TimePicker;
