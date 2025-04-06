// import React from 'react';
// import { useNavigate } from 'react-router-dom';
import {  mapEndpoints } from '../../../../../services/apis.js';
import { apiConnector } from '../../../../../services/apiConnector.js';
// const PopupContentStructure = ({ sr_no,name, period,site_type,description, imageUrl, location,onNavigate }) => {
//   const navigate=useNavigate();
//   return (
//     <div className="max-w-xs sm:max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
     
      
//       {/* Content */}
//       <div className="p-4">
//         {/* Title */}
//         <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
//         {/* Period */}
//         <p className="text-sm text-gray-600 mt-2 line-clamp-3">{period}</p>
//         {/* sitetype */}
//         <p className="text-sm text-gray-600 mt-2 line-clamp-3">{site_type}</p>
//         {/* Description */}
//         <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
        
//         {/* Location */}
//         <div className="mt-4 flex items-center text-gray-600">
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             fill="none" 
//             viewBox="0 0 24 24" 
//             strokeWidth="1.5" 
//             stroke="currentColor" 
//             className="w-5 h-5 text-red-500 mr-1"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               d="M12 2.25c-4.556 0-8.25 3.694-8.25 8.25 0 4.134 3.544 7.424 7.957 11.577a1.496 1.496 0 002.586 0C16.706 17.924 20.25 14.634 20.25 10.5c0-4.556-3.694-8.25-8.25-8.25z"
//             />
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               d="M12 13.125a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25z"
//             />
//           </svg>
//           <span className="text-sm">{location}</span>
//         </div>
        
//         {/* Button */}
//         <div className="mt-4 text-black">
//           <a 
//             className="block text-center bg-blue-500 text-black font-medium py-2 px-4 rounded hover:bg-blue-600"
//             onClick={() => onNavigate(sr_no)}
//           >
//            <div className='text-black'>
//            Learn More
//            </div>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopupContentStructure;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopupContentStructure = ({
  sr_no,
  name,
  period,
  site_type,
  description,
  imageUrl,
  location,
  onNavigate,
}) => {
  const navigate = useNavigate();
  const onSave=async (siteId) => {
    console.log(siteId)
    try {
      const res = await apiConnector(
        "POST",
        mapEndpoints.SAVE_SITE,
        {siteId}
      )
  
      const data = res.data;
      alert(data.message);
    } catch (error) {
      console.error('Error saving site', error);
    }
  };
  return (
    <div className="max-w-xs sm:max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        {/* Period */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{period}</p>
        {/* Site type */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{site_type}</p>
        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>

        {/* Location */}
        <div className="mt-4 flex items-center text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-red-500 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2.25c-4.556 0-8.25 3.694-8.25 8.25 0 4.134 3.544 7.424 7.957 11.577a1.496 1.496 0 002.586 0C16.706 17.924 20.25 14.634 20.25 10.5c0-4.556-3.694-8.25-8.25-8.25z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 13.125a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25z"
            />
          </svg>
          <span className="text-sm">{location}</span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            className="flex-1 text-center bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => onNavigate(sr_no)}
          >
            Learn More
          </button>
          <button
            className="flex-1 text-center bg-green-500 text-white font-medium py-2 px-4 rounded hover:bg-green-600"
            onClick={() => onSave(sr_no)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupContentStructure;
