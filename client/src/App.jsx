import './App.css'
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage'
import LoginSignUp from './components/Landing_Page/LoginSignUp/LoginSignUp';
import Homep from './pages/Homepage/home';
import ForgotPassword from './components/Landing_Page/LoginSignUp/forgotPassword.jsx';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/auth" element={<LoginSignUp/>}/>
      <Route path="/home" element={<Homep/>}/>
      <Route path="/forget-password" element={<ForgotPassword/>}/>

      
    </Routes>
    



  )
}

export default App
