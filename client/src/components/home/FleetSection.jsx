import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GiTireIronCross } from 'react-icons/gi';
import {
  FaTruck, FaShieldAlt, FaChartBar, FaFileInvoiceDollar, FaCheckCircle,
} from 'react-icons/fa';
import fleet1 from '../../assets/fleet/fleet1.webp';
import fleet2 from '../../assets/fleet/fleet2.webp';

const slides = [
  {
    id: 0,
    image: fleet1,
    icon: <FaTruck className="text-red-500 text-2xl" />,
    tag: 'The Problem',
    title: 'Roadside Breakdowns\nInterrupt Your Day',
    points: [
      'Drivers call you for every flat or blown tire',
      'Operations get delayed while you arrange help',
      'Emergency calls disrupt your schedule 24/7',
      'No centralized system to track fleet incidents',
    ],
  },
  {
    id: 1,
    image: fleet2,
    icon: <FaShieldAlt className="text-red-500 text-2xl" />,
    tag: 'Our Solution',
    title: 'Dedicated Fleet\nManagement Portal',
    points: [
      'Your entire fleet registered in one dashboard',
      'Vehicles assigned to specific drivers',
      'Driver details stored securely in our database',
      'Drivers call US — not you — when stuck',
    ],
  },
  {
    id: 2,
    image: fleet1,
    icon: <FaShieldAlt className="text-red-500 text-2xl" />,
    tag: 'Contract Stability',
    title: 'Long-Term Contracts\nFixed Pricing',
    points: [
      '3 / 5 / 10 Year contract options available',
      'Service prices remain fixed for your term',
      'Price review only after 2 years if needed',
      'No surprise charges — transparent billing',
    ],
  },
  {
    id: 3,
    image: fleet2,
    icon: <FaFileInvoiceDollar className="text-red-500 text-2xl" />,
    tag: 'Billing System',
    title: 'Flexible Billing,\nZero Hassle',
    points: [
      'No immediate payment after job completion',
      'Service confirmation email with invoice sent',
      'Weekly summary every Monday morning',
      'Payment window: Monday–Tuesday for last week',
    ],
  },
  {
    id: 4,
    image: fleet1,
    icon: <FaCheckCircle className="text-red-500 text-2xl" />,
    tag: 'The Result',
    title: 'Less Stress.\nMore Efficiency.',
    points: [
      'Fleet Managers focus on growth, not breakdowns',
      'Reduced downtime & better cost control',
      'Full maintenance tracking in one place',
      '24/7 support — no extra off-hours charges',
    ],
  },
];

const INTERVAL = 5000;

const FleetSection = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const slideTimer = setTimeout(() => {
      setActive(prev => (prev + 1) % slides.length);
    }, INTERVAL);

    return () => clearTimeout(slideTimer);
  }, [active]);

  const current = slides[active];

  return (
    <section className="bg-black py-16 md:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-700/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GiTireIronCross className="text-red-600 text-2xl" />
            <span className="text-red-600 font-medium tracking-widest uppercase text-sm">Fleet Solutions</span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            BUILT FOR <span className="text-red-600">FLEET MANAGERS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Free yourself from operational stress. Let Xtreme Mobile Tire handle every roadside emergency — so your drivers stay moving and you stay focused.
          </p>
        </div>

        {/* Main content — image left, slides right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — Image */}
          <div className="relative rounded-2xl overflow-hidden h-[420px] md:h-[500px]">
            {slides.map((slide, i) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={`Fleet slide ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === active ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Red left border accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-700 via-red-500 to-red-700" />

            {/* Slide counter */}
            <div className="absolute bottom-5 left-5 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-red-500' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Tag badge on image */}
            <div className="absolute top-5 left-5 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              {current.tag}
            </div>
          </div>

          {/* Right — Rotating content */}
          <div className="flex flex-col justify-between h-full">
            {/* Slide content */}
            <div key={active} className="animate-fade-in">
              {/* Icon + tag */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600/20 border border-red-600/40 rounded-lg flex items-center justify-center">
                  {current.icon}
                </div>
                <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
                  {current.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight whitespace-pre-line">
                {current.title}
              </h3>

              {/* Points */}
              <ul className="space-y-3 mb-8">
                {current.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GiTireIronCross className="text-red-500 text-lg flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

            </div>

            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    i === active
                      ? 'bg-red-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {slide.tag}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-lg transition-all duration-300 hover:scale-105 text-sm uppercase tracking-wide"
              >
                <FaTruck />
                Sign Up Your Fleet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
