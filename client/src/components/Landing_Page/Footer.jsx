import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="container mx-auto px-4 flex flex-row justify-between">
        {/* Left Section with Logo and Tagline */}
        <div className="w-full sm:w-1/4 mb-6 sm:mb-0 ml-8 mr-32">
          {" "}
          {/* Increased left margin */}
          <div className="flex items-center mb-4">
            <span className="text-white text-3xl font-bold">🇮🇳</span>
          </div>
          <p className="text-sm">
            Celebrating India's rich cultural heritage and traditions, one step
            at a time.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-500 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" // Adjusted size
                height="24" // Adjusted size
                viewBox="0 0 1792 1792" // Added viewBox to ensure proper scaling
                id="facebook"
                fill="white" // Icon color

              >
                <path d="M1376 128q119 0 203.5 84.5T1664 416v960q0 119-84.5 203.5T1376 1664h-188v-595h199l30-232h-229V689q0-56 23.5-84t91.5-28l122-1V369q-63-9-178-9-136 0-217.5 80T948 666v171H748v232h200v595H416q-119 0-203.5-84.5T128 1376V416q0-119 84.5-203.5T416 128h960z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 2476 2476"
                id="instagram"
                
              >
                <path
                  d="M825.4 1238c0-227.9 184.7-412.7 412.6-412.7 227.9 0 412.7 184.8 412.7 412.7 0 227.9-184.8 412.7-412.7 412.7-227.9 0-412.6-184.8-412.6-412.7m-223.1 0c0 351.1 284.6 635.7 635.7 635.7s635.7-284.6 635.7-635.7-284.6-635.7-635.7-635.7S602.3 886.9 602.3 1238m1148-660.9c0 82 66.5 148.6 148.6 148.6 82 0 148.6-66.6 148.6-148.6s-66.5-148.5-148.6-148.5-148.6 66.5-148.6 148.5M737.8 2245.7c-120.7-5.5-186.3-25.6-229.9-42.6-57.8-22.5-99-49.3-142.4-92.6-43.3-43.3-70.2-84.5-92.6-142.3-17-43.6-37.1-109.2-42.6-229.9-6-130.5-7.2-169.7-7.2-500.3s1.3-369.7 7.2-500.3c5.5-120.7 25.7-186.2 42.6-229.9 22.5-57.8 49.3-99 92.6-142.4 43.3-43.3 84.5-70.2 142.4-92.6 43.6-17 109.2-37.1 229.9-42.6 130.5-6 169.7-7.2 500.2-7.2 330.6 0 369.7 1.3 500.3 7.2 120.7 5.5 186.2 25.7 229.9 42.6 57.8 22.4 99 49.3 142.4 92.6 43.3 43.3 70.1 84.6 92.6 142.4 17 43.6 37.1 109.2 42.6 229.9 6 130.6 7.2 169.7 7.2 500.3 0 330.5-1.2 369.7-7.2 500.3-5.5 120.7-25.7 186.3-42.6 229.9-22.5 57.8-49.3 99-92.6 142.3-43.3 43.3-84.6 70.1-142.4 92.6-43.6 17-109.2 37.1-229.9 42.6-130.5 6-169.7 7.2-500.3 7.2-330.5 0-369.7-1.2-500.2-7.2"
                  fill="white"
                ></path>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 512 512"
                id="twitter"
              >
                <g clip-path="url(#clip0_84_15697)">
                  <rect width="512" height="512" fill="none" rx="60"></rect>
                  <path
                    fill="#fff"
                    d="M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z"
                  ></path>
                </g>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 16 16"
                id="youtube"
              >
                <path
                  fill="white"
                  fill-rule="evenodd"
                  d="M15.32 4.06c-.434-.772-.905-.914-1.864-.968C12.498 3.027 10.089 3 8.002 3c-2.091 0-4.501.027-5.458.091-.957.055-1.429.196-1.867.969C.23 4.831 0 6.159 0 8.497v.008c0 2.328.23 3.666.677 4.429.438.772.909.912 1.866.977.958.056 3.368.089 5.459.089 2.087 0 4.496-.033 5.455-.088.959-.065 1.43-.205 1.864-.977.451-.763.679-2.101.679-4.429v-.008c0-2.339-.228-3.667-.68-4.438zM6 11.5v-6l5 3-5 3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation Links Column */}
        <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
          <h3 className="text-white text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Map
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Monuments Near You
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Document Your Trip
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Cultural Calendar
              </a>
            </li>
          </ul>
        </div>

        {/* Explore Culture Column */}
        <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
          <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Gallery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Festivals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Historical Monuments
              </a>
            </li>
          </ul>
        </div>

        {/* About Us Column */}
        <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
          <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="w-full sm:w-1/5">
          <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}

      <div className="mt-12 border-t border-gray-600">
        <div className="text-left text-sm text-gray-500  pt-4 ml-8">
          {" "}
          {/* Left align and increased margin-left */}© 2024 IndiaVista. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
