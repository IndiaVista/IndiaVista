import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import osm from "./osm-provider.js";
import img from "../../../../assets/MapImages/location.png"
import "leaflet/dist/leaflet.css";
import "./index.css";
import cities from "./cities.json";


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
  return (
    <>
      <div className="row m-24">
        <div className="col text-center">
          <h2>React-leaflet-Basic Openstreet map</h2>
          <p>Loading Basic map using layer from maptiler</p>
          <div className="col">
            <MapContainer
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
                {cities.map((city, index) => (
                  <Marker
                    position={[city.lat, city.lng]}
                    key={index}
                    icon={markerIcon}
                  >
                    <Popup>{city.city}</Popup>
                  </Marker>
                ))}
              
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
