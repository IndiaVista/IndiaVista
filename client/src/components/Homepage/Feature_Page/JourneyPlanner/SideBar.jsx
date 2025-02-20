import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../../services/apiConnector";
import { iternaryEndpoints } from "../../../../services/apis";
import img from "../../../../assets/double-check.png";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const { CREATE_ITERNARY } = iternaryEndpoints;
const SideBar = ({
  selectedPlaces,
  setSelectedPlaces,
  handlePlaceSelection,
  canSelect,
  setCanSelect,
}) => {
  const [created, setCreated] = useState(false);
  const saveItinerary = async () => {
    console.log("SAVE IT");
    if (
      selectedPlaces &&
      selectedPlaces[selectedPlaces.length - 1].date === "" &&
      selectedPlaces[selectedPlaces.length - 1].time === ""
    ) {
      setCanSelect(false);
    } else {
      setCanSelect(true);
      setCreated(true);
      try {
        const name="abc"
        const response = await apiConnector("POST", CREATE_ITERNARY, {
          selectedPlaces:selectedPlaces,
          name:name
        });
        setSelectedPlaces([]);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      {/* Sidebar Section */}

      {created ? (
        <div className="flex flex-col justify-center items-center p-10">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 text-6xl mb-4 heartbeat"
          />
          <p className="text-green-500 text-3xl heartbeat-delay">
            Itinerary Created
          </p>
          <div className="text-lg mt-2">Travel with your BucketList</div>
          <button
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg"
            onClick={() => setCreated(false)}
          >
            Create Another Itinerary
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-4">Selected Places</h3>

          {selectedPlaces.length === 0 ? (
            <p>
              No places selected yet. Click on markers to add them to your
              itinerary.
            </p>
          ) : (
            <ul className="space-y-3">
              {selectedPlaces.map((place, index) => (
                <li
                  key={place.sr_no}
                  className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <p className="font-semibold">{place.name}</p>
                  <div className="mt-2">
                    <label>
                      Date:{" "}
                      <input
                        type="date"
                        value={place.date}
                        onChange={(e) =>
                          setSelectedPlaces((prev) => {
                            const updated = [...prev];
                            updated[index].date = e.target.value;
                            return updated;
                          })
                        }
                      />
                    </label>
                    <label className="ml-4">
                  Time:{" "}
                  <DatePicker
                    selected={place.time ? new Date(`1970-01-01T${place.time}`) : null}
                    onChange={(date) =>
                      setSelectedPlaces((prev) => {
                        const updated = [...prev];
                        updated[index].time = date ? format(date, 'HH:mm') : "";
                        return updated;
                      })
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
                  </div>
                  <button
                    className="text-red-500 mt-2"
                    onClick={() => handlePlaceSelection(place)}
                  >
                    Deselect
                  </button>
                </li>
              ))}
            </ul>
          )}
          {!canSelect ? (
            <div className="text-red-500  mt-4">
              Please set the date and time for the previous place before
              selecting a new one.
            </div>
          ) : (
            <div className="text-green-500 mt-4">
              Add more to your Itinerary
            </div>
          )}
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            onClick={saveItinerary}
          >
            Save Itinerary
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
