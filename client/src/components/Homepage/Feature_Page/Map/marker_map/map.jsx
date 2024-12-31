// import React, { useRef, useState, useEffect } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import L from "leaflet";
// import osm from "./osm-provider.js";
// import img from "../../../../../assets/MapImages/location.png";
// import "leaflet/dist/leaflet.css";
// import "./index.css";
// // import cities from "../cities.json";
// import axios from "axios";
// import MarkerClusterGroup from "react-leaflet-markercluster";
// import "react-leaflet-markercluster/styles";
// import PopupContentStructure from "./popupContentStructure.jsx";
// import { useNavigate } from "react-router-dom";
// import { apiConnector } from "../../../../../services/apiConnector.js";
// import { mapEndpoints } from "../../../../../services/apis.js";
// // const Temp={
// //   name:"abc",
// //   description:"jdjdnm",
// //   image:{img},
// //   location:"kbc",
// // }
// const{
//   MAP_SITES_API,
//   MAP_SITESDATA_API
// }=mapEndpoints
// const markerIcon = new L.icon({
//   iconUrl: img,
//   iconSize: [35, 45],
//   iconAnchor: [17, 46],
//   popupAnchor: [0, -46],
// });
// const Map = () => {
//   const [cities,setCities]=useState([])
//   const [loading,setLoading]=useState(true)
//   const [error,setError]=useState(null)

//   const [center, setCenter] = useState({ lat: 21.089908, lng: 79.153971 });
//   const ZOOM_LEVEL = 5;
//   const mapRef = useRef();
//   const INDIA_BOUNDS = [
//     [6.74678, 68.14712], // Southwest corner
//     [35.51333, 97.39556], // Northeast corner
//   ];
//   const navigate=useNavigate()
//   const DEFAULT_COORDINATES = { lat: 20.5937, lng: 78.9629 }; // Center of India
//   const handleNavigateToSite = (sr_no) => {
//     // Navigate to the heritage site page based on sr_no
//     navigate(`/home/heritage/heritage-site/${sr_no}`);
//   };

//   //USE ONLY WHEN WANT TO INSERT DATA
//   // useEffect(()=>{
//   //   const fetchData=async()=>{
//   //     try {
//   //       const response=await apiConnector("POST",MAP_SITES_API);
//   //       console.log(response.data)
//   //       setCities(response.data)
//   //       setLoading(false)
//   //     } catch (error) {
//   //       setError(error.message);
//   //       setLoading(false)
//   //     }
//   //   }
//   //   fetchData()
//   // },[])

//   useEffect(()=>{
//     const fetchData=async()=>{
//       try {
//         const response=await apiConnector("GET",MAP_SITESDATA_API);
//         // console.log(response.data.data)
//         setCities(response.data.data)
//         setLoading(false)
//       } catch (error) {
//         setError(error.message);
//         setLoading(false)
//       }
//     }
//     fetchData()
//   },[])

//   return (
//     <>
//       <div className="row ">
//         <div className="col text-center">
//           <div className="col mr-96 ml-96">
//             <MapContainer
//               className="markercluster-map"
//               center={DEFAULT_COORDINATES}
//               zoom={ZOOM_LEVEL}
//               minZoom={5}
//               maxZoom={19}
//               maxBounds={INDIA_BOUNDS}
//               scrollWheelZoom={true}
//             >
//               <TileLayer
//                 url={osm.maptiler.url}
//                 attribution={osm.maptiler.attribution}
//               />
//               <MarkerClusterGroup
//                 showCoverageOnHover={false}
//                 spiderfyOnMaxZoom={true}
//                 zoomToBoundsOnClick={true}
//                 removeOutsideVisibleBounds={true}
//               >
//                 {!loading? cities.map((site, index) => (
//                   <Marker
//                     key={index}
//                     position={[site.latitude, site.longitude]}
//                     icon={markerIcon}
//                   >
//                     <Popup>
//                       <PopupContentStructure
//                         sr_no={site.sr_no}
//                         name={site.name}
//                         period={site.period}
//                         site_type={site.site_type}
//                         description={site.description}
//                         image={site.image_link}
//                         location={site.location}
//                         onNavigate={handleNavigateToSite}
//                       />
//                     </Popup>
//                   </Marker>
//                 )):<div>"Loading...."</div>}
//               </MarkerClusterGroup>
//             </MapContainer>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Map;


import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import osm from "./osm-provider.js";
import img from "../../../../../assets/MapImages/location.png";
import "leaflet/dist/leaflet.css";
import "./index.css";
import axios from "axios";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/styles";
import PopupContentStructure from "./popupContentStructure.jsx";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../../../../services/apiConnector.js";
import { mapEndpoints } from "../../../../../services/apis.js";

const { MAP_SITES_API, MAP_SITESDATA_API } = mapEndpoints;

const markerIcon = new L.icon({
  iconUrl: img,
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});

const Map = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [center, setCenter] = useState({ lat: 21.089908, lng: 79.153971 });
  const ZOOM_LEVEL = 5;
  const INDIA_BOUNDS = [
    [6.74678, 68.14712],
    [35.51333, 97.39556],
  ];
  const navigate = useNavigate();
  const DEFAULT_COORDINATES = { lat: 20.5937, lng: 78.9629 };

  const handleNavigateToSite = (sr_no) => {
    navigate(`/home/heritage/heritage-site/${sr_no}`);
  };

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        Explore Heritage Sites
      </h1>
      <div className="w-full lg:w-4/5 xl:w-3/5 shadow-lg rounded-lg overflow-hidden">
        <MapContainer
          className="markercluster-map h-[500px] w-full"
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
            {!loading
              ? cities.map((site, index) => (
                  <Marker
                    key={index}
                    position={[site.latitude, site.longitude]}
                    icon={markerIcon}
                  >
                    <Popup>
                      <div className="p-2 text-sm">
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
                      </div>
                    </Popup>
                  </Marker>
                ))
              : (
                <div className="text-gray-600 font-medium">
                  Loading...
                </div>
              )}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
      {error && (
        <p className="mt-4 text-red-500 font-medium">
          Error loading map data: {error}
        </p>
      )}
    </div>
  );
};

export default Map;
