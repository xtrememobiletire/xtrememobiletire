import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/xtrememobiletire.webp';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* About Column */}
          <div>
            <img src={logo} alt="Xtreme Mobile Tire" className="h-12 w-auto mb-3" />
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Xtreme Mobile Tire provides professional mobile tire installation, replacement, and repair services — coming directly to you across Canada and the USA.
            </p>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition text-xs">
                <FaFacebookF />
              </a>
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition text-xs">
                <FaTwitter />
              </a>
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition text-xs">
                <FaInstagram />
              </a>
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition text-xs">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase mb-3 tracking-wide">Quick Links</h3>
            <ul className="space-y-1.5">
              {[
                { label: 'About', to: '/about' },
                { label: 'Services', to: '/services' },
                { label: 'Shop', to: '/shop' },
                { label: 'Blog', to: '/blog' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-red-500 transition text-xs">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* USA Warehouse */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase mb-3 tracking-wide">USA (Warehouse)</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-400 text-xs">
                <FaMapMarkerAlt className="text-red-600 mt-0.5 flex-shrink-0" />
                <span>11815 Medway Church Loop, Manassas, VA 20109</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-xs">
                <FaPhone className="text-red-600 flex-shrink-0" />
                <a href="tel:8043265442" className="hover:text-red-500 transition">(804) 326-5442</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-xs">
                <FaEnvelope className="text-red-600 flex-shrink-0" />
                <a href="mailto:Info@Xtrememobiletire.com" className="hover:text-red-500 transition">Info@Xtrememobiletire.com</a>
              </li>
            </ul>
          </div>

          {/* Canada Warehouse */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase mb-3 tracking-wide">Canada (Warehouse)</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-400 text-xs">
                <FaMapMarkerAlt className="text-red-600 mt-0.5 flex-shrink-0" />
                <span>857 Winterton Way, Mississauga, ON L5V 1Z5, Canada</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-xs">
                <FaPhone className="text-red-600 flex-shrink-0" />
                <a href="tel:4373755674" className="hover:text-red-500 transition">(437) 375-5674</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-xs">
                <FaEnvelope className="text-red-600 flex-shrink-0" />
                <a href="mailto:Info@Xtrememobiletire.com" className="hover:text-red-500 transition">Info@Xtrememobiletire.com</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 text-center">
          <p className="text-gray-500 text-xs">
            © 2026 Xtreme Mobile Tire. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
