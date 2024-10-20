import React from 'react';
import AboutUsi from '../../assets/AboutUs.jpg'; // Assuming this is the image for the left column
import BackgroundImage from '../../assets/Aboutbg.jpg'; // Assuming you have a background image

const AboutUs = () => {
  return (
    <div 
      className="relative p-8 font-sans h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }} // Background image for the entire section
    >
      {/* Overlay to darken background */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <h1 
        className="relative z-20 text-6xl font-bold text-transparent bg-clip-text bg-center bg-cover text-center mb-8"
        style={{ 
          backgroundImage: `url(${BackgroundImage})`, // Same background image applied to text
          WebkitBackgroundClip: 'text', // Ensures background clip works for Webkit browsers
          backgroundClip: 'text', // Ensures background clip for non-webkit browsers
          color: 'transparent' // Text remains transparent
        }}
      >
        About Us
      </h1>
      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto bg-white bg-opacity-90 p-8 rounded-lg border border-collapse border-spacing-3 border-black shadow-md flex flex-col md:flex-row items-center">
        {/* Left Column - Image */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <img 
            src={AboutUsi} 
            alt="About Us Illustration" 
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Right Column - Text */}
        <div className="w-full md:w-2/3 md:pl-8">
          <p className="text-lg text-center md:text-center leading-relaxed mb-6">
            Welcome to <strong>IndiaVista</strong>, your gateway to India's rich heritage and timeless cultural treasures.
            Our mission is to make exploring India’s history engaging and accessible, whether you’re a curious traveler or a
            history enthusiast. Every monument has a story, and we’re here to help you uncover these diverse and fascinating tales.
          </p>
          <p className="text-lg text-center md:text-center leading-relaxed">
            At <strong>IndiaVista</strong>, we provide an interactive experience that allows users to search and filter by location,
            create trip itineraries, and document their journeys to share with the community. Our cultural calendar keeps you updated
            on festivals and events across India’s landscape, offering a deeper connection to the heart of our heritage. Through engaging
            tools, we make exploring India’s past both meaningful and memorable. Join us in celebrating and preserving our shared heritage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
