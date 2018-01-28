import React from 'react';
import './App.css';

class TimePicker extends React.Component {

  generateAppointments = () => {
    let appointments = [];
    while (appointments.length < 3) {
      const appointment = Math.floor(Math.random() * 24) + 1;
      if (!appointments.includes(appointment))
      appointments.push(appointment);
    }
    return appointments.map((appointment) => {
      let time = ((appointment - 1) % 12) + 1;
      time = time + ((appointment <= 12) ? ':00 AM' : ':00 PM');
      return time;
      }
    )
  }

  render() {
    const appointments = this.generateAppointments();

    return (
      <div>
        <div>{appointments[0]}</div>
        <div>{appointments[1]}</div>
        <div>{appointments[2]}</div>
      </div>
      );
  }
}

export default TimePicker;
