import React from 'react';
import './App.css';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class DatePicker extends React.Component {
  render() {
    return (
      <DayPicker />
    );
  }
}

export default DatePicker;
