import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/xtrememobiletire.webp';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-[#1a1a1a] py-2 px-4 md:py-2 md:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center z-50">
          <img src={logo} alt="Xtreme Mobile Tire" className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link
            to="/"
            className={`font-medium hover:text-red-500 transition ${
              location.pathname === '/' ? 'text-red-600' : 'text-white hover:text-red-600'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`font-medium hover:text-red-500 transition ${
              location.pathname === '/about' ? 'text-red-600' : 'text-white hover:text-red-600'
            }`}
          >
            About Us
          </Link>
          <Link
            to="/services"
            className={`font-medium hover:text-red-500 transition ${
              location.pathname === '/services' ? 'text-red-600' : 'text-white hover:text-red-600'
            }`}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className={`font-medium hover:text-red-500 transition ${
              location.pathname === '/contact' ? 'text-red-600' : 'text-white hover:text-red-600'
            }`}
          >
            Contact Us
          </Link>
        </div>

        {/* Desktop Contact Button */}
        <Link
          to="/contact"
          className="hidden lg:flex bg-red-600 hover:bg-red-700 text-white px-4 xl:px-6 py-2 xl:py-3 rounded items-center gap-2 transition text-sm xl:text-base"
        >
          <FaPhoneAlt />
          Contact Us
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="lg:hidden text-white text-2xl z-50"
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#1a1a1a] border-t border-gray-700 py-4 px-4">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMobileMenu(false)}
              className={`font-medium hover:text-red-500 transition py-2 ${
                location.pathname === '/' ? 'text-red-600' : 'text-white hover:text-red-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenu(false)}
              className={`font-medium hover:text-red-500 transition py-2 ${
                location.pathname === '/about' ? 'text-red-600' : 'text-white hover:text-red-600'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenu(false)}
              className={`font-medium hover:text-red-500 transition py-2 ${
                location.pathname === '/services' ? 'text-red-600' : 'text-white hover:text-red-600'
              }`}
            >
              Services
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenu(false)}
              className={`font-medium hover:text-red-500 transition py-2 ${
                location.pathname === '/contact' ? 'text-red-600' : 'text-white hover:text-red-600'
              }`}
            >
              Contact Us
            </Link>

            {/* Mobile Contact Button */}
            <Link
              to="/contact"
              onClick={() => setMobileMenu(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded flex items-center justify-center gap-2 transition mt-2"
            >
              <FaPhoneAlt />
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
