import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import './calendar.css';
import { eventData } from './data.jsx';
import { apiConnector } from '../../../../services/apiConnector.js';
import { calendarEndpoints } from '../../../../services/apis.js';
import { useMemo } from 'react';

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedReligion, setSelectedReligion] = useState([]);
  const [selectedFestiveType, setSelectedFestiveType] = useState([]);
  const navigate = useNavigate();

  const {
    SAVEEVENTSTODB_API,
  } = calendarEndpoints

  const handleCheckboxChange = (setFilter, value) => {
    // console.log(selectedRegion , selectedReligion , selectedFestiveType)
    // console.log(filter, value)
    setFilter(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

const filteredDates = useMemo(() => {
  return Object.entries(eventData)      // Convert the object to an array of [key, value] pairs
    .filter(([dateKey, event]) => {
      const matchRegion = selectedRegion.length === 0 || selectedRegion.includes(event.region);
      const matchReligion = selectedReligion.length === 0 || selectedReligion.includes(event.religion);
      const matchFestiveType = selectedFestiveType.length === 0 || selectedFestiveType.includes(event.festive_type);
      return matchRegion && matchReligion && matchFestiveType;
    })
    .map(([dateKey]) => new Date(dateKey).toDateString());    // Extract and format the date keys
}, [selectedRegion, selectedReligion, selectedFestiveType]);

  const onDateChange = (newDate) => {
    setDate(newDate);
    const formattedDate = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(newDate);
    navigate(`/home/calendar/date-info/${formattedDate}`);
  };

  // *** IMP --> save the calendar data to database and this first send to backend
// useEffect(() => {
//   let isSaved = false;
//   const saveData = async () => {
//     if (isSaved) return; 
//     try {
//       const response = await apiConnector(
//         "POST",
//         SAVEEVENTSTODB_API, 
//         eventData, 
//         { "Content-Type": "application/json" } 
//       );
//       if (response.ok) {
//         console.log('Data saved successfully');
//         isSaved = true; // Mark as saved
//       } else {
//         console.log('Error saving data');
//       }
//     } catch (error) {
//       console.error('Error saving data', error);
//     }
//   };

//   saveData(); // Call the function to send data when the component mounts
// }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
  <div className="w-full max-w-screen-lg p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg sm:shadow-xl">
    <h2 className="text-xl sm:text-2xl text-center font-semibold mb-4">My Calendar</h2>

  {/* Calendar */}
  <div className="h-full w-full">
    <Calendar
      onChange={onDateChange}
      value={date}
      className="react-calendar w-full h-full"
      tileDisabled={({ date, view }) => {
        if (view === "month") {
          if (!selectedRegion.length && !selectedReligion.length && !selectedFestiveType.length) {
            return false;
          }
          return !filteredDates.includes(date.toDateString());
        }
        return false;
      }}
      tileClassName={({ date, view }) => {
        if (!selectedRegion.length && !selectedReligion.length && !selectedFestiveType.length) {
          return "";
        }

        const isDisabled = view === "month" && !filteredDates.includes(date.toDateString());
        const isHighlighted = view === "month" && filteredDates.includes(date.toDateString());

        if (isDisabled) {
          return "unavailable";
        }
        if (isHighlighted) {
          return "highlighted";
        }
        return "";
      }}
    />
  </div>

  <p className="text-center mt-4 p-2 bg-blue-200 text-blue-900 font-semibold rounded-md shadow-sm">
  Today's Date : {date.toDateString()}
</p>


  <div className="mb-4">
    <div className="mb-4">
      <span className="font-bold mb-2 block">Region:</span>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {[
          "All India",
          "Punjab",
          "Sikh",
          "Varanasi",
          "Uttar Pradesh",
          "Haryana",
          "Northern India",
          "Tamil Nadu",
          "Global",
          "Maharashtra",
          "Gujarat",
          "Sidhis",
          "Rajasthan",
          "Bihar",
          "Jharkhand",
          "Nepal",
        ].map((region) => (
          <label key={region} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={region}
              onChange={(e) =>
                handleCheckboxChange(setSelectedRegion, e.target.value)
              }
            />
            {region}
          </label>
        ))}
      </div>
    </div>

    {/* Religion Selection */}
    <div className="mb-4">
      <span className="font-bold mb-2 block">Religion:</span>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {[
          "None",
          "Hinduism",
          "Sikhism",
          "Zoroastrianism",
          "Islam",
          "Jainism",
          "Christianity",
          "Buddhism",
        ].map((religion) => (
          <label key={religion} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={religion}
              onChange={(e) =>
                handleCheckboxChange(setSelectedReligion, e.target.value)
              }
            />
            {religion}
          </label>
        ))}
      </div>
    </div>

    {/* Festive Type Selection */}
    <div>
      <span className="font-bold mb-2 block">Festive Type:</span>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {[
          "Modern",
          "Religious",
          "Spiritual",
          "National",
          "Harvest",
          "Awareness",
          "Commemorative",
          "Agricultural",
        ].map((type) => (
          <label key={type} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={type}
              onChange={(e) =>
                handleCheckboxChange(setSelectedFestiveType, e.target.value)
              }
            />
            {type}
          </label>
        ))}
      </div>
    </div>
  </div>
</div>
</div>
  );
}

export default CalendarPage;