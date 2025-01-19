import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Header'
import Footer from './components/Footer'
import Home from './Pages/LandingPage/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import NotFound from './Pages/NotFound'
import Call from './components/Call/Call'
import './App.css'

function App() {
  const [themeMode, setThemeMode] = useState('light')
  const darkTheme = () => {
    setThemeMode('dark')
  }
  const lightTheme = () => {
    setThemeMode('light')
  }
  useEffect(() => {
    document.querySelector('html')?.classList.remove('dark', 'light')
    document.querySelector('html')?.classList.add(themeMode)
  }, [themeMode])

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <div className='h-full w-full dark:bg-gray-900'>
        <Navbar />
        <div className='px-auto'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/call" element={<Call/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
