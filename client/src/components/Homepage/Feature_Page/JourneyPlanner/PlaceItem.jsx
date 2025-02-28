import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Dropdown from "../../../../common/dropdown.jsx";
import Select from "react-select";
import TimePicker from "../../../../common/DatePicker.jsx";

const activities = [
  { value: "SightSeeing", label: "Sightseeing" },
  { value: "Dinning", label: "Dining" },
  { value: "Shopping", label: "Shopping" },
  { value: "Photography", label: "Photography" },
  { value: "Hiking", label: "Hiking" },
  { value: "Trekking", label: "Trekking" },
  { value: "Meditation", label: "Meditation" },
  { value: "Exploration", label: "Exploration" },
  { value: "Boating", label: "Boating" },
  { value: "Stargazing", label: "Stargazing" },
  { value: "Cycling", label: "Cycling" },
  { value: "Kayaking", label: "Kayaking" },
  { value: "Climbing", label: "Climbing" },
  { value: "Pilgrimage", label: "Pilgrimage" },
  { value: "Storytelling", label: "Storytelling" },
  { value: "Sketching", label: "Sketching" },
  { value: "Dancing", label: "Dancing" },
  { value: "Sculpting", label: "Sculpting" },
  { value: "Crafting", label: "Crafting" },
  { value: "Relaxing", label: "Relaxing" },
  { value: "Workshops", label: "Workshops" },
  { value: "CulturalShows", label: "Cultural Shows" },
  { value: "LocalCuisine", label: "Local Cuisine" },
  { value: "Wildlife", label: "Wildlife" },
  { value: "Festivals", label: "Festivals" },
];

const dropdowns = {
  priority: ["High", "Low", "Medium"],
  transportation: ["Bicycle", "Bike", "Car", "Bus", "Airways", "Waterways"],
};

const PlaceItem = ({
  selectedPlaces,
  setSelectedPlaces,
  handlePlaceSelection,
  handleChange,
  shortForm,
  setShortForm
}) => {
  const [startTime, setTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    console.log(selectedPlaces); // Logs the current selectedPlaces whenever it changes
    console.log(`starttime:${startTime} and Endtime: ${endTime}`);
    // const STime=new Date(`1970-01-01T${time}`)
    // const Etime=new Date(`1970-01-01T${endTime}`)

    if (startTime && endTime) {
      const STime = new Date(`1970-01-01T${startTime}`);
      const ETime = new Date(`1970-01-01T${endTime}`);

      console.log(`starttime:${STime} and Endtime: ${ETime}`);

      // Calculate the duration in hours  this 24 * 60 * 60 * 1000  addition and modulus so that it would not be -ve
      const durationInMilliseconds =
        (ETime.getTime() - STime.getTime() + 24 * 60 * 60 * 1000) %
        (24 * 60 * 60 * 1000);
      const durationInHours = durationInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

      setDuration(durationInHours);

      //as we have condition that if time are set then only we can select further marker
      //this is working else if we had selected multiple markers as once and tried this won't work
      const updatedPlaces = [...selectedPlaces];
      updatedPlaces[updatedPlaces.length - 1] = {
        ...updatedPlaces[updatedPlaces.length - 1],
        duration: durationInHours,
      };
      setSelectedPlaces(updatedPlaces);
    }
  }, [startTime, endTime]); // This will run every time selectedPlaces is updated

  const handleTimeChange = (index, key, newTime) => {
    // Set the local time state (startTime or endTime)
    if (key === "startTime") {
      setTime(newTime);
    } else if (key === "endTime") {
      setEndTime(newTime);
    }
  
    // Update the place object in `selectedPlaces` using `handleChange`
    handleChange(index, key, newTime);
  };

  //To change edit and save state edit->Summarized save->form not Summarized
  const toggleSummarize=(index)=>{
    console.log("before toggle",selectedPlaces)
    const updatedPlaces=selectedPlaces.map((place,idx)=>(
      index==idx?{...place,isSummarized:!place.isSummarized}:place
    ))
    setSelectedPlaces(updatedPlaces)
    console.log("after toggle",selectedPlaces)
  }

  return (
    <div>
     {
      <ul className="space-y-3">
      {selectedPlaces.map((place, index) => (
        <li
          key={place.sr_no}
          className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          {
            place.isSummarized?(// Summarized View
              <div className="summarized-view">
                <h4>{index+1}</h4>
                <p><strong>{place.name}</strong></p>
                <p>Date: {place.date}</p>
                <p>Start Time: {place.startTime}</p>
                <p>End Time: {place.endTime}</p>
                {place.notes && <p>Notes: {place.notes}</p>}

              </div>):(
                <div>
                  
          <p className="font-semibold">{place.name}</p>
          <div className="mt-2 space-y-2">
            <label>
              Date:{" "}
              <input
                type="date"
                value={place.date || ""}
                onChange={(e) => handleChange(index, "date", e.target.value)}
              />
            </label>

            <div className="flex flex-wrap gap-4">
              <TimePicker
                label="Start Time"
                time={place.startTime}
                onTimeChange={(newTime) => {
                   handleTimeChange(index, "startTime", newTime)}
                }
              />

              <TimePicker
                label="End Time"
                time={place.endTime}
                onTimeChange={(newTime) => handleTimeChange(index, "endTime", newTime)}
              />
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <Select
                isMulti
                options={activities}
                value={place.activities || []}
                onChange={(activities) =>
                  handleChange(index, "activities", activities)
                }
                placeholder="Select Activities"
              />
              {Object.entries(dropdowns).map(([key, value], idx) => (
                <Dropdown
                  key={idx}
                  items={value}
                  labels={`Select ${
                    key.charAt(0).toUpperCase() + key.slice(1)
                  }`}
                  handleChange={handleChange}
                  indexval={index}
                  keyName={key}
                />
              ))}
              <label htmlFor="duration">Duration (in hours):</label>
              <input
                type="number"
                id="duration"
                value={place.duration || 0}
                readOnly
                className=" border-collapse border-gray-600 border-2 border-radius-4 "
              />
              <label htmlFor="notes">Notes:</label>
              <textarea
                id="notes"
                value={place.notes || ""}
                onChange={(e) => handleChange(index, "notes", e.target.value)}
                placeholder="Enter your notes here"
                required
              />
              <label htmlFor="duration">Travel Time (in mins):</label>
              <input
                type="number"
                id="travelTime"
                value={place.travelTime || ""}
                onChange={(e) =>
                  handleChange(index, "travelTime", e.target.value)
                }
                className=" border-collapse border-gray-600 border-2 border-radius-4 "
              />
            </div>
          </div>
          
         
                </div>
              )
          }
          <button
            className="text-red-500 mt-2"
            onClick={() => handlePlaceSelection(place)}
          >
            Deselect
          </button>
          <button  className="text-blue-500 mt-2"
          onClick={()=>toggleSummarize(index)}
          >
            {place.isSummarized?"Edit":"Save"}
          </button>
        </li>
      ))}
    </ul>
     
     
    }
     
    </div>
  );
};

export default PlaceItem;
