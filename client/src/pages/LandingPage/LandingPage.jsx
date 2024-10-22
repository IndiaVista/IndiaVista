import React from 'react'
import MapFeature from '../../components/Landing_Page/MapFeature'
import Navbar from '../../components/Landing_Page/Navbar'
import HomePage from '../../components/Landing_Page/HomePage'
import ItineraryPlanner from '../../components/Landing_Page/ItineraryPlanner'
import UploadGallery from '../../components/Landing_Page/UploadGallery'
import CulturalCalendar from '../../components/Landing_Page/Calender.jsx'
import AboutUs from '../../components/Landing_Page/AboutUs.jsx'
import Footer from '../../components/Landing_Page/Footer.jsx'
import ContactUs from '../../components/Landing_Page/ContactUs.jsx'

function LandingPage() {
  
  return (
    <div>
        <Navbar/>
        <HomePage/>
        <MapFeature/>
        <CulturalCalendar/>
        <ItineraryPlanner/>
        <UploadGallery/>
        <AboutUs/>
        <ContactUs/>
        <Footer/>
    </div>
  )
}

export default LandingPage
