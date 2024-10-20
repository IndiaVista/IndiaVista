import React from 'react'
import MapFeature from '../../components/Landing_Page/MapFeature'
import Navbar from '../../components/Landing_Page/Navbar'
import HomePage from '../../components/Landing_Page/HomePage'
import ItineraryPlanner from '../../components/Landing_Page/ItineraryPlanner'
import UploadGallery from '../../components/Landing_Page/UploadGallery'

function LandingPage() {
  return (
    <div>
        <Navbar/>
        <HomePage/>
        <MapFeature/>
        <ItineraryPlanner/>
        <UploadGallery/>
    </div>
  )
}

export default LandingPage
