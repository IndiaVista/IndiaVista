import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../../../../../services/apiConnector";
import { mapEndpoints } from "../../../../../services/apis";

const { MAP_GET_SITE } = mapEndpoints;

const Site = () => {
  const params = useParams();
  const { sr_no } = params;
  const [site, setSite] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await apiConnector(
          "GET",
          MAP_GET_SITE,
          null,
          null,
          { sr_no }
        );
        setSite(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchdata();
  }, [sr_no]);

  if (!site) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-500 font-semibold">
          Site not found! Please check the details and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src={site.image_link}
              alt={site.name}
              className="w-full h-auto object-contain md:max-h-[500px]"
            />
          </div>
          {/* Content Section */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{site.name}</h1>
            <p className="text-gray-600 mb-4 leading-relaxed">{site.fulldesc}</p>
            <p className="text-gray-800 font-semibold">
              <span className="text-gray-500">Location: </span>
              {site.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Site;
