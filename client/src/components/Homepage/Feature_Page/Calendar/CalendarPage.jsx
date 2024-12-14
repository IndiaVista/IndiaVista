import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate()

const onDateChange = (newDate) => {
  setDate(newDate); 
  // Intl.DateTimeFormat is a built-in JavaScript object that helps you format dates according to locale conventions.
  // .format() is a method of the formatter object.
  // When you call .format() and pass a Date object like newDate, it returns a formatted date string based on the locale and options.
  const formattedDate = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(newDate);
  
  navigate(`/home/calendar/date-info/${formattedDate}`);
};

return (
  <div>
    <h2>My Calendar</h2>
    <Calendar 
      onChange={onDateChange}
      value={date} // Current selected date
    />
    
    <p>Selected Date: {date.toDateString()}</p>
  </div>
);
};

export default CalendarPage
