import {StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homep from './pages/Homepage/home.jsx'
// import { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ToastContainer/>
      <App />
      {/* <Toaster /> */}
    </BrowserRouter>
  </StrictMode>,
)
