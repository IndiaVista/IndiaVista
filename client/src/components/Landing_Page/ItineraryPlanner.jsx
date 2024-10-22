import React from 'react';

const ItineraryPlanner = () => {
  return (
    <section id="document" className="py-10 px-5 bg-gray-50">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start lg:space-x-8">
        {/* Left Side: Content */}
        <div className="lg:w-1/2 bg-white p-6 shadow-md rounded-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Itinerary Planner
          </h1>
          <p className="text-gray-700 mb-4">
          Create your own cultural adventure with our Itinerary Planner, designed to help you explore India's rich heritage and timeless traditions. Whether you're drawn to ancient temples, vibrant festivals, or historic landmarks, our planner tailors a journey that captures the essence of India's diverse culture. Craft your perfect experience by selecting destinations and activities that resonate with your interests, and embark on an unforgettable cultural journey.
          </p>
          <p className="text-gray-700 mb-4">
          Dive deep into the local flavors by enjoying authentic cuisines that reflect the region's history and traditions.Our itineraries are flexible, allowing you to adapt your journey as you go, ensuring every moment is filled with discovery. Let us guide you in creating memories that will last a lifetime as you uncover the beauty and diversity of India.
          </p>
        </div>

        {/* Right Side: Static Itinerary */}
        <div className="lg:w-1/2 bg-white p-2 shadow-md rounded-md mt-10 lg:mt-0">
  <h2 className="text-2xl font-bold mb-2 text-blue-600">Your Itinerary</h2>

  {/* Itinerary Card - Stop 1 */}
  <div className="mb-2 p-2 border rounded-md shadow-sm bg-gray-100">
    <h3 className="text-lg font-semibold text-gray-700">Stop 1: Destination</h3>
    <p className="text-gray-600">New Delhi, India</p>
    <p className="text-gray-500 text-sm">Date: 25th Dec 2024</p>
    <p className="text-gray-500 text-sm">Notes: Visit India Gate and explore local cuisine.</p>
  </div>

  {/* Itinerary Card - Stop 2 */}
  <div className="mb-2 p-2 border rounded-md shadow-sm bg-gray-100">
    <h3 className="text-lg font-semibold text-gray-700">Stop 2: Destination</h3>
    <p className="text-gray-600">Agra, India</p>
    <p className="text-gray-500 text-sm">Date: 26th Dec 2024</p>
    <p className="text-gray-500 text-sm">Notes: Visit the Taj Mahal and Agra Fort.</p>
  </div>

  {/* Final Instructions */}
  <div className="mt-4 text-center">
    <p className="text-green-600 font-semibold">Ready to start your adventure?</p>
    <p className="text-gray-600">Click below to confirm your itinerary!</p>
    <button className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-md font-medium hover:bg-blue-700 transition">
      CONFIRM ITINERARY
    </button>
  </div>
</div>


      </div>
    </section>
  );
};

export default ItineraryPlanner;



// import React from 'react';
// // mport planner from '../Landing_Page/planner.jfif'

// const ItineraryPlanner = () => {
//   return (
//     <div className="flex flex-col md:flex-row items-center justify-center py-4 px-10">
//       {/* Left side - Text */}
//       <div className=" rounded-lg p-4 text-center md:text-left md:w-1/2 mb-4 md:mb-0">
//         <h1 className="text-3xl font-bold mb-2 text-blue-600 ">Itinerary Planner</h1>
//         <p className="text-lg text-gray-600">
//         Create your own cultural adventure with our Itinerary Planner, designed to
//         help you explore India's rich heritage and timeless traditions. Whether you're
//         drawn to ancient temples, vibrant festivals, or historic landmarks, our planner
//         tailors a journey that captures the essence of India's diverse culture. Craft
//         your perfect experience by selecting destinations and activities that resonate
//         with your interests, and embark on an unforgettable cultural journey.
//         </p>
//       </div>
      
//       {/* Right side - Image */}
//       <div className=" flex justify-center md:justify-end">
//         <img 
//           src="https://marketplace.canva.com/EAFY09C0FrU/1/0/1236w/canva-beige-and-cream-modern-travel-itinerary-planner-GOOTH86gKmo.jpg"
//           alt="Itinerary Planner" 
//           className="w-52 md:w-100 rounded-lg shadow-lg"
//         />
//       </div>
//     </div>
//   );
// }

// export default ItineraryPlanner;
