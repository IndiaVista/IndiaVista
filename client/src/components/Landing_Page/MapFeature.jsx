import React from "react";
import "../../../src/index.css";
import image1 from "../../assets/map.jpg";
import image2 from "../../assets/nearby.jpg"

function MapFeature() {
  return (
    <div className="bg-white w-full h-full flex flex-col items-center justify-center gap-5 p-6">
      <div className="text-black font-jakarta font-extrabold text-4xl">
        Discover India’s vibrant Heritage with
      </div>
      <div className="text-sky-700 font-jakarta font-extrabold text-4xl">
        Interactive Map
      </div>

      {/* Container for First & Third Section */}
      <div className="w-10/12 h-3/4 bg-white shadow-lg grid grid-cols-2 gap-2 p-6 mb-10">
        
        {/* First Box (Image) and Third Box (Text) */}
        <div className="flex flex-col gap-4  bg-purple-100 bg-blend-screen p-4 rounded-lg">
          {/* First Box with Image */}
          <div className="w-full h-60 p-4 flex items-center justify-center">
            <img
              src={image1}
              className="w-96 h-60 border-black"
              alt="Navigate various places in India"
            />
          </div>
          
          {/* Third Box with Text */}
          <div className="w-full h-60 bg-white shadow-lg p-4 rounded-lg flex items-center justify-center">
            <div className="text-center flex flex-col items-center gap-4 p-4">
              <p className="font-extrabold font-serif text-2xl">Navigate Landmarks Across the Country</p>
              <p className="text-lg">
                Locate and explore India’s most iconic historic sites directly on
                an interactive map, offering insights into each landmark’s rich
                heritage and significance.
              </p>
            </div>
          </div>
        </div>

        {/* Container for Second & Fourth Section */}
        <div className="flex flex-col gap-4  bg-purple-100 bg-blend-screen p-4 rounded-lg">
          {/* Second Box with Text */}
          <div className="w-full h-60 bg-white shadow-lg p-4 rounded-lg flex items-center justify-center">
            <div className="text-center flex flex-col items-center gap-4 p-4">
              <p className="mb-2 font-extrabold font-serif text-2xl">Explore Historical Sites Near You</p>
              <p className="text-lg">
                Effortlessly discover nearby monuments and hidden cultural gems
                that showcase India's rich heritage and history.
              </p>
            </div>
          </div>

          {/* Fourth Box with Image */}
          <div className="w-full h-60 p-4 flex items-center justify-center">
            <img
              src={image2}
              className="w-96 h-60 border-black"
              alt="Explore nearby places in India"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapFeature;
