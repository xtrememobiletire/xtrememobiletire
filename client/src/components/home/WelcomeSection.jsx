import { GiTireIronCross } from 'react-icons/gi';
import { FaDollarSign, FaCog, FaUserTie } from 'react-icons/fa';

const WelcomeSection = () => {
  const services = [
    {
      icon: <FaDollarSign />,
      title: 'Affordable Price',
      description: 'Phasellus volutpat neque a tellus venenatis, a euismod augue facilisis. Fusce ut metus mattis.',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&q=80',
    },
    {
      icon: <FaCog />,
      title: 'Fast Service',
      description: 'Phasellus volutpat neque a tellus venenatis, a euismod augue facilisis. Fusce ut metus mattis.',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80',
    },
    {
      icon: <FaUserTie />,
      title: 'High Quality',
      description: 'Phasellus volutpat neque a tellus venenatis, a euismod augue facilisis. Fusce ut metus mattis.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    },
  ];

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GiTireIronCross className="text-red-600 text-2xl" />
            <span className="text-red-600 font-medium">Welcome to Tyrest</span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            ALL YOU NEED IN <span className="text-red-600">ONE PLACE</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor. Duis a orci nunc. Suspendisse ac convallis sapien, quis commodo libero.
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
