import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../assets/Loaders/Loader_Triangles.svg';

const CreatedIternary = ({ setCreated, iternary }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const simulateLoading = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay
      setLoading(!iternary);
    };

    simulateLoading();

    // setLoading(!iternary);  // If `iternary` exists, set loading to false
  }, [iternary]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <img src={Loader} alt="Loading..." className="w-32 h-32" />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center p-10">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 text-6xl mb-4 heartbeat"
          />
          <p className="text-green-500 text-3xl heartbeat-delay">
            Itinerary Created
          </p>
          <div className="text-lg mt-2">Travel with your BucketList</div>
          <button
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg"
            onClick={() => setCreated(false)}
          >
            Create Another Itinerary
          </button>
          {iternary && (
            <button
              className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg"
              onClick={() => navigate("/iternary/preview", { state: iternary })}
            >
              Preview
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedIternary;
