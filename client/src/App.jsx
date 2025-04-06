import './App.css'
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage'
import LoginSignUp from './components/Landing_Page/LoginSignUp/LoginSignUp';
import Homep from './pages/Homepage/home';
import Calendar from "./components/Homepage/Feature_Page/Calendar/CalendarPage.jsx"
import DateInfoPage from "./components/Homepage/Feature_Page/Calendar/DateInfoPage.jsx"
import ForgotPassword from './components/Landing_Page/LoginSignUp/ForgetPassword.jsx';
import UpdatePassword from "./components/Landing_Page/LoginSignUp/updatePassword.jsx"
import Map from './components/Homepage/Feature_Page/Map/marker_map/map.jsx';
import SitesPage from './components/Homepage/Feature_Page/Map/Sites/sitesPage.jsx';
import Site from './components/Homepage/Feature_Page/Map/Sites/site.jsx';
import ItineraryPlanner from './components/Homepage/Feature_Page/JourneyPlanner/journeyPlanner.jsx';
import Preview from './components/Homepage/Feature_Page/JourneyPlanner/preview.jsx'
import {DownloadPdf} from './components/Homepage/Feature_Page/JourneyPlanner/DownloadPdf.jsx';
import {ItineraryDocument}  from './components/Homepage/Feature_Page/JourneyPlanner/DownloadPdf.jsx';
import SuccessPage from "../src/components/Landing_Page/LoginSignUp/SuccessPage.jsx"
import Gallery from './components/Homepage/Feature_Page/Gallery/Gallery.jsx';

function App() {

  return (
    <>
    
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/auth" element={<LoginSignUp/>}/>
      <Route path='/success' element={<SuccessPage/>}/>
      <Route path="/home" element={<Homep/>}/>
      <Route path="/home/map" element={<Map/>}/>
      <Route path="/home/calendar" element={<Calendar/>} />
      <Route path="/home/calendar/date-info/:date" element={<DateInfoPage/>} />
      <Route path="/home/heritage" element={<SitesPage/>}/>
      <Route path="/home/heritage/heritage-site/:sr_no" element={<Site />} />
      {/* <Route path="/home/map/heritage/heritage-site/:id" element={<Site />} /> */}
      <Route path="/home/iternary" element={<ItineraryPlanner/>}/>
      <Route path="/forget-password" element={<ForgotPassword/>}/>
      <Route
          path="update-password/:token"
          element={
              <UpdatePassword />
          }
        />
        <Route
        path='/iternary/preview'
        element={<Preview/>}
        />

        <Route path="/home/gallery" element={<Gallery/>} />
    </Routes>
    </>



  )
}

export default App
