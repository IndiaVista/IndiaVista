import React,{useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Preview from './preview.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '@headlessui/react';
const CreatedIternary = ({setCreated,iternary}) => {
  useEffect(()=>{
      console.log(iternary)
    },[iternary])
  const navigate=useNavigate()
  return (
    <div>
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
                {setCreated && 
                <button
                onClick={()=>navigate("/iternary/preview",{ state: iternary })}
                >Preview</button>
                }
              </div>
    </div>
  )
}

export default CreatedIternary
