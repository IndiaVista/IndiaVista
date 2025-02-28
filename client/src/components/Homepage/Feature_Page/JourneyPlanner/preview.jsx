import React, { useEffect, useState } from 'react'
import{ DownloadPdf} from './DownloadPdf';
import { useLocation } from 'react-router-dom';

const Preview = () => {
  
    const location = useLocation();
    const iternary = location.state || {}; // Prevent undefined errors
    
  useEffect(()=>{
    console.log(iternary)
  },[iternary])

  return (
    <div className="flex justify-center items-center w-full">
      <DownloadPdf iternary={iternary}/>
    </div>
  )
}

export default Preview
