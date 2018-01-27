import React from 'react';
import './App.css';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class DatePicker extends React.Component {

  state = {
    selectedDay: null,
  }

  handleDayClick = (day, { disabled, selected }) => {
    if (disabled) {
      return;
    }
    this.setState({ selectedDay: selected ? undefined : day });
    this.props.updateCheckout(3, day, 'date');
  }

  render() {
    const today = new Date();
    return (
      <div className='datepicker'>
        <DayPicker
          fromMonth={today}
          disabledDays={{ before: today }}
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}

export default DatePicker;
