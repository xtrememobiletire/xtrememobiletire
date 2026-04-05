import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FaOilCan, FaBolt, FaKey, FaGasPump, FaShieldAlt, FaWarehouse, FaTag, FaStar,
  FaCar, FaTruck, FaTools, FaWrench, FaCheckCircle, FaEnvelope, FaLinkedin,
  FaAward, FaUserTie,
} from 'react-icons/fa';
import { GiTireIronCross, GiCarWheel } from 'react-icons/gi';
import xLogo from '../assets/x.png';
import gabrielPhoto from '../assets/akash.jpeg';
import slide2 from '../assets/slide2.jpg';
import TestimonialsSection from '../components/home/TestimonialsSection';

const expertiseAreas = [
  { icon: <GiTireIronCross />, title: 'Seasonal Tire Change (ON/OFF RIM)', desc: 'Deep expertise in on-site seasonal tire swaps for all vehicle classes.' },
  { icon: <FaTruck />,         title: 'Roadside Assistance',               desc: '24/7 rapid-response roadside operations management and dispatch.' },
  { icon: <GiCarWheel />,      title: 'Rim Repair',                        desc: 'Overseeing precision rim restoration processes and quality control.' },
  { icon: <FaOilCan />,        title: 'Oil Change',                        desc: 'Mobile oil change logistics and fleet-grade lubricant sourcing.' },
  { icon: <GiTireIronCross />, title: 'Flat Tire Repair',                  desc: 'Fast-response flat repair protocols across urban and highway zones.' },
  { icon: <FaWarehouse />,     title: 'Tire Storage',                      desc: 'Climate-controlled storage facility management and inventory control.' },
  { icon: <FaTag />,           title: 'Used Tires for Sale',               desc: 'Quality inspection standards and pricing strategy for used inventory.' },
  { icon: <FaStar />,          title: 'New Tires for Sale',                desc: 'Top-brand tire procurement, partnerships, and sales leadership.' },
  { icon: <FaTools />,         title: 'Brake Replacement',                 desc: 'Certified brake service oversight, safety compliance, and auditing.' },
  { icon: <FaShieldAlt />,     title: 'Rim Protector',                     desc: 'Professional rim protection installation strategy and training.' },
  { icon: <FaBolt />,          title: 'Battery Boost',                     desc: 'Mobile battery service deployment and technician coordination.' },
  { icon: <FaBolt />,          title: 'Car Battery Jump-Start',            desc: 'Emergency response systems and jump-start fleet management.' },
  { icon: <FaKey />,           title: 'Car Lockout / Locksmith',           desc: 'Licensed locksmith service integration and customer care protocols.' },
  { icon: <FaGasPump />,       title: 'Gas & Diesel Delivery',             desc: 'Fuel delivery logistics, safety regulations, and route optimization.' },
  { icon: <FaCar />,           title: 'Car Detailing',                     desc: 'Premium detailing service standards, products, and team training.' },
  { icon: <FaWrench />,        title: 'PPF (Paint Protection Film)',       desc: 'Paint protection film sourcing, installation quality, and warranties.' },
];

const stats = [
  { value: '15+', label: 'Years of Experience' },
  { value: '16',  label: 'Service Categories' },
  { value: '5K+', label: 'Clients Served' },
  { value: '99%', label: 'Satisfaction Rate' },
];

