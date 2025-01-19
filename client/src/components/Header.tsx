import { useState, useEffect, useCallback, useContext } from 'react'
import { Menu, X, Home, Users, Calendar, BookOpen, Info, User, LogIn, LogOut, UserPlus } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/Logo.gif'
import ThemeBtn from './ui/ThemeBtn'
import { AuthContext } from "../context/AuthContext";

const NavbarLinks = ({ onClick }: { onClick: () => void }) => {
  const location = useLocation();
  const links = [
    { to: '/call', label: 'Connect', icon: Home },
    { to: '/mentors', label: 'Mentors', icon: Users },
    { to: '/sessions', label: 'Sessions', icon: Calendar },
    { to: '/articles/new', label: 'Write Article', icon: BookOpen },
    { to: '/articles', label: 'Articles', icon: Info },
  ]

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center ${location.pathname === link.to ? 'bg-blue-500 dark:bg-blue-700 text-yellow-500' : ''}`}
          onClick={onClick}
        >
          <link.icon className="mr-2 h-4 w-4" />
          {link.label}
        </Link>
      ))}
    </>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { logout } = useContext(AuthContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white dark:bg-gray-900' : 'bg-transparent dark:text-white'} `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={Logo} alt="Logo" width={48} height={48} className="h-12 w-auto" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavbarLinks onClick={() => setIsOpen(false)} />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-2">
              {auth.user ? (
                <>
                  <Link to="/profile" className={`bg-gray-100 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center ${location.pathname === '/profile' ? 'bg-blue-500 dark:bg-blue-700 text-yellow-500' : ''}`}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                  <button onClick={logout} className="bg-gray-100 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signup" className={`bg-gray-100 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 border border-blue-500 dark:border-blue-700 flex items-center ${location.pathname === '/signup' ? 'bg-blue-500 dark:bg-blue-700 text-yellow-500' : ''}`}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                  <Link to="/login" className={`bg-gray-100 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 bg-blue-500 dark:bg-blue-700 flex items-center ${location.pathname === '/login' ? 'bg-blue-500 dark:bg-blue-700 text-yellow-500' : ''}`}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Link>
                </>
              )}
              <ThemeBtn />
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="bg-gray-100 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-300 bg-transparent"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavbarLinks onClick={() => setIsOpen(false)} />
          </div>
          <div className="pt-4 pb-3 border-t border-gray-300 dark:border-gray-700">
            <div className="flex items-center justify-between px-5 space-x-2">
              {auth.user ? (
                <>
                  <Link to="/profile" className={`bg-gray-100 w-full text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center ${location.pathname === '/profile' ? 'bg-blue-500 dark:bg-blue-700 text-yellow-500' : ''}`}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                  <button onClick={logout} className="bg-gray-100 w-full text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signup" className={`bg-gray-100 w-full text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 border border-blue-500 dark:border-blue-700 flex items-center ${location.pathname === '/signup' ? 'bg-blue-500 dark:bg-blue-700 text-yellow-500' : ''}`}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                  <Link to="/login" className={`bg-gray-100 w-full text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 bg-blue-500 dark:bg-blue-700 flex items-center ${location.pathname === '/login' ? 'bg-blue-500 dark:bg-blue-700 text-yellow-500' : ''}`}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Link>
                </>
              )}
            </div>
            <div className="mt-3 px-5">
              <ThemeBtn />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
