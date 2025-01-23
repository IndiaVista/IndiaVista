import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../../services/apiConnector";
import { iternaryEndpoints } from "../../../../services/apis";
import "./index.css";
import PlaceItem from "./PlaceItem";
import CreatedIternary from "./CreatedIternary";
import { toast } from "react-toastify";
const { CREATE_ITERNARY } = iternaryEndpoints;

const SideBar = ({
  selectedPlaces,
  setSelectedPlaces,
  handlePlaceSelection,
  canSelect,
  setCanSelect,
  handleChange,
  shortForm,
  setShortForm
}) => {
  const [name, setName] = useState(""); //itinerary name
  const [nameError, setNameError] = useState(false);
  const [created, setCreated] = useState(false); //true if a itinerary is created
  const [selected, setSelected] = useState(true); //if a place is selected
  const [createdName,setData]=useState("")
  const [iternary,setIternary]=useState({})
  useEffect(() => {
    console.log("Updated createdName:", createdName);
    console.log(iternary)
  }, [createdName]);
  const saveItinerary = async () => {
    if (selectedPlaces.length === 0) {
      setSelected(false);
    } else {
      // Check if all selected places have a valid date and time
      const hasMissingDateTime = selectedPlaces.some(
        (place) => !place.date || !place.startTime || !place.endTime
      );

      if (hasMissingDateTime) {
        setCanSelect(false); // Prevent further place selection
        return;
      }
      if (!name) {
        setNameError(true);
        return;
      }
      setCanSelect(true);
      setCreated(true);
      try {
        const response = await apiConnector("POST", CREATE_ITERNARY, {
          selectedPlaces: selectedPlaces,
          name: name,
        });
        console.log("Full response:", response);
        if (response.data && response.data.data.iternary.iternaryName) {
          console.log("Itinerary name set to:", response.data.data.iternary.iternaryName);
          const data=response.data.data;
          // setData(data.iternary.iternaryName); // Update state with the name
          setIternary(data.iternary)
          console.log("Current Iternary:",data.iternary)
          
        } else {
          console.error("Response does not contain 'name'.");
        }
        setSelectedPlaces([]);
        setName("");
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message); 
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };

  return (
    <div>
      {/* Name of Iternary */}

      <label className="text-2xl font-bold text-center">
        Name your Itinerary:{" "}
        <input
          type="text"
          required="true"
          placeholder="Itinerary name"
          value={name}
          onChange={(e) => handleNameChange(e)}
          className="mt-4 border-spacing-1 border-b-2 font-normal"
        />
      </label>
      {/* Sidebar Section */}
      {created ? (
        
        <CreatedIternary setCreated={setCreated} iternary={iternary} />
      ) : (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Selected Places</h3>

          {selectedPlaces.length === 0 && !selected ? (
            <p className="text-red-600">
              No places selected yet. Click on markers to add them to your
              itinerary.
            </p>
          ) : (
            <PlaceItem
              selectedPlaces={selectedPlaces}
              setSelectedPlaces={setSelectedPlaces}
              handlePlaceSelection={handlePlaceSelection}
              handleChange={handleChange}
              shortForm={shortForm}
              setShortForm={setShortForm}
            />
          )}

          <div className={`mt-4 text-${canSelect ? "green" : "red"}-500`}>
            {canSelect
              ? "Add more to your Itinerary"
              : "Please set the date and time for the previous place before selecting a new one."}
          </div>

          <button
            className={`mt-4 px-4 py-2 rounded-lg w-full ${
              !name ||
              selectedPlaces.some((place) => !place.date || !place.time)
                ? "bg-blue-500 text-white-500 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            onClick={saveItinerary}
          >
            Save Itinerary
          </button>
        </div>
      )}
      {nameError && (
        <div className="text-red-500 mt-4 text-center">
          Please enter itinerary name!
        </div>
      )}
    </div>
  );
};

export default SideBar;
