import React, { useRef, useState,useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import osm from "./osm-provider.js";
import img from "../../../../assets/MapImages/location.png"
import "leaflet/dist/leaflet.css";
import "./index.css";
import cities from "./cities.json";
import axios from 'axios'
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'react-leaflet-markercluster/styles'


const markerIcon = new L.icon({
  iconUrl: img,
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});
const Map = () => {
  const [center, setCenter] = useState({ lat: 21.089908, lng: 79.153971 });
  const ZOOM_LEVEL = 5;
  const mapRef = useRef();
  const INDIA_BOUNDS = [
    [6.74678, 68.14712], // Southwest corner
    [35.51333, 97.39556], // Northeast corner
  ];

  const DEFAULT_COORDINATES = { lat: 20.5937, lng: 78.9629 }; // Center of India
  
  const [geodata,setGeodata]=useState(null);

  useEffect(() => {
    const fetchGeoData = async () => {
      const cachedData = localStorage.getItem("geoData");
  
      if (cachedData) {
        setGeodata(JSON.parse(cachedData));
      } else {
        const overpassQuery = `
          [out:json];
          area["name"="India"]->.searchArea;
          (
            node["heritage"](area.searchArea);
            way["heritage"](area.searchArea);
            relation["heritage"](area.searchArea);
            node["historic"](area.searchArea);
            way["historic"](area.searchArea);
            relation["historic"](area.searchArea);

            // Tourist attractions
  node["tourism"="attraction"](area.searchArea);
  way["tourism"="attraction"](area.searchArea);
  relation["tourism"="attraction"](area.searchArea);
  
  // Temples
  node["amenity"="place_of_worship"]["religion"="hindu"](area.searchArea);
  way["amenity"="place_of_worship"]["religion"="hindu"](area.searchArea);
  relation["amenity"="place_of_worship"]["religion"="hindu"](area.searchArea);
          );
          out body;
        `;
  
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
          overpassQuery
        )}`;
  
        try {
          const response = await axios.get(url);
          console.log(response.data.elements);
          setGeodata(response.data);
          localStorage.setItem("geoData", JSON.stringify(response.data));
        } catch (error) {
          console.error("Error fetching GeoJSON data:", error);
        }
      }
    };
  
    fetchGeoData();
  }, []);
  return (
    <>
      <div className="row m-24">
        <div className="col text-center">
          <h2>React-leaflet-Basic Openstreet map</h2>
          <p>Loading Basic map using layer from maptiler</p>
          <div className="col">
            <MapContainer
               className="markercluster-map"
              center={DEFAULT_COORDINATES}
              zoom={ZOOM_LEVEL}
              ref={mapRef}
              // minZoom={5} // Set minimum zoom level to 5
              // maxZoom={20} // Set maximum zoom level to 14
              maxZoom={19} // Allow closer zooming
              bounds={INDIA_BOUNDS}
              maxBounds={INDIA_BOUNDS}
              scrollWheelZoom={true}
            >
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
                <MarkerClusterGroup>
                {geodata && geodata.elements && geodata.elements.map((element, index) => {
                // Check if the element has valid coordinates (lat, lon)
                if (element.lat && element.lon) {
                  return (
                    <Marker
                      key={element.id}
                      position={[element.lat, element.lon]}
                      icon={markerIcon}
                    >
                      <Popup>{element.tags.name || "Unnamed Site"}</Popup>
                    </Marker>
                  );
                }
                return null; // Return null if no coordinates available
              })}
              
                </MarkerClusterGroup>
                <Marker
                position={[20.5937,78.9629]}
                icon={markerIcon}

                >
                  <Popup>styling popup</Popup>
                </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
