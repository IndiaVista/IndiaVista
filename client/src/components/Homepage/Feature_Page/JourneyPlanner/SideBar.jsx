import React, { useEffect ,useState} from "react";
import { apiConnector } from "../../../../services/apiConnector";
import { mapEndpoints } from "../../../../services/apis";

const {
    CREATE_ITERNARY
}=mapEndpoints
const SideBar = ({
  selectedPlaces,
  setSelectedPlaces,
  handlePlaceSelection,
  canSelect,
  setCanSelect
}) => {
    const [created,setCreated]=useState(false)
    const saveItinerary=async()=>{
        console.log("SAVE IT")
        if(selectedPlaces && selectedPlaces[selectedPlaces.length-1].date==="" && selectedPlaces[selectedPlaces.length-1].time==="")
        {
            setCanSelect(false)
        }
        else{
            setCanSelect(true)
            setCreated(true)
            try {
                const response=await apiConnector("POST",CREATE_ITERNARY,{selectedPlaces})
                setSelectedPlaces([])
                console.log(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }

    }
    
    
  return (
    <div>
      {/* Sidebar Section */}

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
                  <input
                    type="time"
                    value={place.time}
                    onChange={(e) =>
                      setSelectedPlaces((prev) => {
                        const updated = [...prev];
                        updated[index].time = e.target.value;
                        return updated;
                      })
                    }
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
     {!canSelect ?(
        <div className="text-red-500  mt-4">
          Please set the date and time for the previous place before selecting a new one.
        </div>
      ):(
        <div className="text-green-500 mt-4">Add more to your Itinerary</div>
      )}
      <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
          onClick={saveItinerary}
        >
          Save Itinerary
        </button>
        {
        created?(<div>Done</div>):(<></>)
    }
    </div>
    
  );
};

export default SideBar;
