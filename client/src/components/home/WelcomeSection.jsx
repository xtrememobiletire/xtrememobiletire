import { GiTireIronCross } from 'react-icons/gi';
import { FaClock, FaTruck, FaMapMarkedAlt } from 'react-icons/fa';
import welcome1 from '../../assets/welcome1.jpg';
import welcome2 from '../../assets/welcome2.jpg';
import welcome3 from '../../assets/welcome3.jpeg';

const WelcomeSection = () => {
  const services = [
    {
      icon: <FaClock />,
      title: '24/7 Mobile Service',
      description: 'Professional mobile tire services available around the clock. Our fully equipped mobile units are ready day or night to keep your fleet running.',
      image: welcome1,
    },
    {
      icon: <FaTruck />,
      title: 'Fleet-Focused Solutions',
      description: 'Specialized tire programs for commercial fleets. Minimize downtime, prevent delays, and keep your operations running smoothly with our expert service.',
      image: welcome2,
    },
    {
      icon: <FaMapMarkedAlt />,
      title: 'Coast to Coast Coverage',
      description: 'Serving VA, MD, KY, NC, TN, Washington DC, and Ontario Canada. Dependable on-site tire solutions wherever your vehicles operate.',
      image: welcome3,
    },
  ];

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GiTireIronCross className="text-red-600 text-2xl" />
            <span className="text-red-600 font-medium">Welcome to XTREME MOBILE TIRE Service</span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            24/7 RELIABLE MOBILE TIRE <span className="text-red-600">SOLUTIONS</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Professional mobile tire services for commercial fleets and individual vehicles. Our fleet-centered programs minimize downtime, prevent costly delays, and keep your operations running smoothly.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-xl">
                    {service.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
