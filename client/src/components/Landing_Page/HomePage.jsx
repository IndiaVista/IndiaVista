import React, { useEffect, useRef } from 'react';
import v1 from '../../assets/Landing_page/v1.mp4'; 
import Typed from 'typed.js';
import { Link } from 'react-router-dom';

function HomePage () {
  const el = useRef(null); 

  useEffect(() => {
    const options = {
      strings: [
        "DISCOVER INDIA'S RICH CULTURE",
        "EXPLORE THE BEAUTY OF HERITAGE",
        "EMBRACE TRADITIONS AND HISTORY"
      ],
      typeSpeed: 80,
      backSpeed: 80,
      backDelay: 1500,
      loop: true
    };

    const typed = new Typed(el.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div id="home" className="relative w-full h-screen">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay 
        loop 
        muted
        controls 
      >
        <source src={v1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-white text-2xl sm:text-5xl font-semibold">
          <span ref={el}></span>
        </h1>
        
        <Link to="/auth">
        <button
          className="mt-40 px-6 py-3 bg-red-500 text-white rounded-md text-lg hover:bg-red-600 font-medium"
        >
          Read More
        </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;



