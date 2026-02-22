import { useState, useEffect } from 'react';
import xLogo from '../../assets/x.png';
import { FaTruck, FaUser, FaArrowRight, FaTimes } from 'react-icons/fa';
import fleet1 from '../../assets/fleet/fleet1.webp';
import member1 from '../../assets/member1.webp';
import API from '../../api';

const cards = [
  {
    type: 'Fleet',
    icon: <FaTruck className="text-3xl text-red-500" />,
    badge: 'For Businesses',
    title: 'Fleet Manager Account',
    description:
      'Register your entire fleet under one account. Your drivers call us directly — no more interruptions to your day. Get a dedicated portal with full visibility, automated maintenance alerts, and flexible weekly billing.',
    perks: [
      'Dedicated fleet dashboard',
      '24/7 driver dispatch — no management calls',
      'Fixed pricing with long-term contracts',
      'Weekly consolidated invoices',
    ],
    image: fleet1,
    accentFrom: 'from-red-700',
    accentTo: 'to-red-500',
  },
  {
    type: 'Individual',
    icon: <FaUser className="text-3xl text-red-500" />,
    badge: 'For Individuals',
    title: 'Personal Membership',
    description:
      'Get priority mobile tire service wherever you are — home, work, or roadside. As a member you enjoy faster response times, exclusive rates, and a service history tracked just for you.',
    perks: [
      'Priority dispatch & faster response',
      'Exclusive member pricing on all services',
      'Full service history in your account',
      'Seasonal tire change reminders',
    ],
    image: member1,
    accentFrom: 'from-red-800',
    accentTo: 'to-red-600',
  },
];

const inputCls =
  'w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-4 py-3 rounded-lg text-sm outline-none transition';
const labelCls = 'block text-gray-400 text-xs mb-1';

const FleetForm = ({ onClose }) => {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition tracking-wide text-sm uppercase">
        {status.loading ? 'Submitting...' : 'Submit Fleet Registration'}
      </button>
    </form>
  );
};

const IndividualForm = ({ onClose }) => {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Phone Number *</label>
          <input name="phone" type="tel" value={form.phone} onChange={handle}
            placeholder="+1 (000) 000-0000" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Website <span className="text-gray-600">(optional)</span></label>
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
        <label className={labelCls}>Tire Size <span className="text-gray-600">(optional)</span></label>
        <input name="tireSize" value={form.tireSize} onChange={handle}
          placeholder="eg. 235/65R16" className={inputCls} />
      </div>
      {status.success && <p className="text-green-400 text-sm text-center">{status.success}</p>}
      {status.error && <p className="text-red-400 text-sm text-center">{status.error}</p>}
      <button type="submit" disabled={status.loading}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition tracking-wide text-sm uppercase">
        {status.loading ? 'Submitting...' : 'Submit Membership Request'}
      </button>
    </form>
  );
};

const BlogSection = () => {
  const [activeModal, setActiveModal] = useState(null); // 'Fleet' | 'Individual' | null

  useEffect(() => {
    if (activeModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [activeModal]);

  return (
    <section className="bg-black py-16 md:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-red-700/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={xLogo} alt="X" className="w-6 h-6 object-contain" />
            <span className="text-red-600 font-medium tracking-widest uppercase text-sm">Get Started</span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            CHOOSE YOUR <span className="text-red-600">ACCOUNT TYPE</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether you manage a fleet or need personal tire service — we have a plan built for you.
          </p>
        </div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative bg-[#111] rounded-2xl overflow-hidden flex flex-col group border border-white/5 hover:border-red-600/30 transition-all duration-300"
              style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.5)' }}
            >
              {/* Top image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
                  {card.perks.map((perk, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <img src={xLogo} alt="X" className="w-4 h-4 object-contain flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{perk}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/8 mb-6" />

                <div className="mt-auto">
                  <button
                    onClick={() => setActiveModal(card.type)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 text-sm uppercase tracking-wide"
                  >
                    <FaArrowRight className="text-xs" />
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto modal-scroll"
            style={{ boxShadow: '0 8px 60px 0 rgba(220,38,38,0.15)' }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600/20 border border-red-600/40 rounded-lg flex items-center justify-center">
                  {activeModal === 'Fleet'
                    ? <FaTruck className="text-red-500 text-lg" />
                    : <FaUser className="text-red-500 text-lg" />}
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    {activeModal === 'Fleet' ? 'Fleet Manager Registration' : 'Personal Membership'}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {activeModal === 'Fleet' ? 'For Businesses' : 'For Individuals'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-gray-500 hover:text-white transition p-1"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6">
              {activeModal === 'Fleet'
                ? <FleetForm onClose={() => setActiveModal(null)} />
                : <IndividualForm onClose={() => setActiveModal(null)} />}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