const GabrielScott = () => {
  return (
    <div className="bg-black text-white">
      <Helmet>
        <title>Gabriel Scott — Managing Director | Xtreme Mobile Tire</title>
        <meta
          name="description"
          content="Meet Gabriel Scott, Managing Director of Xtreme Mobile Tire — expert across all 16 automotive service categories."
        />
        <link rel="canonical" href="https://xtrememobiletire.com/team/gabriel-scott" />
      </Helmet>

      {/* ── Hero Banner ── */}
      <section
        className="relative h-56 sm:h-72 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${slide2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide uppercase">Our Team</h1>
          <p className="mt-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-red-500">Gabriel Scott</span>
          </p>
        </div>
      </section>

      {/* ── Profile Card ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Photo */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Decorative border accent */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-red-600 rounded-lg" />
              <img
                src={gabrielPhoto}
                alt="Gabriel Scott — Managing Director"
                className="relative z-10 w-full max-w-sm rounded-lg object-cover shadow-2xl"
              />
              {/* Badge */}
              <div className="absolute z-20 -bottom-5 left-1/2 -translate-x-1/2 bg-red-600 px-6 py-2 rounded-full flex items-center gap-2 shadow-lg whitespace-nowrap">
                <FaUserTie className="text-white text-sm" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">Managing Director</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 lg:mt-0">
            <div className="flex items-center gap-2 mb-3">
              <img src={xLogo} alt="X" className="w-5 h-5 object-contain" />
              <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">Meet the Director</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-1">
              Gabriel <span className="text-red-600">Scott</span>
            </h2>
            <p className="text-gray-400 text-sm mb-5 uppercase tracking-widest font-semibold">Managing Director</p>

            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Gabriel Scott leads Xtreme Mobile Tire with over 15 years of hands-on automotive expertise.
              As Managing Director, he drives operational excellence, team performance, and customer satisfaction
              across every service category — from seasonal tire changes to paint protection film installation.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-7">
              Gabriel's vision is simple: bring dealership-quality automotive services directly to every
              Canadian and American customer's doorstep, 24/7 — with zero compromise on safety or quality.
            </p>

            {/* Contact & badges */}
            <div className="flex flex-wrap gap-3 mb-7">
              <a
                href="mailto:Gabriel@Xtrememobiletire.com"
                className="flex items-center gap-2 bg-[#111] border border-gray-700 hover:border-red-600 text-sm px-4 py-2 rounded-full transition"
              >
                <FaEnvelope className="text-red-500" />
                <span className="text-gray-300">Gabriel@Xtrememobiletire.com</span>
              </a>
              <span className="flex items-center gap-2 bg-red-600/10 border border-red-600/30 text-red-400 text-xs px-4 py-2 rounded-full">
                <FaAward />
                Certified Automotive Expert
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="bg-[#111] border border-gray-800 rounded-lg p-4 text-center hover:border-red-600 transition">
                  <p className="text-2xl font-extrabold text-red-600">{value}</p>
                  <p className="text-gray-400 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Expertise: All 16 Service Categories ── */}
      <section className="bg-[#0a0a0a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src={xLogo} alt="X" className="w-5 h-5 object-contain" />
              <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              EXPERT ACROSS ALL <span className="text-red-600">SERVICE CATEGORIES</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-3">
              Gabriel holds authoritative knowledge and direct operational experience in every service
              Xtreme Mobile Tire offers — ensuring the highest standards from the top down.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {expertiseAreas.map((area, i) => (
              <div
                key={i}
                className="group bg-[#111] border border-gray-800 hover:border-red-600 rounded-lg p-5 transition"
              >
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-base mb-4">
                  {area.icon}
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{area.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src={xLogo} alt="X" className="w-5 h-5 object-contain" />
              <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">Leadership</span>
            </div>
            <h2 className="text-3xl font-extrabold">
              LEADERSHIP <span className="text-red-600">PRINCIPLES</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Customer First',       desc: 'Every decision Gabriel makes places the customer experience at the centre — fast response, fair pricing, and flawless execution.' },
              { title: 'Operational Excellence', desc: 'Gabriel enforces rigorous standards across all 16 service categories to ensure consistent, dealership-grade quality.' },
              { title: 'Team Empowerment',     desc: 'He invests in ongoing technician training and certification, building a team that\'s second to none in mobile automotive services.' },
              { title: 'Innovation & Growth',  desc: 'Constantly evolving the service offering — from PPF to mobile detailing — to stay ahead of customer needs.' },
              { title: 'Safety & Compliance',  desc: 'Gabriel ensures all operations meet and exceed regional safety regulations and industry compliance standards.' },
              { title: 'Community Commitment', desc: 'Active in supporting local communities across Canada and the USA, offering accessible and affordable automotive care.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-[#0d0d0d] border border-gray-800 hover:border-red-600 rounded-lg p-6 transition">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-red-600 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-red-600 py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 uppercase">
          Get in Touch with Gabriel
        </h2>
        <p className="text-red-100 text-sm mb-6 max-w-xl mx-auto">
          Have a partnership inquiry, corporate fleet request, or executive consultation?
          Gabriel is available to connect directly.
        </p>
        <a
          href="mailto:Gabriel@Xtrememobiletire.com"
          className="inline-flex items-center gap-2 bg-white text-red-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition text-sm"
        >
          <FaEnvelope />
          Gabriel@Xtrememobiletire.com
        </a>
      </section>

      {/* ── Testimonials ── */}
      <TestimonialsSection />
    </div>
  );
};

export default GabrielScott;
