import React from "react";
import "../../../src/index.css";
import image1 from "../../assets/map.jpg";
import image2 from "../../assets/nearby.jpg"

function MapFeature() {
  return (
    <div className="bg-white w-full h-full flex flex-col items-center justify-center gap-6 p-6">
      <div className="text-black font-jakarta font-extrabold text-5xl">
        Discover India’s vibrant Heritage with
      </div>
      <div className="text-sky-700 font-jakarta font-extrabold text-5xl">
        Interactive Map
      </div>
      <div className="w-10/12 h-3/4 bg-white shadow-lg grid  grid-cols-2 gap-10 p-6">
        
        {/* First Box with Image */}
        <div className="w-100 h-30 p-4  border-black flex items-center justify-center">
          <div className="text-center">
            <img
              src={image1}
              className="w-250 h-72 border-black"
              alt="Navigate various places in India"
            />
          </div>
        </div>

        {/* Second Box with Text Space */}
        <div className="w-100 h-30 bg-slate-100 shadow-lg p-4 rounded-lg flex items-center justify-center">
          <div className="text-center flex flex-col items-center gap-4 p-4">
            <p className="mb-2 font-extrabold font-serif text-3xl">Explore Historical Sites Near You</p>
            <p className="text-2xl">
              Effortlessly discover nearby monuments and hidden cultural gems
              that showcase India's rich heritage and history.
            </p>
          </div>
        </div>

        {/* Third Box with Text Space */}
        <div className="w-100 h-30 bg-slate-100 shadow-lg p-4 rounded-lg flex items-center justify-center">
          <div className="text-center flex flex-col items-center gap-4 p-4">
            <p className="mb-2 font-extrabold font-serif text-3xl">Navigate Landmarks Across the Country</p>
            <p className="text-2xl">
              Locate and explore India’s most iconic historic sites directly on
              an interactive map, offering insights into each landmark’s rich
              heritage and significance.
            </p>
          </div>
        </div>

        {/* Fourth Box with Image */}
        <div className="w-100 h-30  p-4 border-black  flex items-center justify-center">
          <div className="text-center">
            <img
              src={image2}
              className="w-250 h-72 "
              alt="Description of image1"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default MapFeature;
