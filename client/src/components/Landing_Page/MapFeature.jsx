import React from "react";
import "../../../src/index.css";

import image1 from "../../assets/Landing_page/map.jpg";
import image2 from "../../assets/Landing_page/nearby.jpg"

function MapFeature() {
  return (

    <div id="discover" className="bg-white w-full h-full flex flex-col items-center justify-center gap-5 p-6">
      <div className="text-black  font-bold text-5xl text-center">

        Discover India’s vibrant Heritage with
        <div className="text-blue-600 font-bold text-3xl md:text-5xl">
          Interactive Map
        </div>
      </div>

      {/* Container for First & Third Section */}
      <div className="w-full md:w-10/12 h-auto bg-white shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 p-6 mb-10">
        
        {/* First Box (Image) and Third Box (Text) */}
        <div className="flex flex-col gap-4 bg-purple-100 bg-blend-screen p-4 rounded-lg">
          {/* First Box with Image */}
          <div className="w-full h-60 flex items-center justify-center overflow-hidden rounded-lg">
            <img
              src={image1}
              className="w-96 h-60 object-cover"
              alt="Navigate various places in India"
            />
          </div>
          
          {/* Third Box with Text */}
          <div className="w-full bg-white shadow-lg p-4 rounded-lg flex items-center justify-center">
            <div className="text-center flex flex-col items-center gap-4 p-4">
              <p className="font-extrabold font-serif text-xl md:text-2xl">Navigate Landmarks Across the Country</p>
              <p className="text-base md:text-lg">
                Locate and explore India’s most iconic historic sites directly on
                an interactive map, offering insights into each landmark’s rich
                heritage and significance.
              </p>
            </div>
          </div>
        </div>

        {/* Container for Second & Fourth Section */}
        <div className="flex flex-col gap-4 bg-purple-100 bg-blend-screen p-4 rounded-lg">
          {/* Second Box with Text */}
          <div className="w-full h-60 bg-white shadow-lg p-4 rounded-lg flex items-center justify-center">
            <div className="text-center flex flex-col items-center gap-4 p-4">
              <p className="mb-2 font-extrabold font-serif text-xl md:text-2xl">Explore Historical Sites Near You</p>
              <p className="text-base md:text-lg">
                Effortlessly discover nearby monuments and hidden cultural gems
                that showcase India's rich heritage and history.
              </p>
            </div>
          </div>

          {/* Fourth Box with Image */}
          <div className="w-full h-60 flex items-center justify-center overflow-hidden rounded-lg">
            <img
              src={image2}
              className="w-96 h-60 object-cover"
              alt="Explore nearby places in India"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapFeature;
