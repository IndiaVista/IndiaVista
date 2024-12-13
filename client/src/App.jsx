import './App.css'
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage'
import LoginSignUp from './components/Landing_Page/LoginSignUp/LoginSignUp';
import Homep from './pages/Homepage/home';
import Calendar from "./components/Homepage/Feature_Page/Calendar/CalendarPage.jsx"
import DateInfoPage from "./components/Homepage/Feature_Page/Calendar/DateInfoPage.jsx"

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/auth" element={<LoginSignUp/>}/>

      <Route path="/home" element={<Homep/>}/>
      <Route path="/home/calendar" element={<Calendar/>}/>
      <Route path="/home/calendar/date-info/:date" element={<DateInfoPage/>} />
      {/* </Route> */}
      

      
    </Routes>
    



  )
}

export default App
