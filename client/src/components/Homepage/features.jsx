import React from 'react';
import FeatureCard from './FeatureCard';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="map">
        <path d="M29.166 11.638a.5.5 0 1 1 .953-.3 13.844 13.844 0 0 1 .646 4.192 17.339 17.339 0 0 1-.416 3.93.5.5 0 0 1-.487.387.55.55 0 0 1-.113-.012.5.5 0 0 1-.375-.6 16.346 16.346 0 0 0 .391-3.7 12.836 12.836 0 0 0-.599-3.897ZM7.078 34.331a.5.5 0 0 0 .478-.354l1.883-6.167a.5.5 0 1 0-.956-.292L6.6 33.685a.5.5 0 0 0 .478.646Zm34.845 8.829a.507.507 0 0 1-.4.2H7.463a.492.492 0 0 1-.48-.65l1.5-4.91v-.02l3.35-10.95-.22-.22c-3.27-3.27-5.63-5.64-5.63-11.08a10.89 10.89 0 0 1 21.78 0 11.875 11.875 0 0 1-3.41 8.77H36a.5.5 0 0 1 .48.35l.74 2.42a.035.035 0 0 1 .01.02c0 .01.01.03.01.04l4.75 15.58a.51.51 0 0 1-.067.45Zm-6.29-17.86h-9.455l4.322 3.835 5.641-2.164Zm-23.69-10.35a4.935 4.935 0 1 0 4.93-4.93 4.934 4.934 0 0 0-4.93 4.93ZM9.733 37.1v.006l19.717-7.567-4.78-4.239h-1.237c-.41.43-.84.86-1.29 1.31a54.941 54.941 0 0 0-4.87 5.37.512.512 0 0 1-.4.19.493.493 0 0 1-.39-.19 48.271 48.271 0 0 0-3.85-4.35Zm-1.6 5.26h21.576l-7.77-8.56a.5.5 0 0 1-.114-.259L9.36 38.32Zm32.71 0-4.41-14.429-13.7 5.255 8.322 9.174ZM28.629 9.515a.5.5 0 1 0-.5-.5.5.5 0 0 0 .5.5ZM6.488 35.7a.5.5 0 1 0 .5.5.5.5 0 0 0-.5-.5Z"></path>
      </svg>
      
    ),
    title: 'Heritage Map',
    description: 'Uncover the richness of our cultural heritage with an interactive map showcasing heritage sites.',
    buttonText: 'Open Map',
    onButtonClick: (navigate) =>  navigate("/home/map") 
  },
  {
    svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" id="calender">
        <path d="M34 24H24v10h10V24zM32 2v4H16V2h-4v4h-2c-2.21 0-3.98 1.79-3.98 4L6 38c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4h-2V2h-4zm6 36H10V16h28v22z"></path>
        <path fill="none" d="M0 0h48v48H0z"></path>
      </svg>
    ),
    title: 'Cultural Calendar',
    description: 'Stay connected with upcoming events and festivals through our detailed Cultural Calendar.',
    buttonText: 'View Calendar',
    onButtonClick: (navigate) =>  navigate("/home/calendar") 
  },
  {
    svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" viewBox="0 0 512 512" id="planner">
        <linearGradient id="a" x1="51.99" x2="460" y1="70.99" y2="479" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff"></stop>
          <stop offset="1" stop-color="#ebeadf"></stop>
        </linearGradient>
        <polygon fill="url(#a)" fill-rule="evenodd" points="432 43 80 43 80 507 432 507" clip-rule="evenodd"></polygon>
        <linearGradient id="b" x1="128" x2="183" y1="189" y2="244" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#4c63ae"></stop>
          <stop offset="1" stop-color="#1f3f77"></stop>
        </linearGradient>
        <rect width="55" height="55" x="128" y="189" fill="url(#b)" fill-rule="evenodd" clip-rule="evenodd"></rect>
        <linearGradient id="c" x1="128" x2="183" y1="290" y2="345" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#68a1d6"></stop>
          <stop offset="1" stop-color="#3179af"></stop>
        </linearGradient>
        <rect width="55" height="55" x="128" y="290" fill="url(#c)" fill-rule="evenodd" clip-rule="evenodd"></rect>
        <linearGradient id="d" x1="128" x2="183" y1="391" y2="446" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#d7f0ff"></stop>
          <stop offset="1" stop-color="#9ad2fc"></stop>
        </linearGradient>
        <rect width="55" height="55" x="128" y="391" fill="url(#d)" fill-rule="evenodd" clip-rule="evenodd"></rect>
        <linearGradient id="e" x1="260" x2="346" y1="174" y2="260" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#747e6c"></stop>
          <stop offset="1" stop-color="#485143"></stop>
        </linearGradient>
        <rect width="162" height="10" x="222" y="212" fill="url(#e)"></rect>
        <linearGradient id="f" x1="260" x2="346" y1="274" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#747e6c"></stop>
          <stop offset="1" stop-color="#485143"></stop>
        </linearGradient>
        <rect width="162" height="10" x="222" y="312" fill="url(#f)"></rect>
        <linearGradient id="g" x1="260" x2="346" y1="374" y2="460" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#747e6c"></stop>
          <stop offset="1" stop-color="#485143"></stop>
        </linearGradient>
        <rect width="162" height="10" x="222" y="412" fill="url(#g)"></rect>
        <linearGradient id="h" x1="146.736" x2="365.245" y1="-23.755" y2="194.755" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#e67368"></stop>
          <stop offset="1" stop-color="#db3328"></stop>
        </linearGradient>
        <rect width="352" height="85" x="80" y="43" fill="url(#h)"></rect>
        <g>
          <linearGradient id="i" x1="135.609" x2="187.5" y1="12.609" y2="64.5" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ebeadf"></stop>
            <stop offset="1" stop-color="#747e6c"></stop>
          </linearGradient>
          <path fill="url(#i)" d="M166,86c-23.7,0-43-19.3-43-43s19.3-43,43-43s43,19.3,43,43h-10c0-18.2-14.8-33-33-33
                      s-33,14.8-33,33s14.8,33,33,33V86z"></path>
        </g>
        <g>
          <linearGradient id="j" x1="225.609" x2="277.5" y1="12.609" y2="64.5" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ebeadf"></stop>
            <stop offset="1" stop-color="#747e6c"></stop>
          </linearGradient>
          <path fill="url(#j)" d="M256,86c-23.7,0-43-19.3-43-43s19.3-43,43-43s43,19.3,43,43h-10c0-18.2-14.8-33-33-33
                      s-33,14.8-33,33s14.8,33,33,33V86z"></path>
        </g>
        <g>
          <linearGradient id="k" x1="315.609" x2="367.5" y1="12.609" y2="64.5" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ebeadf"></stop>
            <stop offset="1" stop-color="#747e6c"></stop>
          </linearGradient>
          <path fill="url(#k)" d="M346,86c-23.7,0-43-19.3-43-43s19.3-43,43-43s43,19.3,43,43h-10c0-18.2-14.8-33-33-33
                      s-33,14.8-33,33s14.8,33,33,33V86z"></path>
        </g>
      </svg>
    ),
    title: 'Journey Planner',
    description: 'Document your travels and create personalized itineraries for future adventures.',
    buttonText: 'Plan Your Trip',
    // onButtonClick: (navigate) =>  navigate("/home/iternary") 
  },
  {
    svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" id="gallery">
        <path fill="none" d="M0 0h48v48H0z"></path>
        <path d="M42 38V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zM17 27l5 6.01L29 24l9 12H10l7-9z"></path>
      </svg>
    ),
    title: 'Heritage Gallery',
    description: 'Explore stunning images and videos of our cultural heritage and contribute your own.',
    buttonText: 'Visit Gallery',
    // onButtonClick:(navigate) =>  navigate("/") 
  }
];

function FeatureContainer() {
  const navigate = useNavigate()
  return (
    <div id='features'
    className="flex justify-center items-center min-h-screen mt-36 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-8 max-w-4xl">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            svgIcon={feature.svgIcon}
            title={feature.title}
            description={feature.description}
            buttonText={feature.buttonText}
            onButtonClick={() => feature.onButtonClick(navigate)} 
          />
        ))}
      </div>
    </div>
  );
}

export default FeatureContainer;
