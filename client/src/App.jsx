import './App.css'
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage'
import LoginSignUp from './components/Landing_Page/LoginSignUp/LoginSignUp';
import Homep from './pages/Homepage/home';
import ForgotPassword from './components/Landing_Page/LoginSignUp/ForgetPassword.jsx';
import UpdatePassword from "./components/Landing_Page/LoginSignUp/updatePassword.jsx"

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/auth" element={<LoginSignUp/>}/>
      <Route path="/home" element={<Homep/>}/>
      <Route path="/forget-password" element={<ForgotPassword/>}/>
      <Route
          path="update-password/:token"
          element={
              <UpdatePassword />
          }
        />
      
    </Routes>
    



  )
}

export default App
