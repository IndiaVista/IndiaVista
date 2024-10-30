import './App.css'
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage'
import LoginSignUp from './components/Landing_Page/LoginSignUp/LoginSignUp';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/auth" element={<LoginSignUp/>}/>
      
    </Routes>
    



  )
}

export default App
