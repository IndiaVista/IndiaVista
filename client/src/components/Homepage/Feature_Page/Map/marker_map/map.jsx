import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import osm from "./osm-provider.js";
import img from "../../../../../assets/MapImages/location.png";
import "leaflet/dist/leaflet.css";
import "./index.css";
// import cities from "../cities.json";
import axios from "axios";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/styles";
import PopupContentStructure from "./popupContentStructure.jsx";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../../../../services/apiConnector.js";
import { endpoints } from "../../../../../services/apis.js";
// const Temp={
//   name:"abc",
//   description:"jdjdnm",
//   image:{img},
//   location:"kbc",
// }
const{
  MAP_SITES_API,
  MAP_SITESDATA_API
}=endpoints
const markerIcon = new L.icon({
  iconUrl: img,
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});
const Map = () => {
  const [cities,setCities]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)

  const [center, setCenter] = useState({ lat: 21.089908, lng: 79.153971 });
  const ZOOM_LEVEL = 5;
  const mapRef = useRef();
  const INDIA_BOUNDS = [
    [6.74678, 68.14712], // Southwest corner
    [35.51333, 97.39556], // Northeast corner
  ];
  const navigate=useNavigate()
  const DEFAULT_COORDINATES = { lat: 20.5937, lng: 78.9629 }; // Center of India
  const handleNavigateToSite = (sr_no) => {
    // Navigate to the heritage site page based on sr_no
    navigate(`/home/heritage/heritage-site/${sr_no}`);
  };

  //USE ONLY WHEN WANT TO INSERT DATA
  // useEffect(()=>{
  //   const fetchData=async()=>{
  //     try {
  //       const response=await apiConnector("POST",MAP_SITES_API);
  //       console.log(response.data)
  //       setCities(response.data)
  //       setLoading(false)
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false)
  //     }
  //   }
  //   fetchData()
  // },[])

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const response=await apiConnector("GET",MAP_SITESDATA_API);
        // console.log(response.data.data)
        setCities(response.data.data)
        setLoading(false)
      } catch (error) {
        setError(error.message);
        setLoading(false)
      }
    }
    fetchData()
  },[])

  return (
    <>
      <div className="row ">
        <div className="col text-center">
          <h2>React-leaflet-Basic Openstreet map</h2>
          <p>Loading Basic map using layer from maptiler</p>
          <div className="col mr-96 ml-96">
            <MapContainer
              className="markercluster-map"
              center={DEFAULT_COORDINATES}
              zoom={ZOOM_LEVEL}
              minZoom={5}
              maxZoom={19}
              maxBounds={INDIA_BOUNDS}
              scrollWheelZoom={true}
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
                {!loading? cities.map((site, index) => (
                  <Marker
                    key={index}
                    position={[site.latitude, site.longitude]}
                    icon={markerIcon}
                  >
                    <Popup>
                      <PopupContentStructure
                        sr_no={site.sr_no}
                        name={site.name}
                        period={site.period}
                        site_type={site.site_type}
                        description={site.description}
                        image={site.image_link}
                        location={site.location}
                        onNavigate={handleNavigateToSite}
                      />
                    </Popup>
                  </Marker>
                )):<div>"Loading...."</div>}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
