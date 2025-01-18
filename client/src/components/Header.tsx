import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.gif'
interface ButtonProps {
  variant?: 'outline' | 'ghost'
  size?: 'icon'
  onClick?: () => void
  children: React.ReactNode
  className?: string
  ariaExpanded?: boolean
  ariaLabel?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  onClick,
  children,
  className,
  ariaExpanded,
  ariaLabel,
}) => {
  const baseStyles = 'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300'
  const variantStyles = variant === 'outline' ? 'border border-primary text-primary' : 'bg-primary text-white'
  const sizeStyles = size === 'icon' ? 'p-2' : ''
  const combinedStyles = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`

  return (
    <button
      onClick={onClick}
      className={combinedStyles}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
import ThemeBtn from './ui/ThemeBtn'

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

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={Logo} alt="Logo" width={48} height={48} className="h-12 w-auto" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/mentors" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" onClick={() => setIsOpen(false)}>Mentors</Link>
              <Link to="/sessions" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" onClick={() => setIsOpen(false)}>Sessions</Link>
              <Link to="/resources" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" onClick={() => setIsOpen(false)}>Resources</Link>
              <Link to="/about" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" onClick={() => setIsOpen(false)}>About</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-2">
              <Button variant="outline">Sign Up</Button>
              <Button>Log In</Button>
              <ThemeBtn />
            </div>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/mentors" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" onClick={() => setIsOpen(false)}>Mentors</Link>
            <Link to="/sessions" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" onClick={() => setIsOpen(false)}>Sessions</Link>
            <Link to="/resources" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" onClick={() => setIsOpen(false)}>Resources</Link>
            <Link to="/about" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" onClick={() => setIsOpen(false)}>About</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            <div className="flex items-center justify-between px-5 space-x-2">
              <Button variant="outline" className="w-full">Sign Up</Button>
              <Button className="w-full">Log In</Button>
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
