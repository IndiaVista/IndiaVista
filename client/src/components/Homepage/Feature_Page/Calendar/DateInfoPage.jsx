import React from 'react';
import { useParams } from 'react-router-dom';

function DateInfoPage() {
  const { date } = useParams();

  return (
    <div>
      <h2>Date Information</h2>
      <p>Selected Date: {date}</p>
      {/* You can add more logic to fetch and display detailed information about the date */}
    </div>
  );
}

export default DateInfoPage;
