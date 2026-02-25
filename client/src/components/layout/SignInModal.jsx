import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import API from '../../api';

const SignInModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });
    try {
      const res = await API.post('/auth/login', form);
      const { token, role, name } = res.data;
      localStorage.setItem('xmt_token', token);
      localStorage.setItem('xmt_role', role);
      localStorage.setItem('xmt_name', name);
      onClose();
      if (role === 'admin') navigate('/admin');
      else if (role === 'fleet') navigate('/fleet-dashboard');
      else navigate('/member-dashboard');
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || 'Login failed.' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-md p-8 relative"
        style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.7)' }}>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <h2 className="text-white text-2xl font-bold mb-1">Sign In</h2>
        <p className="text-gray-500 text-sm mb-6">Enter your registered email and password</p>

        <div className="border-t border-gray-800 mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handle}
                placeholder="your@email.com"
                required
                className="w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 pl-9 pr-4 py-3 rounded-lg text-sm outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handle}
                placeholder="Your password"
                required
                className="w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 pl-9 pr-10 py-3 rounded-lg text-sm outline-none transition"
              />
              <button type="button" onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {status.error && (
            <p className="text-red-400 text-sm text-center">{status.error}</p>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-lg transition tracking-wide uppercase text-sm"
          >
            {status.loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-gray-600 text-xs text-center mt-5">
          Don't have an account?{' '}
          <button
            onClick={() => { onClose(); navigate('/account'); }}
            className="text-red-500 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
