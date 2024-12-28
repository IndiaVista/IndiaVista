import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Marker,  TileLayer,Tooltip } from "react-leaflet";
import L, { icon } from "leaflet";
import osm from "../Map/marker_map/osm-provider.js";
import img from "../../../../assets/MapImages/location.png";
import "leaflet/dist/leaflet.css";
import "./index.css";
// import cities from "../cities.json";
import axios from "axios";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/styles";
import PopupContentStructure from "../Map/marker_map/popupContentStructure.jsx";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../../../services/apiConnector.js";
import { mapEndpoints } from "../../../../services/apis.js";
import icon2 from "../../../../assets/MapImages/iternary.png";
import "leaflet-routing-machine";
import SideBar from "./SideBar.jsx";

const { MAP_SITES_API, MAP_SITESDATA_API } = mapEndpoints;
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
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});

const markerOptions = {
  icon: iternaryIcon,
  draggable: true,
};
const ItineraryPlanner = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ZOOM_LEVEL = 5;
  const mapRef = useRef(null);
  const INDIA_BOUNDS = [
    [6.74678, 68.14712], // Southwest corner
    [35.51333, 97.39556], // Northeast corner
  ];
  const [canSelect,setCanSelect]=useState(true)
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const DEFAULT_COORDINATES = { lat: 20.5937, lng: 78.9629 }; // Center of India

  useEffect(() => {
    //on clicking new marker the error of selecting date and time should appear
    //if not selected
    
    console.log(canSelect)
    const fetchData = async () => {
      try {
        const response = await apiConnector("GET", MAP_SITESDATA_API);
        // console.log(response.data.data)
        setCities(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  

  //Handle Place selection
  const handlePlaceSelection = (place) => {
    // The prev parameter is used to access the previous state of selectedPlaces.
    setSelectedPlaces((prev) => {
        //finding if the place is already in selected places
      const isSelected = prev.some((item) => item.sr_no === place.sr_no);

      if (isSelected) {
        // Remove the place if present already on clicking
        setCanSelect(true)
        return prev.filter((item) => item.sr_no !== place.sr_no);
        
      } else {
        //dont allow to add if date and time of prev site is 
        //not set
        if (prev.length > 0) {
            const lastElement = prev[prev.length - 1];
            if(lastElement.date==="" || lastElement.time===""){
               setCanSelect(false)
               return [...prev]
            }
          }
          console.log(canSelect)
          setCanSelect(true)
        // Add the place if not present already on clicking 
        return [...prev, { ...place, date: "", time: "" }];
       
      }
      
    });
    
  };


  return (
    <div className="flex flex-col md:flex-row gap-4 ">
      {/* Map Section */}
      <div className="flex-1 w-[50vw] h-[110vh] border border-gray-300 rounded-lg shadow-lg p-10">
        <MapContainer
          className="markercluster-map w-full"
          center={DEFAULT_COORDINATES}
          zoom={ZOOM_LEVEL}
          minZoom={5}
          maxZoom={19}
          maxBounds={INDIA_BOUNDS}
          scrollWheelZoom={true}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)} // Set mapRef
          //   style={{ height: "100%", width: "100%" }} // Ensure it fills the parent
        >
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
          <MarkerClusterGroup
            showCoverageOnHover={false}
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
     />
      </div>
    </div>
  );
};

export default ItineraryPlanner;
