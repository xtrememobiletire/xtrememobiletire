import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import slide2 from '../assets/slide2.jpg';
import xLogo from '../assets/x.png';
import API from '../api';

const SERVICES = [
  'Tire Repair - Plug',
  'Tire Repair - Stem',
  'Tire Swap (On Rim)',
  'Tire Swap (Off Rim)',
  'Wheel Balancing',
  'Spare Tire Change',
  'New Tire Replacement',
  'Used Tire Replacement',
  'New Rims Replacement',
  'Jump Start',
  'Battery Installation',
  'Locksmith',
];

const inputCls =
  'w-full bg-[#0d0d0d] border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-4 py-3 rounded-lg text-sm outline-none transition';
const labelCls = 'block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide';

const Booking = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    schedule: '',
    service: '',
    tireSize: '',
  });
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: '', error: '' });
    try {
      const res = await API.post('/bookings', form);
      setStatus({ loading: false, success: res.data.message, error: '' });
      setForm({ fullName: '', email: '', phone: '', schedule: '', service: '', tireSize: '' });
    } catch (err) {
      setStatus({ loading: false, success: '', error: err.response?.data?.message || 'Something went wrong.' });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Helmet>
        <title>Book a Service | Xtreme Mobile Tire</title>
        <meta name="description" content="Book your mobile tire service with Xtreme Mobile Tire. Schedule a tire repair, replacement, or installation at your location today." />
        <link rel="canonical" href="https://xtrememobiletire.com/booknow" />
      </Helmet>

      {/* ── Hero ── */}
      <section
        className="relative h-56 sm:h-72 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${slide2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide uppercase">Book a Service</h1>
          <p className="mt-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-red-500">Booking</span>
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src={xLogo} alt="X" className="w-5 h-5 object-contain" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">Schedule Your Service</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            BOOK YOUR <span className="text-red-600">APPOINTMENT</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-3">
            Fill in the form and our team will confirm your appointment within 24 hours. Available 24/7 across Canada & USA.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* ── Left Info Panel ── */}
          <div className="lg:col-span-2 bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">
            {/* Top image */}
            <div
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide2})` }}
            >
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FaCalendarAlt className="text-red-600 text-5xl opacity-80" />
              </div>
            </div>

            <div className="p-7">
              <h3 className="text-white font-extrabold text-xl mb-2">Why Book With Us?</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                We come to you — at home, work, or roadside. Our certified technicians are equipped and ready 24/7 across Canada and the USA.
              </p>

              {/* Info items */}
              <ul className="space-y-4 mb-8">
                {[
                  { icon: <FaPhone />, label: 'Canada', value: '(437) 375-5674' },
                  { icon: <FaPhone />, label: 'USA', value: '(804) 326-5442' },
                  { icon: <FaEnvelope />, label: 'Email', value: 'Info@Xtrememobiletire.com' },
                  { icon: <FaMapMarkerAlt />, label: 'Coverage', value: 'Canada & USA — 24/7' },
                ].map(({ icon, label, value }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-600/20 border border-red-600/30 rounded-lg flex items-center justify-center text-red-500 text-sm flex-shrink-0 mt-0.5">
                      <span className={label === 'Canada' || label === 'USA' ? 'scale-x-[-1] inline-flex' : 'inline-flex'}>
                        {icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-800 pt-6">
                <Link
                  to="/booknow"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-sm uppercase tracking-wide w-full justify-center"
                >
                  <FaArrowRight className="text-xs" />
                  Book Now
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right Form ── */}
          <div className="lg:col-span-3 bg-[#111] border border-gray-800 rounded-2xl p-8">
            <h3 className="text-white font-extrabold text-xl mb-1">Booking Details</h3>
            <p className="text-gray-400 text-xs mb-7">All fields marked * are required.</p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Full Name *</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handle}
                    placeholder="John Doe"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handle}
                    placeholder="john@email.com"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Phone + Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handle}
                    placeholder="+1 (000) 000-0000"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Schedule Date *</label>
                  <input
                    name="schedule"
                    type="date"
                    value={form.schedule}
                    onChange={handle}
                    required
                    className={`${inputCls} [color-scheme:dark]`}
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className={labelCls}>Service *</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handle}
                  required
                  className={`${inputCls} cursor-pointer`}
                >
                  <option value="" disabled>Select a service...</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Tire Size */}
              <div>
                <label className={labelCls}>
                  Tire Size <span className="text-gray-600 normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  name="tireSize"
                  value={form.tireSize}
                  onChange={handle}
                  placeholder="eg. 235/65R16"
                  className={inputCls}
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                {status.success && <p className="text-green-400 text-sm text-center mb-3">{status.success}</p>}
                {status.error && <p className="text-red-400 text-sm text-center mb-3">{status.error}</p>}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-lg transition-all duration-300 hover:scale-[1.02] tracking-wide uppercase text-sm flex items-center justify-center gap-2"
                >
                  <FaCalendarAlt />
                  {status.loading ? 'Submitting...' : 'Confirm Booking'}
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Booking;
