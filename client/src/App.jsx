import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import HomePage from './Pages/VideoCallPages/Home'
import RoomPage from './Pages/VideoCallPages/Room'



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
    </Routes>
  )
}

export default App;
