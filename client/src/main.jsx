import {StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlaceItem from './components/Homepage/Feature_Page/JourneyPlanner/PlaceItem.jsx'





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ToastContainer/>
      <App />
     
    </BrowserRouter>
  </StrictMode>
)
