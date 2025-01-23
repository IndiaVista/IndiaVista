import React, { useEffect, useState } from 'react'
import DownloadPdf from './DownloadPdf';
import { useLocation } from 'react-router-dom';

const Preview = () => {
    const location = useLocation();
  const iternary = location.state;
  useEffect(()=>{
    console.log(iternary)
  },[iternary])

  return (
    <div className='size-20'>
      <DownloadPdf iternary={iternary}/>
    </div>
  )
}

export default Preview
