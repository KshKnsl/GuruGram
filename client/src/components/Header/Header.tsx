import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn } from 'lucide-react';
import Logo_img from '../../assets/Logo.gif';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-600/5 backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={Logo_img} alt="Logo" className="h-16 transition-all duration-300 group-hover:rotate-[360deg]" />
          </Link>

          <nav className="hidden md:flex space-x-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/call">Call</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>

          <div className="hidden md:flex space-x-4">
            <Button variant="outline" icon={<User className="w-5 h-5" />}>
              Sign Up
            </Button>
            <Button variant="solid" icon={<LogIn className="w-5 h-5" />}>
              Log In
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none transition-transform duration-300 hover:scale-110"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav className={`md:hidden bg-gray-900/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="container mx-auto px-4 py-4 space-y-4">
          <NavLink mobile to="/">Home</NavLink>
          <NavLink mobile to="/about">About</NavLink>
          <NavLink mobile to="/contact">Contact</NavLink>
          <NavLink mobile to="/call">Call</NavLink>
          <NavLink mobile to="/profile">Profile</NavLink>
          <div className="flex flex-col space-y-3 pt-4">
            <Button variant="outline" icon={<User className="w-5 h-5" />} fullWidth>
              Sign Up
            </Button>
            <Button variant="solid" icon={<LogIn className="w-5 h-5" />} fullWidth>
              Log In
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

const NavLink = ({ to, children, mobile }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const baseClasses = "relative px-4 py-2 text-orange-400 font-extrabold transition-all duration-300 ease-in-out no-underline";
  const mobileClasses = "block text-xl font-bold";
  const desktopClasses = "text-xl font-bold hover:bg-white/50 rounded-full";

  return (
    <Link 
      to={to} 
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses} ${
        isActive ? 'text-green-600' : 'hover:text-green-600'
      }`}
    >
      {children}
      {!mobile && isActive && (
        <span className="absolute inset-0 bg-white/10 rounded-full" />
      )}
    </Link>
  );
};

const Button = ({ variant, children, icon, fullWidth }) => {
  const baseClasses = "px-5 py-2 rounded-full text-lg font-medium focus:outline-none transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 hover:scale-105";
  const variantClasses = {
    outline: "text-white border-2 border-green-400 hover:bg-green-400 hover:text-gray-900",
    solid: "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600",
  };
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button type="button" className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}>
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default NavBar;