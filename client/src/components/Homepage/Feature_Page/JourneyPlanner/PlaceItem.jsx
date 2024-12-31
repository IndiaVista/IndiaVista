const PlaceItem = ({ place, index, setSelectedPlaces, handlePlaceSelection }) => {
    return (
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
              selected={
                place.time ? new Date(`1970-01-01T${place.time}`) : null
              }
              onChange={(date) =>
                setSelectedPlaces((prev) => {
                  const updated = [...prev];
                  updated[index].time = date ? format(date, "HH:mm") : "";
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
    );
  };

  export default PlaceItem