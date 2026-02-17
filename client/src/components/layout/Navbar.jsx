import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/xtrememobiletire.webp';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="bg-[#1a1a1a] py-0 px-4 md:py-4 md:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center z-50">
          <img src={logo} alt="Xtreme Mobile Tire" className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link to="/" className="text-red-600 font-medium hover:text-red-500 transition">
            Home
          </Link>
          <Link to="/about" className="text-white font-medium hover:text-red-600 transition">
            About Us
          </Link>
          <Link to="/services" className="text-white font-medium hover:text-red-600 transition">
            Services
          </Link>
          <Link to="/booking" className="text-white font-medium hover:text-red-600 transition">
            Booking
          </Link>
          <Link to="/shop" className="text-white font-medium hover:text-red-600 transition">
            Shop
          </Link>
          <Link to="/contact" className="text-white font-medium hover:text-red-600 transition">
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
              className="text-red-600 font-medium hover:text-red-500 transition py-2"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenu(false)}
              className="text-white font-medium hover:text-red-600 transition py-2"
            >
              About Us
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenu(false)}
              className="text-white font-medium hover:text-red-600 transition py-2"
            >
              Services
            </Link>
            <Link
              to="/booking"
              onClick={() => setMobileMenu(false)}
              className="text-white font-medium hover:text-red-600 transition py-2"
            >
              Booking
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenu(false)}
              className="text-white font-medium hover:text-red-600 transition py-2"
            >
              Shop
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenu(false)}
              className="text-white font-medium hover:text-red-600 transition py-2"
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
