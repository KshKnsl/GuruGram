import React, { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.gif'
import ThemeBtn from './ui/ThemeBtn'

const NavbarLinks = ({ onClick }: { onClick: () => void }) => {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/mentors', label: 'Mentors' },
    { to: '/sessions', label: 'Sessions' },
    { to: '/resources', label: 'Resources' },
    { to: '/about', label: 'About' },
  ]

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="text-foreground dark:text-dark-foreground hover:text-primary dark:hover:text-dark-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent ${scrolled ? 'bg-white dark:bg-dark-background' : 'bg-transparent'}`}>
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
              <Link to="/signup" className="text-foreground dark:text-dark-foreground hover:text-primary dark:hover:text-dark-primary px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 border border-primary dark:border-dark-primary">Sign Up</Link>
              <Link to="/login" className="text-foreground dark:text-dark-foreground hover:text-primary dark:hover:text-dark-primary px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 bg-primary dark:bg-dark-primary">Log In</Link>
              <ThemeBtn />
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="px-2 py-2 rounded-md text-sm font-medium transition-colors duration-300 bg-transparent"
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
        <div className="md:hidden bg-background dark:bg-dark-background">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavbarLinks onClick={() => setIsOpen(false)} />
          </div>
          <div className="pt-4 pb-3 border-t border-border dark:border-dark-border">
            <div className="flex items-center justify-between px-5 space-x-2">
                <Link to="/signup" className="w-full text-foreground dark:text-dark-foreground hover:text-primary dark:hover:text-dark-primary px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 border border-primary dark:border-dark-primary">Sign Up</Link>
                <Link to="/login" className="w-full text-foreground dark:text-dark-foreground hover:text-primary dark:hover:text-dark-primary px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 bg-primary dark:bg-dark-primary">Log In</Link>
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
