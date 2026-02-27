import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaUser, FaArrowRight, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import API from '../api';
import slide2 from '../assets/slide2.jpg';

const inputCls =
  'w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-4 py-3 rounded-lg text-sm outline-none transition';
const labelCls = 'block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide';

const MemberSignup = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', website: '', vehicle: '', tireSize: '', password: '', confirmPassword: '',
  });
  const [show, setShow] = useState({ password: false, confirmPassword: false });
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword)
      return setStatus({ loading: false, success: '', error: 'Passwords do not match.' });
    setStatus({ loading: true, success: '', error: '' });
    try {
      const { confirmPassword, ...payload } = form;
      const res = await API.post('/members/register', payload);
      setStatus({ loading: false, success: res.data.message, error: '' });
    } catch (err) {
      setStatus({ loading: false, success: '', error: err.response?.data?.message || 'Something went wrong.' });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Helmet>
        <title>Personal Membership | Xtreme Mobile Tire</title>
        <meta name="description" content="Sign up for a personal membership with Xtreme Mobile Tire and get priority mobile tire service." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative h-56 sm:h-72 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${slide2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide uppercase">Personal Membership</h1>
          <p className="mt-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/account" className="hover:text-red-500 transition">Account</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-red-500">Member Sign Up</span>
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <Link to="/account" className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition text-sm mb-6">
            <FaArrowLeft /> Back to account types
          </Link>
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8" style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.5)' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-600/15 border border-red-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaUser className="text-2xl text-red-500" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Personal Membership</h3>
                <p className="text-gray-500 text-xs">For Individuals</p>
              </div>
            </div>
            <div className="border-t border-gray-800 mb-6" />
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handle}
                    placeholder="John Doe" required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handle}
                    placeholder="john@email.com" required className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Phone Number *</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handle}
                    placeholder="+1 (000) 000-0000" required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Website <span className="text-gray-600 normal-case tracking-normal">(optional)</span></label>
                  <input name="website" value={form.website} onChange={handle}
                    placeholder="https://yoursite.com" className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Year, Make & Model of Vehicle *</label>
                <input name="vehicle" value={form.vehicle} onChange={handle}
                  placeholder="e.g. 2021 Toyota Camry" required className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Tire Size <span className="text-gray-600 normal-case tracking-normal">(optional)</span></label>
                <input name="tireSize" value={form.tireSize} onChange={handle}
                  placeholder="eg. 235/65R16" className={inputCls} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Password *</label>
                  <div className="relative">
                    <input name="password" type={show.password ? 'text' : 'password'} value={form.password} onChange={handle}
                      placeholder="Create a password" required className={`${inputCls} pr-10`} />
                    <button type="button" onClick={() => setShow(s => ({ ...s, password: !s.password }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition">
                      {show.password ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Confirm Password *</label>
                  <div className="relative">
                    <input name="confirmPassword" type={show.confirmPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={handle}
                      placeholder="Repeat your password" required className={`${inputCls} pr-10`} />
                    <button type="button" onClick={() => setShow(s => ({ ...s, confirmPassword: !s.confirmPassword }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition">
                      {show.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
              {status.success && <p className="text-green-400 text-sm text-center">{status.success}</p>}
              {status.error && <p className="text-red-400 text-sm text-center">{status.error}</p>}
              <button type="submit" disabled={status.loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-lg transition tracking-wide uppercase text-sm flex items-center justify-center gap-2">
                <FaArrowRight className="text-xs" /> {status.loading ? 'Submitting...' : 'Submit Membership Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MemberSignup;
