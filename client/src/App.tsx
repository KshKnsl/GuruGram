import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from "./components/Home/Home.js"
import AboutUs from './components/AboutUs/AboutUs.js'
import MainLayout from './components/ProfileComponents/MainLayout.tsx'
import RoomPage from './Pages/VideoCallPages/Room/index.tsx'
import SignUpUser from './Pages/SignUpPage/User/index.tsx';
import SignUpMentor from './Pages/SignUpPage/Mentor/index.tsx';
import VideoHome from './Pages/VideoCallPages/Home/index.tsx'
import { ThemeProvider } from './context/ThemeContext'
import { useState, useEffect } from 'react'

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
  const [themeMode, setThemeMode] = useState('light')
  const darkTheme = ()=>
  {
    setThemeMode('dark')
  }
  const lightTheme = ()=>
  {
    setThemeMode('light')
  }
  useEffect(() => {
    document.querySelector('html')?.classList.remove('dark','light')
    document.querySelector('html')?.classList.add(themeMode)
  }
  , [themeMode])

  return (
    <>
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
      <RouterProvider router={router} />  
      </ThemeProvider>
    </>
  )
}
export default App;