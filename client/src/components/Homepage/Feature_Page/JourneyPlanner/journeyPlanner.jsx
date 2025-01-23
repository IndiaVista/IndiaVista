import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import L, { icon } from "leaflet";
import osm from "../Map/marker_map/osm-provider.js";
import img from "../../../../assets/MapImages/location.png";
import "leaflet/dist/leaflet.css";
import "./index.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/styles";
import { apiConnector } from "../../../../services/apiConnector.js";
import { mapEndpoints } from "../../../../services/apis.js";
import icon2 from "../../../../assets/MapImages/iternary.png";
import "leaflet-routing-machine";
import SideBar from "./SideBar.jsx";

//To get data of sites 
const { MAP_SITESDATA_API } = mapEndpoints;
//normal marker icon
const markerIcon = new L.icon({
  iconUrl: img,
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});

//New icon for selected places
const iternaryIcon = new L.icon({
  iconUrl: icon2,
  iconSize: [35, 45],
  iconAnchor: [17, 46],//[dis from left,dis from right]
  popupAnchor: [0, -46],//means the popup will open 46 pixels above the icon's anchor point.
});

// const markerOptions = { 
//   icon: iternaryIcon,
//   draggable: true, //makes marker draggable
// };
const ItineraryPlanner = () => {
  //To store all sites
  const [cities, setCities] = useState([]);
  //to control loader
  const [loading, setLoading] = useState(true);
  //to set error if any error
  const [error, setError] = useState(null);
  //
  const ZOOM_LEVEL = 5;
  //To create reference of map so that we can do futher manipulation
  //with it
  const mapRef = useRef(null);
  //map boundaries What user should see when map renders
  const INDIA_BOUNDS = [
    [6.74678, 68.14712], // Southwest corner
    [35.51333, 97.39556], // Northeast corner
  ];
  //To control selection of marker 
  //on clicking new marker if canSelect->true maker gets selected 
  // else if canSelect->false the error of selecting date and time should appear
  const [canSelect, setCanSelect] = useState(true);
  //array storing selected places
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  // Center of India (To center of map)
  const DEFAULT_COORDINATES = { lat: 20.5937, lng: 78.9629 }; 

  //Gets map data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector("GET", MAP_SITESDATA_API);
        setCities(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //To update values whenever form is updated i.e user enters some value
  const handleChange = (index, keyName, value) => {
    console.log(index, keyName, value);
    const updatedPlaces = [...selectedPlaces];
    updatedPlaces[index] = {
      ...updatedPlaces[index],
      [keyName]: value,
    };
    setSelectedPlaces(updatedPlaces);
  };

  //Handles place selection
  const handlePlaceSelection = (place) => {
    setSelectedPlaces((prev) => {
      const isSelected = prev.some((item) => item.sr_no === place.sr_no);
  
      if (isSelected) {
        setCanSelect(true);
        return prev.filter((item) => item.sr_no !== place.sr_no);
      } else {
        // Ensure previous place has all required fields filled
        if (prev.length > 0) {
          const lastPlace = prev[prev.length - 1];
          if (
            !lastPlace.date ||
            !lastPlace.startTime ||
            !lastPlace.endTime
          ) {
            // place.index=incrementIndex()
            setCanSelect(false);
            return prev;
          } else {
            // Mark the last place as summarized
            prev[prev.length - 1].isSummarized = true;
          }
        }
        console.log(selectedPlaces)
        return [
          ...prev,
          {
            ...place,
            date: "",
            startTime: "",
            endTime: "",
            activities: [],
            transportation: "",
            priority: "",
            duration: "",
            notes: "",
            travelTime: "",
            isSummarized: false, // New place starts as unsummarized
          },
        ];
      }
    });
  };
  

  return (
    <div className="flex flex-col md:flex-row gap-4 ">
      {/* Map Section */}
      <div className="flex-1 w-[50vw] h-[110vh] border border-gray-300 rounded-lg shadow-lg p-10">
        <MapContainer
          className="w-full"
          center={DEFAULT_COORDINATES}
          zoom={ZOOM_LEVEL}
          //the user cannot zoom out to a level where they see the entire world at a glance.
          minZoom={5}   
          //the user cannot zoom in too closely to see extreme details.
          maxZoom={19}
          maxBounds={INDIA_BOUNDS}
          //The scrollWheelZoom property in the MapContainer component of react-leaflet determines
          // whether the user can zoom in and out of the map using their mouse scroll wheel or 
          // touchpad gestures.
          scrollWheelZoom={true}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)} // Set mapRef
        >
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
          <MarkerClusterGroup
            showCoverageOnHover={false}  //show area covered
            spiderfyOnMaxZoom={true}  
            zoomToBoundsOnClick={true}
            removeOutsideVisibleBounds={true}
          >
            {!loading ? (
              cities.map((site, index) => (
                <Marker
                  key={index}
                  position={[site.latitude, site.longitude]}
                  icon={
                    //checking whether the selctedPlaces has any place which is present in all sites
                    //if it any of the site return true then its icon is set to iternaryIcon
                    //to set icon
                    selectedPlaces.some((item) => item.sr_no === site.sr_no)
                      ? iternaryIcon
                      : markerIcon
                  }
                  eventHandlers={{
                    click: () => handlePlaceSelection(site),
                  }}
                  
                >
                  {/* Tooltip:The Tooltip appears when you hover over the marker.
                        The direction prop specifies where the tooltip appears relative
                         to the marker (e.g., top, bottom, left, right). */}
                  <Tooltip
                    direction="top"
                    offset={[0, -40]}
                    opacity={1}
                    permanent
                  >
                    {site.name}
                  </Tooltip>
                </Marker>
              ))
            ) : (
              <div>"Loading...."</div>
            )}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
      {/* Sidebar where all your selected places appears */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100 border rounded-lg">
        <SideBar
          selectedPlaces={selectedPlaces}
          setSelectedPlaces={setSelectedPlaces}
          handlePlaceSelection={handlePlaceSelection}
          canSelect={canSelect}
          setCanSelect={setCanSelect}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ItineraryPlanner;
