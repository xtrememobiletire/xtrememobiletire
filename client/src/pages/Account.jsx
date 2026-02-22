import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaUser, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import API from '../api';

import fleet1 from '../assets/fleet/fleet1.webp';
import member1 from '../assets/member1.webp';
import slide2 from '../assets/slide2.jpg';
import xLogo from '../assets/x.png';

const inputCls =
  'w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-4 py-3 rounded-lg text-sm outline-none transition';
const labelCls = 'block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide';

/* ── Fleet Sign-Up Form ── */
const FleetForm = ({ onBack }) => {
  const [form, setForm] = useState({
    companyName: '', companyWebsite: '', companyEmail: '',
    phone: '', address: '', vehicles: '',
  });
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: '', error: '' });
    try {
      const res = await API.post('/fleet/register', form);
      setStatus({ loading: false, success: res.data.message, error: '' });
    } catch (err) {
      setStatus({ loading: false, success: '', error: err.response?.data?.message || 'Something went wrong.' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition text-sm mb-6">
        <FaArrowLeft /> Back to account types
      </button>
      <div className="bg-[#111] border border-gray-800 rounded-2xl p-8" style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.5)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-red-600/15 border border-red-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <FaTruck className="text-2xl text-red-500" />
          </div>
          <div>
            <h3 className="text-white font-bold text-xl">Fleet Manager Registration</h3>
            <p className="text-gray-500 text-xs">For Businesses</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mb-6" />
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Company Name *</label>
              <input name="companyName" value={form.companyName} onChange={handle}
                placeholder="Xtreme Logistics Inc." required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Company Website</label>
              <input name="companyWebsite" value={form.companyWebsite} onChange={handle}
                placeholder="https://yourcompany.com" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Company Email *</label>
              <input name="companyEmail" type="email" value={form.companyEmail} onChange={handle}
                placeholder="info@yourcompany.com" required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Phone Number *</label>
              <input name="phone" type="tel" value={form.phone} onChange={handle}
                placeholder="+1 (000) 000-0000" required className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Company Address *</label>
            <input name="address" value={form.address} onChange={handle}
              placeholder="123 Main St, City, Province/State" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>No. of Vehicles *</label>
            <input name="vehicles" type="number" min="1" value={form.vehicles} onChange={handle}
              placeholder="e.g. 25" required className={inputCls} />
          </div>
          {status.success && <p className="text-green-400 text-sm text-center">{status.success}</p>}
          {status.error && <p className="text-red-400 text-sm text-center">{status.error}</p>}
          <button type="submit" disabled={status.loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-lg transition tracking-wide uppercase text-sm flex items-center justify-center gap-2">
            <FaArrowRight className="text-xs" /> {status.loading ? 'Submitting...' : 'Submit Fleet Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ── Individual Sign-Up Form ── */
const IndividualForm = ({ onBack }) => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', website: '', vehicle: '', tireSize: '',
  });
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: '', error: '' });
    try {
      const res = await API.post('/members/register', form);
      setStatus({ loading: false, success: res.data.message, error: '' });
    } catch (err) {
      setStatus({ loading: false, success: '', error: err.response?.data?.message || 'Something went wrong.' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition text-sm mb-6">
        <FaArrowLeft /> Back to account types
      </button>
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
          {status.success && <p className="text-green-400 text-sm text-center">{status.success}</p>}
          {status.error && <p className="text-red-400 text-sm text-center">{status.error}</p>}
          <button type="submit" disabled={status.loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-lg transition tracking-wide uppercase text-sm flex items-center justify-center gap-2">
            <FaArrowRight className="text-xs" /> {status.loading ? 'Submitting...' : 'Submit Membership Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ── Account Cards ── */
const cards = [
  {
    type: 'Fleet',
    icon: <FaTruck className="text-3xl text-red-500" />,
    badge: 'For Businesses',
    title: 'Fleet Manager Account',
    description: 'Register your entire fleet under one account. Your drivers call us directly — no more interruptions to your day. Get a dedicated portal with full visibility, automated maintenance alerts, and flexible weekly billing.',
    perks: ['Dedicated fleet dashboard', '24/7 driver dispatch — no management calls', 'Fixed pricing with long-term contracts', 'Weekly consolidated invoices'],
    image: fleet1,
    accentFrom: 'from-red-700', accentTo: 'to-red-500',
  },
  {
    type: 'Individual',
    icon: <FaUser className="text-3xl text-red-500" />,
    badge: 'For Individuals',
    title: 'Personal Membership',
    description: 'Get priority mobile tire service wherever you are — home, work, or roadside. As a member you enjoy faster response times, exclusive rates, and a service history tracked just for you.',
    perks: ['Priority dispatch & faster response', 'Exclusive member pricing on all services', 'Full service history in your account', 'Seasonal tire change reminders'],
    image: member1,
    accentFrom: 'from-red-800', accentTo: 'to-red-600',
  },
];

/* ── Main Account Page ── */
const Account = () => {
  // view: 'cards' | 'fleet-signup' | 'individual-signup'
  const [view, setView] = useState('cards');

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Hero */}
      <section
        className="relative h-56 sm:h-72 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${slide2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide uppercase">My Account</h1>
          <p className="mt-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-red-500">Account</span>
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">

        {/* Cards view */}
        {view === 'cards' && (
          <>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <img src={xLogo} alt="X" className="w-5 h-5 object-contain" />
                <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">Get Started</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                CHOOSE YOUR <span className="text-red-600">ACCOUNT TYPE</span>
              </h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto mt-3">
                Whether you manage a fleet or need personal tire service — we have a plan built for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cards.map((card) => (
                <div
                  key={card.type}
                  className="relative bg-[#111] rounded-2xl overflow-hidden flex flex-col group border border-white/5 hover:border-red-600/30 transition-all duration-300"
                  style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.5)' }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={card.image} alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/40 to-transparent" />
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accentFrom} ${card.accentTo}`} />
                    <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {card.badge}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-red-600/15 border border-red-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        {card.icon}
                      </div>
                      <h3 className="text-white text-xl font-bold leading-tight">{card.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">{card.description}</p>
                    <ul className="space-y-2 mb-8">
                      {card.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2.5">
                          <img src={xLogo} alt="X" className="w-4 h-4 object-contain flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{perk}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-white/8 mb-6" />
                    <div className="mt-auto">
                      <button
                        onClick={() => setView(card.type === 'Fleet' ? 'fleet-signup' : 'individual-signup')}
                        className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 text-sm uppercase tracking-wide"
                      >
                        <FaArrowRight className="text-xs" /> Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Fleet Sign-Up */}
        {view === 'fleet-signup' && <FleetForm onBack={() => setView('cards')} />}

        {/* Individual Sign-Up */}
        {view === 'individual-signup' && <IndividualForm onBack={() => setView('cards')} />}

      </section>
    </div>
  );
};

export default Account;
