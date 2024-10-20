import React from "react";
import Calender from "../../assets/Calender.jpg";

const CulturalCalendar = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      {/* Header */}
      

      {/* Main Content */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Left Column: Image */}
        <div className="flex flex-col justify-center">
        <h1 className="text-center text-4xl font-bold ">
        Celebrate India’s rich heritage each day with our{" "}
        {/* <br /> */}
        <span className="text-blue-600">Cultural Calendar</span>
      </h1>
          <img
            src={Calender}
            alt="Cultural Calendar illustration"
            className="w-50 h-50 max-w-50 max-h-50"
          />
        </div>

        {/* Right Column: Box 1 + Box 2 + Box 3 */}
        <div className="space-y-8 mt-10">
          {/* Box 1 */}
          <div className="bg-orange-100 shadow-xl p-6 rounded-lg max-w-full  sm:max-w-full md:max-w-full ">
            {" "}
            {/* Responsive width */}
            <div className="flex items-center mb-4 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500" // Increased icon width
                height="100" // Increased icon height
                viewBox="0 0 1792 1792" // Set the viewBox for proper scaling
                fill="black" // Changed icon color to black
              >
                <path d="M1595 295q17 41-14 70l-493 493v742q0 42-39 59-13 5-25 5-27 0-45-19l-256-256q-19-19-19-45V858L211 365q-31-29-14-70 17-39 59-39h1280q42 0 59 39z"></path>
              </svg>
              <div className="text-lg ml-5">
                {" "}
                {/* Increased margin for spacing */}
                Personalize your calendar by filtering events based on region,
                religion, or festival type, allowing a tailored cultural
                experience.
              </div>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-white-100 shadow-xl p-6 rounded-lg max-w-full sm:max-w-full md:max-w-full">
            {" "}
            {/* Responsive width */}
            <div className="flex items-center mb-4 mr-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                id="language"
                width="500" // Increased icon width
                height="100" // Increased icon height
                fill="black" 
                
              >
                <path d="M4 25a1 1 0 0 1-1-1V5a2.002 2.002 0 0 1 2-2h18a2.002 2.002 0 0 1 2 2v14a2.002 2.002 0 0 1-2 2H8.414l-3.707 3.707A.999.999 0 0 1 4 25zM23 4.998 5 5v16.586l2.293-2.293A1 1 0 0 1 8 19h15zM44 45a.999.999 0 0 1-.707-.293L39.586 41H25a2.002 2.002 0 0 1-2-2V25a2.002 2.002 0 0 1 2-2h18a2.002 2.002 0 0 1 2 2v19a1 1 0 0 1-1 1zM25 25v14h15a1 1 0 0 1 .707.293L43 41.586V25z"></path>
                <path d="M10.998 17a1 1 0 0 1-.14-1.99 6.125 6.125 0 0 0 3.435-1.717A6.057 6.057 0 0 0 15.73 11H11a1 1 0 0 1 0-2h6a1 1 0 0 1 .99 1.141 8.07 8.07 0 0 1-6.848 6.849 1.008 1.008 0 0 1-.143.01Z"></path>
                <path d="M14 11a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zm4.001 6q-.039 0-.08-.003a7.522 7.522 0 0 1-5.764-3.459 1 1 0 0 1 1.686-1.076 5.516 5.516 0 0 0 4.235 2.54A1 1 0 0 1 18.001 17zm11.998 20a1 1 0 0 1-.893-1.447l4-8a1 1 0 0 1 1.788.894l-4 8A1 1 0 0 1 30 37z"></path>
                <path d="M38.001 37a1 1 0 0 1-.895-.553l-4-8a1 1 0 0 1 1.788-.894l4 8A1 1 0 0 1 38.002 37Z"></path>
                <path d="M37.483 33.967h-6.966a1 1 0 0 1 0-2h6.966a1 1 0 0 1 0 2zM10 27a1 1 0 0 1-.707-1.707l2-2a1 1 0 0 1 1.414 1.414l-2 2A.997.997 0 0 1 10 27z"></path>
                <path d="M14 27a.997.997 0 0 1-.707-.293l-2-2a1 1 0 0 1 1.414-1.414l2 2A1 1 0 0 1 14 27Z"></path>
                <path d="M20 35h-7a2.002 2.002 0 0 1-2-2v-9a1 1 0 0 1 2 0v9h7a1 1 0 0 1 0 2zm16-14a1 1 0 0 1-.707-1.707l2-2a1 1 0 0 1 1.414 1.414l-2 2A.997.997 0 0 1 36 21z"></path>
                <path d="M36 21a.997.997 0 0 1-.707-.293l-2-2a1 1 0 0 1 1.414-1.414l2 2A1 1 0 0 1 36 21Z"></path>
                <path d="M36 21a1 1 0 0 1-1-1v-9h-7a1 1 0 0 1 0-2h7a2.002 2.002 0 0 1 2 2v9a1 1 0 0 1-1 1Z"></path>
              </svg>
              <div className="text-lg">
                {" "}
                {/* Increased margin for spacing */}
                Access the calendar in various languages for an inclusive,
                user-friendly experience.
              </div>
            </div>
          </div>

          {/* Box 3 */}
          <div className="bg-green-200 shadow-xl p-6 rounded-lg max-w-full max-h-100 sm:max-w-full md:max-w-full">
            {" "}
            {/* Responsive width */}
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                id="notification"
                width="500" // Increased icon width
                height="100" // Increased icon height
                fill="black" 
                
              >
                <path d="M43,36.72V39a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V36.72a2.84,2.84,0,0,1,2.73-2.84A2.31,2.31,0,0,0,8,33.05V21.12a15.42,15.42,0,0,1,5.94-12.2A15.63,15.63,0,0,1,27.41,6.1C33.8,7.66,39,14.46,39,21.25V32.79a3.41,3.41,0,0,0,1.18,1.09h0A2.84,2.84,0,0,1,43,36.72ZM23.52,4.62A17.29,17.29,0,0,1,27,5V4a3,3,0,0,0-3-3,3,3,0,0,0-3,3v.82A16.92,16.92,0,0,1,23.52,4.62ZM17.08,41a7,7,0,0,0,13.84,0Z"></path>
              </svg>
              <div className="text-lg ml-5">
                {" "}
                {/* Increased margin for spacing */}
                Get timely alerts for upcoming festivals and important dates to
                stay connected to meaningful celebrations.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalCalendar;
