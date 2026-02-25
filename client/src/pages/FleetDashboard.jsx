import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaBuilding, FaPhone, FaEnvelope, FaMapMarkerAlt, FaSignOutAlt, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import API from '../api';
import logo from '../assets/xtrememobiletire.webp';
import slide2 from '../assets/slide2.jpg';

const FleetDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('xmt_token');
    const role = localStorage.getItem('xmt_role');
    if (!token || role !== 'fleet') { navigate('/'); return; }

    API.get('/auth/me')
      .then(res => { setUser(res.data); setLoading(false); })
      .catch(() => { handleLogout(); });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('xmt_token');
    localStorage.removeItem('xmt_role');
    localStorage.removeItem('xmt_name');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statusConfig = {
    pending:  { icon: <FaClock className="text-yellow-400" />,  label: 'Pending Approval', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30' },
    approved: { icon: <FaCheckCircle className="text-green-400" />, label: 'Approved',        color: 'text-green-400',  bg: 'bg-green-400/10 border-green-400/30' },
    rejected: { icon: <FaTimesCircle className="text-red-400" />,   label: 'Rejected',        color: 'text-red-400',   bg: 'bg-red-400/10 border-red-400/30' },
  };
  const s = statusConfig[user.status] || statusConfig.pending;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Top Bar */}
      <div className="bg-[#111] border-b border-gray-800 px-4 md:px-8 py-4 flex items-center justify-between">
        <img src={logo} alt="XMT" className="h-12 w-auto object-contain" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition text-sm font-medium"
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </div>

      {/* Hero Banner */}
      <div
        className="relative h-40 flex items-center px-4 md:px-8"
        style={{ backgroundImage: `url(${slide2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-red-600/20 border border-red-600/40 rounded-xl flex items-center justify-center">
              <FaTruck className="text-red-500 text-lg" />
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest">Fleet Manager Portal</p>
              <h1 className="text-white text-2xl font-bold">{user.companyName}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 space-y-6">

        {/* Status Card */}
        <div className={`flex items-center gap-3 border rounded-xl px-5 py-4 ${s.bg}`}>
          {s.icon}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Account Status</p>
            <p className={`font-bold text-lg ${s.color}`}>{s.label}</p>
          </div>
          {user.status === 'pending' && (
            <p className="ml-auto text-gray-500 text-sm">Your registration is under review by our team.</p>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-5 text-center">
            <FaTruck className="text-red-500 text-2xl mx-auto mb-2" />
            <p className="text-white text-3xl font-bold">{user.vehicles}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wide mt-1">Vehicles</p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-5 text-center">
            <FaCheckCircle className="text-red-500 text-2xl mx-auto mb-2" />
            <p className="text-white text-3xl font-bold">24/7</p>
            <p className="text-gray-500 text-xs uppercase tracking-wide mt-1">Support</p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-5 text-center col-span-2 sm:col-span-1">
            <FaBuilding className="text-red-500 text-2xl mx-auto mb-2" />
            <p className="text-white text-lg font-bold truncate">{user.companyName}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wide mt-1">Company</p>
          </div>
        </div>

        {/* Company Details */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-5">Company Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Email</p>
                <p className="text-white text-sm">{user.companyEmail}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaPhone className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Phone</p>
                <p className="text-white text-sm">{user.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Address</p>
                <p className="text-white text-sm">{user.address}</p>
              </div>
            </div>
            {user.companyWebsite && (
              <div className="flex items-start gap-3">
                <FaBuilding className="text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">Website</p>
                  <p className="text-white text-sm">{user.companyWebsite}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-red-600/10 border border-red-600/20 rounded-xl px-5 py-4 text-sm text-gray-400">
          Need help or have questions about your fleet account? Contact us at{' '}
          <a href="mailto:admin@xtrememobiletire.com" className="text-red-500 hover:underline">
            admin@xtrememobiletire.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default FleetDashboard;
