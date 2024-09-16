import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from "./components/Home/Home.jsx"
import AboutUs from './components/AboutUs/AboutUs.jsx'
import MainLayout from './components/ProfileComponents/MainLayout.jsx'
import RoomPage from './Pages/VideoCallPages/Room'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpUser from './Pages/SignUpPage/User';
import SignUpMentor from './Pages/SignUpPage/Mentor';
import VideoHome from './Pages/VideoCallPages/Home'

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
        },
        {
          path: 'profile',
          element: <MainLayout />
        },
        {
          path: 'call',
          element: <VideoHome />
        },
        {
          path: 'room/:roomId',
          element: <RoomPage />
        },
        {
          path: '/signUpMentor',
          element: <SignUpMentor />
        },
        {
          path: '/signUpUser',
          element: <SignUpUser />
        }
      ]
    }
  ])
function App() {
  return (
    <>
      <RouterProvider router={router} />  
    </>
  )
}
export default App;