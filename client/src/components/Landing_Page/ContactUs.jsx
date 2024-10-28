// Contact.js
import React from 'react';

const ContactUs = () => {
  return (
    <div id="contact" className="flex flex-col items-center justify-center p-8">
      {/* Main Heading */}
      <h1 className="text-5xl font-bold font-sans mb-6 text-center">Contact Us</h1>

      <div className="flex flex-col md:flex-row w-full md:max-w-4xl">
        {/* Image Container */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6R2NEuMfAqU4UDD4IZ7DDscHVOQhLeKvfSQ&s" // Replace with your image URL
            alt="Contact Us"
            className="w-full h-full rounded-lg shadow-lg"
          />
        </div>

        {/* Form Container */}
        <div className="md:w-1/2 p-6 bg-gray-50 rounded-lg shadow-lg">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your Message"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
