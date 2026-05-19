import React from 'react'
import ReactDOM from 'react-dom/client'
import GymLink from './App.jsx'
import './index.css'

window.__GMAPS_KEY = import.meta.env?.VITE_GOOGLE_MAPS_API_KEY || "";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GymLink />
  </React.StrictMode>
)
