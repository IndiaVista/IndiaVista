import React from "react";
import s1 from "../../assets/Landing_page/share1.avif"
import s2 from "../../assets/Landing_page/share.jpg"

const UploadGallery = () => {
    return (
      <div id="gallery" className="flex flex-col md:flex-row items-center justify-center bg-white py-12 px-4 md:px-16 space-y-8 md:space-y-0 md:space-x-8">
      <div className="bg-white shadow-lg rounded-lg md:w-1/3 w-full max-w-xs mx-auto md:mx-0 order-2 md:order-1">
          <div className="p-4">
              <div className="relative">
                  <img
                      src={s1} 
                      alt="Heritage Insights"
                      className="rounded-lg"
                  />
                  <div className="absolute top-4 left-4 text-white text-xs bg-black bg-opacity-50 p-1 rounded">
                    Real Experiences
                  </div>
              </div>
              <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold">Heritage Insights</h2>
                  <p className="text-gray-500 text-sm my-2 text-justify">
                  Gain unique insights into India’s landmarks and traditions through authentic photos and videos shared by real travelers. Discover culture and history from diverse perspectives.
                  </p>
              </div>
          </div>
      </div>

      <div className="md:w-1/2 w-full text-center md:text-left order-1 md:order-2">
          <h1 className="text-4xl font-bold mb-4 text-center">
              Capture Your Journey!
          </h1>
          <p className="text-gray-600 text-lg mb-6" style={{ textAlign: 'justify' }}>
              Share your unforgettable moments from India’s breathtaking landmarks by uploading your photos and videos. Contribute to our collective story and inspire others to explore the vibrant heritage and traditions of our incredible country!
          </p>
          <a
              href="/auth"
              className="text-blue-600 font-semibold underline"
          >
              Share your Journey now &gt;
          </a>
      </div>

      <div className="bg-white shadow-lg rounded-lg md:w-1/3 w-full max-w-xs mx-auto md:mx-0 order-3">
          <div className="p-4">
              <div className="relative">
                  <img
                      src={s2} 
                      alt="Inspire Your Next Journey"
                      className="rounded-lg"
                  />
                  <div className="absolute top-4 left-4 text-white text-xs bg-black bg-opacity-50 p-1 rounded">
                    Explore & Inspire
                  </div>
              </div>
              <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold">Inspire Your Next Journey</h2>
                  <p className="text-gray-500 text-sm my-2 text-justify">
                    Explore an ever-growing gallery of journeys. Let stories and images from fellow explorers spark ideas for your next cultural adventure.
                  </p>
              </div>
          </div>
      </div>
  </div>
);
};

export default UploadGallery;
