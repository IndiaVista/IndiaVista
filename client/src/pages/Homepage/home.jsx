import React from 'react'
import FeatureContainer from '../../components/Homepage/features'
import Page1 from "../../components/Homepage/page1.jsx"
import Footer from '../../components/Landing_Page/Footer.jsx'
import NavBar from '../../components/Landing_Page/Navbar.jsx'
const Homep = () => {
  return (
    <div>
     <NavBar/>
      <Page1/>
      <FeatureContainer/>
      <Footer/>
    </div>
  )
}

export default Homep
