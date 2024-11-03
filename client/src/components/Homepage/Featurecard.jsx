import React from 'react';

function FeatureCard({ svgIcon, title, description, buttonText, onButtonClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transform transition-all duration-300 hover:scale-105 w-80 h-64"
      style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
    >
      <div className="flex items-center">
        <div className="w-12 h-12 mr-4 transform transition-transform duration-300 hover:rotate-12">
          {svgIcon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mt-3">{description}</p>
      <div className="flex justify-center mt-4">
        <button
          onClick={onButtonClick}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transform transition-all duration-300 hover:scale-110"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default FeatureCard;
