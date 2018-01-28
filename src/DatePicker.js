import React from 'react';
import './App.css';

import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';

class DatePicker extends React.Component {

  handleDayClick = (day, { disabled, selected }) => {
    if (disabled) {
      return;
    }
    const dateString = day.toString();

    setTimeout( () => {
      this.props.updateCheckout(3, dateString, 'date')();
    }, 0)
  }

  render() {
    const today = new Date();
    let date = null;
    if (this.props.ticket.date) {
      date = new Date(this.props.ticket.date);
    }

    return (
      <div className='datepicker'>
        <DayPicker
          fromMonth={today}
          initialMonth={date ? date : today}
          disabledDays={{ before: today }}
          selectedDays={date}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}

export default DatePicker;
