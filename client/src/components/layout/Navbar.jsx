import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/xtrememobiletire.webp';
import SignInModal from './SignInModal';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Our Team', to: '/team/gabriel-scott' },
  { label: 'Booking', to: '/booknow' },
  { label: 'Contact Us', to: '/contact' },
];

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('xmt_token');
  const role = localStorage.getItem('xmt_role');

  const handleLogout = () => {
    localStorage.removeItem('xmt_token');
    localStorage.removeItem('xmt_role');
    localStorage.removeItem('xmt_name');
    navigate('/');
  };

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to);

  return (
    <nav className="bg-[#1a1a1a] py-0 px-4 md:py-4 md:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center z-50">
          <img src={logo} alt="Xtreme Mobile Tire" className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`font-medium transition ${
                isActive(to) ? 'text-red-600' : 'text-white hover:text-red-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Links */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-500 underline font-semibold text-sm xl:text-base transition hover:text-red-400"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => setShowSignIn(true)}
              className="text-red-500 underline font-semibold text-sm xl:text-base transition hover:text-red-400"
            >
              Sign In
            </button>
          )}
          {!isLoggedIn && (
            <Link
              to="/account"
              className="bg-red-600 hover:bg-red-700 text-white px-4 xl:px-6 py-2 xl:py-3 rounded font-semibold transition text-sm xl:text-base"
            >
              Sign Up
            </Link>
          )}
        </div>

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
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenu(false)}
                className={`font-medium transition py-2 ${
                  isActive(to) ? 'text-red-600' : 'text-white hover:text-red-600'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Mobile Auth */}
            <div className="flex gap-3 mt-2">
              {isLoggedIn ? (
                <button
                  onClick={() => { handleLogout(); setMobileMenu(false); }}
                  className="flex-1 text-red-500 underline font-semibold py-3 text-center transition"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { setShowSignIn(true); setMobileMenu(false); }}
                    className="flex-1 text-red-500 underline font-semibold py-3 text-center transition"
                  >
                    Sign In
                  </button>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenu(false)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded flex items-center justify-center font-semibold transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </nav>
  );
};

export default Navbar;
