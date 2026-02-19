import { Link } from 'react-router-dom';
import { FaArrowRight, FaOilCan, FaBolt, FaKey, FaGasPump, FaShieldAlt, FaWarehouse, FaTag, FaStar, FaCar, FaTruck, FaTools, FaWrench, FaCheckCircle } from 'react-icons/fa';
import { GiTireIronCross, GiCarWheel } from 'react-icons/gi';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PackagesSection from '../components/home/PackagesSection';
import slide2 from '../assets/slide2.jpg';
import welcome2 from '../assets/welcome2.jpg';
import fleet1 from '../assets/fleet/fleet1.webp';
import service1 from '../assets/services/service1.jpg';
import service2 from '../assets/services/service2.jpg';
import service3 from '../assets/services/service3.jpg';
import service4 from '../assets/services/service4.jpg';
import service5 from '../assets/services/service5.jpg';
import service6 from '../assets/services/service6.jpg';
import service7 from '../assets/services/service7.jpg';
import service8 from '../assets/services/service8.jpg';
import service9 from '../assets/services/service9.jpg';
import service10 from '../assets/services/service10.jpg';
import service11 from '../assets/services/service11.jpg';
import service12 from '../assets/services/service12.jpg';
import service13 from '../assets/services/service13.jpg';
import service14 from '../assets/services/service14.jpg';
import service15 from '../assets/services/service15.jpg';
import service16 from '../assets/services/service16.png';

const services = [
  { icon: <GiTireIronCross />, title: 'Seasonal Tire Change (ON/OFF RIM)', desc: 'Fast and reliable tire changes brought directly to you — at home, work, or roadside.', img: service1 },
  { icon: <FaTruck />, title: 'Roadside Assistance', desc: 'Stuck on the road? Our rapid-response team is available 24/7 to get you moving again.', img: service2 },
  { icon: <GiCarWheel />, title: 'Rim Repair', desc: 'Bent, cracked, or scuffed rims? We restore your wheels to their original condition on-site.', img: service3 },
  { icon: <FaOilCan />, title: 'Oil Change', desc: 'Keep your engine running clean with our mobile oil change — we come to you with the right oil.', img: service4 },
  { icon: <GiTireIronCross />, title: 'Flat Tire Repair', desc: "Don't let a flat tire ruin your day. We patch and repair flat tires on the spot, fast.", img: service5 },
  { icon: <FaWarehouse />, title: 'Tire Storage', desc: 'No space for seasonal tires? We offer secure, climate-controlled storage all year long.', img: service6 },
  { icon: <FaTag />, title: 'Used Tires for Sale', desc: 'Quality-tested used tires at unbeatable prices — all inspected for safety and performance.', img: service7 },
  { icon: <FaStar />, title: 'New Tires for Sale', desc: 'Top-brand new tires for every vehicle type. We deliver and install wherever you are.', img: service8 },
  { icon: <FaTools />, title: 'Brake Replacement', desc: 'Our certified technicians inspect, repair, and replace brake pads and rotors at your location.', img: service9 },
  { icon: <FaShieldAlt />, title: 'Rim Protector', desc: 'Shield your rims from curb damage and road hazards with professional rim protector installation.', img: service10 },
  { icon: <FaBolt />, title: 'Battery Boost', desc: 'Dead battery? Our mobile technicians provide instant battery boost service — no hassle.', img: service11 },
  { icon: <FaBolt />, title: 'Car Battery Jump-Start', desc: "Quick and safe jump-start service anytime, anywhere. We'll be on-site fast.", img: service12 },
  { icon: <FaKey />, title: 'Car Lockout / Locksmith', desc: 'Locked your keys inside? Our mobile locksmith gets you back in quickly without damage.', img: service13 },
  { icon: <FaGasPump />, title: 'Gas & Diesel Delivery', desc: 'Run out of fuel? We deliver gas or diesel directly to your vehicle so you can keep moving.', img: service14 },
  { icon: <FaCar />, title: 'Car Detailing', desc: 'Give your vehicle a showroom shine with professional interior and exterior cleaning at your door.', img: service15 },
  { icon: <FaWrench />, title: 'PPF (Paint Protection Film)', desc: "Protect your vehicle's paint from scratches, chips, and UV damage with premium PPF installation.", img: service16 },
];

const Services = () => {
  return (
    <div className="bg-black text-white">

      {/* ── Hero ── */}
      <section
        className="relative h-56 sm:h-72 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${slide2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide uppercase">Services</h1>
          <p className="mt-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-red-500">Services</span>
          </p>
        </div>
      </section>

      {/* ── All Services Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GiTireIronCross className="text-red-600 text-xl" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            OUR BEST <span className="text-red-600">SERVICES</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-3">
            From tire changes to car detailing — we bring professional automotive services directly to your location, 24/7 across Canada and the USA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg bg-[#111] border border-gray-800 hover:border-red-600 transition">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                  {service.icon}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold text-sm mb-2">{service.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">{service.desc}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-red-500 text-xs font-semibold hover:gap-2 transition-all"
                >
                  Read More <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Client Reviews ── */}
      <TestimonialsSection />

      {/* ── Packages ── */}
      <PackagesSection />

      {/* ── Consultation / Quality ── */}
      <section className="bg-[#0d0d0d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left image */}
          <div className="relative rounded-lg overflow-hidden">
            <img src={welcome2} alt="Consultation" className="w-full h-80 sm:h-96 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-red-600/90 p-4">
              <p className="text-white font-bold text-sm">IF YOU NEED HELP, GET A CONSULTATION</p>
              <Link to="/contact" className="text-white text-xs underline hover:text-gray-200 transition">Get Started →</Link>
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mb-2">High Technology</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              GET ALL YOUR CAR NEEDS <span className="text-red-600">IN OUR STORE</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Our mobile team is equipped with industry-leading tools and technology to handle every tire and automotive need — right at your location.
            </p>
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

      {/* ── Discount Banner ── */}
      <section
        className="relative py-20 text-center"
        style={{ backgroundImage: `url(${fleet1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/78" />
        <div className="relative z-10 px-4">
          <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mb-2">Join With Your Friends</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
            GET <span className="text-red-600">30% DISCOUNT</span>
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-6">
            Refer a friend and both of you get 30% off your next mobile tire service. Share the savings and keep everyone on the road safely.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-semibold transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Services;
