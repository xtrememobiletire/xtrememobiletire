import { Link } from 'react-router-dom';
import { GiTireIronCross } from 'react-icons/gi';
import { FaTruck, FaUser, FaArrowRight } from 'react-icons/fa';
import fleet1 from '../../assets/fleet/fleet1.webp';
import member1 from '../../assets/member1.webp';

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
    signupTo: '/contact',
    loginTo: '/account',
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
    signupTo: '/contact',
    loginTo: '/account',
    accentFrom: 'from-red-800',
    accentTo: 'to-red-600',
  },
];

const BlogSection = () => {
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
            <GiTireIronCross className="text-red-600 text-2xl" />
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
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  /* Placeholder — swap with <img src={member1} ... /> once you have the image */
                  <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#2a0a0a] flex items-center justify-center">
                    <div className="text-center">
                      <FaUser className="text-red-600/30 text-6xl mx-auto mb-2" />
                      <span className="text-gray-600 text-xs uppercase tracking-widest">Add membership image</span>
                    </div>
                  </div>
                )}
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/40 to-transparent" />

                {/* Red top accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accentFrom} ${card.accentTo}`} />

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {card.badge}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-7">
                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-600/15 border border-red-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <h3 className="text-white text-xl font-bold leading-tight">{card.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{card.description}</p>

                {/* Perks */}
                <ul className="space-y-2 mb-8">
                  {card.perks.map((perk, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <GiTireIronCross className="text-red-500 text-base flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{perk}</span>
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="border-t border-white/8 mb-6" />

                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
                  <Link
                    to={card.signupTo}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 text-sm uppercase tracking-wide"
                  >
                    <FaArrowRight className="text-xs" />
                    Sign Up
                  </Link>
                  <Link
                    to={card.loginTo}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-600/40 text-gray-300 hover:text-white font-semibold py-3 rounded-lg transition-all duration-300 text-sm uppercase tracking-wide"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
