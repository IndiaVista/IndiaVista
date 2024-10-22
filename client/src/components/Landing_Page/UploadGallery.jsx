import React from "react";

const UploadGallery = () => {
  return (
    <section id="gallery" className="bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Main Heading Above the Container */}
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Share your journey by uploading photos and videos from your visits to India’s Landmarks
        </h2>

        <div className="bg-gray-50 p-4 rounded-xl shadow-lg max-w-3xl w-full">
          <h3 className="text-xl font-bold mb-6 text-gray-800 text-center">
            Share Your Travel Experience
          </h3>

          {/* Upload Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-full h-max border-4 border-dashed border-gray-300 rounded-lg p-2 flex flex-col items-center justify-center bg-white transition-shadow hover:shadow-md">
              <div className="mb-2">
                {/* SVG Upload Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm mb-1">Drag and drop or</p>
              <p className="text-blue-600 font-semibold text-sm cursor-pointer hover:text-blue-800">
                Click to upload your photos or videos
              </p>
            </div>
          </div>

          {/* Pictures Section */}
          <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
            Photos Uploaded by Others
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {/* Static media items (replace with actual images) */}
            <div className="relative group">
              <img
                src="/path-to-image1.jpg"
                alt="Uploaded Place 1"
                className="w-28 h-28 object-cover rounded-md shadow-lg transform group-hover:scale-105 transition-all duration-300"
              />
            </div>
            <div className="relative group">
              <img
                src="/path-to-image2.jpg"
                alt="Uploaded Place 2"
                className="w-28 h-28 object-cover rounded-md shadow-lg transform group-hover:scale-105 transition-all duration-300"
              />
            </div>
            <div className="relative group">
              <img
                src="/path-to-image3.jpg"
                alt="Uploaded Place 3"
                className="w-28 h-28 object-cover rounded-md shadow-lg transform group-hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>

          {/* Videos Section */}
          <h3 className="text-lg font-semibold mt-6 mb-4 text-gray-800 text-center">
            Videos Uploaded by Others
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {/* Static video items (replace with actual videos) */}
            <div className="relative group">
              <video
                src="/path-to-video1.mp4"
                controls
                className="w-28 h-28 object-cover rounded-md shadow-lg transform group-hover:scale-105 transition-all duration-300"
              ></video>
            </div>
            <div className="relative group">
              <video
                src="/path-to-video2.mp4"
                controls
                className="w-28 h-28 object-cover rounded-md shadow-lg transform group-hover:scale-105 transition-all duration-300"
              ></video>
            </div>
            <div className="relative group">
              <video
                src="/path-to-video3.mp4"
                controls
                className="w-28 h-28 object-cover rounded-md shadow-lg transform group-hover:scale-105 transition-all duration-300"
              ></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadGallery;
