import React, { useState } from 'react';
import planner from '../Landing_Page/planner.jfif'

const UploadGallery = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Heading */}
      <div className="text-center bg-yellow-100 py-4 rounded-md mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Share your journey by uploading photos and videos from your visits to India's Landmarks
        </h2>
      </div>

      {/* Gallery */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Gallery</h3>
        <div className="grid grid-cols-4 gap-4">
          {/* Replace with your actual images */}
          <img src={planner} alt="Landmark 1" className="w-full h-32 object-cover" />
          <img src={planner} alt="Landmark 2" className="w-full h-32 object-cover" />
          <img src={planner} alt="Landmark 3" className="w-full h-32 object-cover" />
          <img src={planner} alt="Landmark 4" className="w-full h-32 object-cover" />
          <img src={planner} alt="Landmark 5" className="w-full h-32 object-cover" />
          <img src={planner} alt="Landmark 6" className="w-full h-32 object-cover" />
          <img src={planner} alt="Landmark 7" className="w-full h-32 object-cover" />
          <img src={planner} alt="Landmark 8" className="w-full h-32 object-cover" />
        </div>
      </div>

      {/* File Upload Section */}
      <div className="border-t pt-4">
        <label className="block text-center mb-4">
          <span className="block text-lg font-medium text-gray-700 mb-2">
            Upload Image or Video
          </span>
          <div className="border-2 border-dashed border-gray-300 rounded-md py-8 px-4 cursor-pointer hover:bg-gray-100">
            <input
              type="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="text-gray-500 flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 15a4 4 0 004 4h10a4 4 0 004-4V9a4 4 0 00-4-4H7a4 4 0 00-4 4v6z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11v6m0 0l-3-3m3 3l3-3"
                />
              </svg>
              <span className="font-medium text-gray-600">Choose File</span>
              {selectedFile && <p className="text-sm mt-2">{selectedFile.name}</p>}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default UploadGallery;
