import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaDollarSign, FaThumbsUp, FaStar, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import slide2 from '../assets/slide2.jpg';
import welcome1 from '../assets/welcome1.jpg';
import welcome2 from '../assets/welcome2.jpg';
import welcome3 from '../assets/welcome3.jpeg';
import service1 from '../assets/services/service1.jpg';
import service2 from '../assets/services/service2.jpg';
import service3 from '../assets/services/service3.jpg';
import fleet1 from '../assets/fleet/fleet1.webp';

const About = () => {
  return (
    <div className="bg-black text-white">
      <Helmet>
        <title>About Us | Xtreme Mobile Tire</title>
        <meta name="description" content="Learn about Xtreme Mobile Tire — who we are, our mission, and why customers trust us for mobile tire repair and replacement services." />
        <link rel="canonical" href="https://xtrememobiletire.com/about" />
      </Helmet>

      {/* ── Hero ── */}
      <section
        className="relative h-56 sm:h-72 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${slide2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide uppercase">About Us</h1>
          <p className="mt-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-red-500">About Us</span>
          </p>
        </div>
      </section>

      {/* ── Welcome / 3 Features ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-red-500 text-sm font-semibold uppercase tracking-widest mb-1">Welcome to Xtreme Mobile Tire</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            ALL YOU NEED IN <span className="text-red-600">ONE PLACE</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-3">
            Professional mobile tire services delivered directly to your location across Canada and the USA — fast, reliable, and affordable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <FaDollarSign />, title: 'Affordable Price', desc: 'Competitive pricing with no hidden fees. We bring quality tire services to your doorstep without breaking the bank.', img: service1 },
            { icon: <FaThumbsUp />, title: 'Good Service', desc: 'Our trained technicians arrive on time, fully equipped to handle any tire situation with professionalism and care.', img: service2 },
            { icon: <FaStar />, title: 'High Quality', desc: 'We use premium tires and industry-leading equipment to ensure your safety and satisfaction every single time.', img: service3 },
          ].map(({ icon, title, desc, img }) => (
            <div key={title} className="bg-[#111] rounded-lg overflow-hidden border border-gray-800 hover:border-red-600 transition group">
              <div className="overflow-hidden h-44">
                <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                    {icon}
                  </div>
                  <h3 className="font-bold text-base">{title}</h3>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Best Tire Solution ── */}
      <section className="bg-[#0d0d0d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left — image */}
          <div className="relative">
            <img src={welcome1} alt="Technician" className="w-full rounded-lg object-cover h-80 sm:h-96" />
            <div className="absolute -bottom-5 -left-5 bg-red-600 text-white p-4 rounded-lg shadow-xl hidden sm:block">
              <p className="text-2xl font-extrabold">15+</p>
              <p className="text-xs">Years of Experience</p>
            </div>
          </div>

          {/* Right — text + stats */}
          <div>
            <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mb-2">About Us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
              THE BEST TIRE SOLUTION FOR <span className="text-red-600">YOUR VEHICLE</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Xtreme Mobile Tire is a fully mobile tire service company serving customers across Canada and the USA. Whether you need a tire change, installation, balancing, or emergency roadside assistance — our expert team comes to you.
            </p>
            <div className="flex gap-8 mb-6">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-red-600">215<span className="text-red-400">+</span></p>
                <p className="text-gray-400 text-xs mt-1">Tire Options</p>
              </div>
              <div className="w-px bg-gray-700" />
              <div className="text-center">
                <p className="text-4xl font-extrabold text-red-600">15<span className="text-red-400">+</span></p>
                <p className="text-gray-400 text-xs mt-1">Years of Experience</p>
              </div>
              <div className="w-px bg-gray-700" />
              <div className="text-center">
                <p className="text-4xl font-extrabold text-red-600">5K<span className="text-red-400">+</span></p>
                <p className="text-gray-400 text-xs mt-1">Happy Customers</p>
              </div>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold transition text-sm"
            >
              Our Services <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Vision / Mission / Awards ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: 'Our Vision',
              color: 'bg-red-600',
              text: 'To be the most trusted and accessible mobile tire service across North America — putting safety and convenience first for every driver.',
            },
            {
              label: 'Our Mission',
              color: 'bg-[#111]',
              text: 'To deliver fast, professional, and affordable tire services wherever our customers are — eliminating the need to visit a shop by bringing the shop to them.',
            },
            {
              label: 'Our Awards',
              color: 'bg-[#111]',
              text: 'Recognized for excellence in mobile automotive service, customer satisfaction, and innovation in on-site tire solutions across Canada and the USA.',
            },
          ].map(({ label, color, text }) => (
            <div key={label} className={`${color} border border-gray-800 rounded-lg p-6`}>
              <h3 className="text-white font-bold text-base uppercase mb-3 tracking-wide">{label}</h3>
              <p className="text-gray-200 text-xs leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Membership Banner ── */}
      <section
        className="relative py-20 text-center"
        style={{ backgroundImage: `url(${fleet1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 px-4">
          <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mb-2">Special Offer</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
            JOIN OUR MEMBERSHIP NOW &amp; GET <span className="text-red-600">25% DISCOUNT</span>
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-6">
            Sign up today and enjoy exclusive member benefits, priority service, and a 25% discount on your first tire installation.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-semibold transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* ── Store / Consultation ── */}
      <section className="bg-[#0d0d0d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left image */}
          <div className="relative rounded-lg overflow-hidden">
            <img src={welcome2} alt="Consultation" className="w-full h-80 sm:h-96 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-red-600/90 p-4">
              <p className="text-white font-bold text-sm">IF YOU NEED HELP, GET A CONSULTATION</p>
              <Link to="/contact" className="text-white text-xs underline hover:text-gray-200 transition">Contact Us →</Link>
            </div>
          </div>

          {/* Right content */}
          <div>
            <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mb-2">High Performance</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              GET ALL YOUR CAR NEEDS <span className="text-red-600">IN OUR STORE</span>
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                'We Are Leading in Call Center Service',
                'Solutions For Small & Large Business',
                'Guidance From Our Expert Staff',
                'Learn From Customer Feedback',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-xs text-gray-400">
                  <FaCheckCircle className="text-red-600 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Skill bars */}
            {[
              { label: 'Quality Service', value: 95 },
              { label: 'Product Quality', value: 90 },
            ].map(({ label, value }) => (
              <div key={label} className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{label}</span>
                  <span>{value}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default About;
