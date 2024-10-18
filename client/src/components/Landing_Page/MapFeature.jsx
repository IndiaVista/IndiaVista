import React from 'react';
import '../../../src/index.css';

function MapFeature() {
  return (
    <div className='bg-white w-screen h-screen flex flex-col items-center justify-center gap-6'>
      <div className='text-black font-jakarta font-extrabold text-5xl'>Discover India’s vibrant Heritage with</div>
      <div className='text-sky-700 font-jakarta font-extrabold text-5xl'>Interactive Map</div>
      <div className='w-3/4 h-4/5 bg-blue-50 grid grid-cols-2 gap-10'>
        {/* First Box with Image Space */}
        <div className='w-full h-full bg-yellow-300 p-4 rounded-lg flex items-center justify-center'>
          <div className='text-center'>
            <p className='mb-2'>Image Placeholder</p> {/* Space for image */}
          </div>
        </div>

        {/* Second Box with Text Space */}
        <div className='w-full h-full bg-red-200 p-4 rounded-lg flex items-center justify-center'>
          <div className='text-center'>
            <p className='mb-2'>Text Space 1</p>
            <p>Text Space 2</p>
          </div>
        </div>

        {/* Third Box with Text Space */}
        <div className='w-full h-full bg-red-200 p-4 rounded-lg flex items-center justify-center'>
          <div className='text-center'>
            <p className='mb-2'>Text Space 3</p>
            <p>Text Space 4</p>
          </div>
        </div>

        {/* Fourth Box with Image Space */}
        <div className='w-full h-full bg-yellow-300 p-4 rounded-lg flex items-center justify-center'>
          <div className='text-center'>
            <p className='mb-2'>Image Placeholder</p> {/* Space for image */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapFeature;
