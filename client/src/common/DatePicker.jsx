import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const TimePicker = ({ label, time, onTimeChange }) => {
  return (
    <label>
      {label}{" "}
      <DatePicker
        selected={time ? new Date(`1970-01-01T${time}`) : null}
        onChange={(selectedTime) =>
          onTimeChange(selectedTime ? format(selectedTime, "HH:mm") : "")
        }
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        placeholderText="Select Time"
        className="border border-gray-300 rounded p-1"
      />
    </label>
  );
};

export default TimePicker;
