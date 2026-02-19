import { Link } from 'react-router-dom';
import { FaHome, FaPhone } from 'react-icons/fa';
import notFoundImg from '../assets/404.jpg';

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative"
      style={{
        backgroundImage: `url(${notFoundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Big 404 text */}
        <h1
          className="text-[9rem] sm:text-[13rem] font-extrabold leading-none select-none"
          style={{
            WebkitTextStroke: '3px #dc2626',
            color: 'transparent',
          }}
        >
          404
        </h1>

        {/* Message */}
        <h2 className="text-white text-2xl sm:text-4xl font-bold mb-3">
          Looks Like a <span className="text-red-600">Flat Tire!</span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved. Let us get you back on the road.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            <FaHome />
            Back to Home
          </Link>
   
        </div>

        {/* Divider */}
        <div className="mt-10 w-24 h-1 bg-red-600 rounded" />
        <p className="text-gray-500 text-xs mt-3">Xtreme Mobile Tire © 2026</p>
      </div>
    </div>
  );
};

export default NotFound;
