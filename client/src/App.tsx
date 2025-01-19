import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Header'
import Footer from './components/Footer'
import Home from './Pages/LandingPage/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import NotFound from './Pages/NotFound'
import ChatPage from './Pages/chat/ChatPage'
import SettingsPage from './Pages/chat/SettingsPage'
import ProfilePage from './Pages/chat/ProfilePage'

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
      <div className='h-full w-full'>
        <Navbar />
        <div className='mx-auto'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="chat/settings" element={<SettingsPage />} />
            <Route path="/chat/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
