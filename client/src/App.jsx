import { useState } from 'react'
import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from "./components/Home/Home.jsx"
import AboutUs from './components/AboutUs/AboutUs.jsx'



function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'about',
          element:<AboutUs/>
        }
      ]
    }
  ])
import { Routes, Route } from 'react-router-dom'
import './App.css'

import HomePage from './Pages/VideoCallPages/Home'
import RoomPage from './Pages/VideoCallPages/Room'

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
    </Routes>
  )
}

export default App;
