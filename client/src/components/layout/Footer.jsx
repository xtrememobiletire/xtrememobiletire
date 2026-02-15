import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/xtrememobiletire.webp';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <img src={logo} alt="Xtreme Mobile Tire" className="h-16 w-auto mb-4" />
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-red-600 transition text-sm">About</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-red-600 transition text-sm">Services</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-red-600 transition text-sm">Shop</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-red-600 transition text-sm">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-red-600 transition text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-red-600 transition text-sm">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-red-600 transition text-sm">Shipping</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-red-600 transition text-sm">Returns</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-red-600 transition text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-red-600 transition text-sm">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Our Shop */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">OUR SHOP</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-red-600 mt-1 flex-shrink-0" />
                <span>123 Street Name, City, Country</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaPhone className="text-red-600 flex-shrink-0" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaEnvelope className="text-red-600 flex-shrink-0" />
                <span>info@xtrememobi letire.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2026 Xtreme Mobile Tire. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
