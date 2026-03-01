import { useState, useEffect, useCallback, useContext } from 'react'
import { Menu, X, Users, BookOpen, User, LogIn, LogOut, UserPlus, Edit3 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/Logo.gif'
import ThemeBtn from './ui/ThemeBtn'
import { AuthContext } from "../context/AuthContext";

const links = [
  { to: '/all/mentors',   label: 'Mentors',       icon: Users   },
  { to: '/articles/new',  label: 'Write Article', icon: Edit3   },
  { to: '/articles',      label: 'Articles',      icon: BookOpen },
  { to: '/chat',          label: 'Chat',           icon: Users   },
]

const NavbarLinks = ({ onClick }: { onClick: () => void }) => {
  const location = useLocation()
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={onClick}
          className={`relative flex items-center gap-2 px-3 py-2 text-xs font-medium tracking-widest uppercase transition-all duration-200
            text-gray-600 dark:text-gray-400
            hover:text-amber-500 dark:hover:text-amber-500
            ${location.pathname === link.to
              ? 'text-amber-500 dark:text-amber-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-amber-500'
              : ''
            }`}
        >
          <link.icon className="h-3.5 w-3.5 shrink-0" />
          {link.label}
        </Link>
      ))}
    </>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { logout } = useContext(AuthContext)
  const auth = useContext(AuthContext)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-stone-50 dark:bg-gray-950 border-b border-amber-500/20
      ${scrolled ? 'shadow-sm' : ''}
    `}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img src={Logo} alt="Logo" className="h-16 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavbarLinks onClick={() => setIsOpen(false)} />
          </div>

          <div className="hidden md:flex items-center gap-2">
            {auth.user ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-widest uppercase transition-all duration-200 border
                    ${location.pathname === '/profile'
                      ? 'border-amber-500 text-amber-500 bg-amber-500/10'
                      : 'border-amber-500/25 text-gray-700 dark:text-gray-300 hover:border-amber-500 hover:text-amber-500'
                    }`}
                >
                  <User className="h-3.5 w-3.5" />
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-widest uppercase transition-all duration-200
                    border border-amber-500/25 text-gray-700 dark:text-gray-300
                    hover:border-amber-500 hover:text-amber-500"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-widest uppercase transition-all duration-200 border
                    ${location.pathname === '/signup'
                      ? 'border-amber-500 text-amber-500 bg-amber-500/10'
                      : 'border-amber-500/25 text-gray-700 dark:text-gray-300 hover:border-amber-500 hover:text-amber-500'
                    }`}
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className={`clip-skew flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-widest uppercase transition-all duration-200
                    ${location.pathname === '/login'
                      ? 'bg-amber-400 text-gray-900'
                      : 'bg-amber-500 text-gray-900 hover:bg-amber-400'
                    }`}
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Log In
                </Link>
              </>
            )}
            <ThemeBtn />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeBtn />
            <button
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-500 transition-colors duration-200"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-amber-500/15 bg-stone-50 dark:bg-gray-950">
          <div className="px-6 py-4 flex flex-col gap-1">
            <NavbarLinks onClick={() => setIsOpen(false)} />
          </div>
          <div className="px-6 pb-5 pt-2 border-t border-amber-500/15 flex flex-col gap-2">
            {auth.user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-widest uppercase border border-amber-500/25 text-gray-700 dark:text-gray-300 hover:border-amber-500 hover:text-amber-500 transition-all duration-200"
                >
                  <User className="h-3.5 w-3.5" />
                  Profile
                </Link>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-widest uppercase border border-amber-500/25 text-gray-700 dark:text-gray-300 hover:border-amber-500 hover:text-amber-500 transition-all duration-200"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-widest uppercase border border-amber-500/25 text-gray-700 dark:text-gray-300 hover:border-amber-500 hover:text-amber-500 transition-all duration-200"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="clip-skew flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-widest uppercase bg-amber-500 hover:bg-amber-400 text-gray-900 transition-all duration-200"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar