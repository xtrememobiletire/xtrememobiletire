import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const ServicesGrid = () => {
  const services = [
    {
      title: 'Tire Replacement',
      description: 'Curabitur ac quam aliquam urna vehicula semper sed vel elit. Sed et leo purus. Vivamus vitae sapien.',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&q=80',
    },
    {
      title: 'Tire Installation',
      description: 'Curabitur ac quam aliquam urna vehicula semper sed vel elit. Sed et leo purus. Vivamus vitae sapien.',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&q=80',
    },
    {
      title: 'Tire Alignment',
      description: 'Curabitur ac quam aliquam urna vehicula semper sed vel elit. Sed et leo purus. Vivamus vitae sapien.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    },
    {
      title: 'Car & Wheel Works',
      description: 'Curabitur ac quam aliquam urna vehicula semper sed vel elit. Sed et leo purus. Vivamus vitae sapien.',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80',
    },
  ];

  return (
    <section className="bg-[#0a0a0a] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <div className="relative h-80">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{service.description}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all"
                >
                  Learn More <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
