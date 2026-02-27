import { Link } from 'react-router-dom';
import { FaTruck, FaUser, FaArrowRight } from 'react-icons/fa';

import fleet1 from '../assets/fleet/fleet1.webp';
import member1 from '../assets/member1.webp';
import slide2 from '../assets/slide2.jpg';
import xLogo from '../assets/x.png';

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
    href: '/account/fleet',
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
    href: '/account/membership',
  },
];

/* ── Main Account Page ── */
const Account = () => {
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
                  <Link
                    to={card.href}
                    className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 text-sm uppercase tracking-wide"
                  >
                    <FaArrowRight className="text-xs" /> Sign Up
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Account;
