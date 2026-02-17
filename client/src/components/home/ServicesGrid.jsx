import { Link } from 'react-router-dom';
import { FaArrowRight, FaOilCan, FaBolt, FaKey, FaGasPump, FaShieldAlt, FaWarehouse, FaTag, FaStar, FaCar, FaTruck, FaTools, FaWrench } from 'react-icons/fa';
import { GiTireIronCross, GiCarWheel } from 'react-icons/gi';
import service1 from '../../assets/services/service1.jpg';
import service2 from '../../assets/services/service2.jpg';
import service3 from '../../assets/services/service3.jpg';
import service4 from '../../assets/services/service4.jpg';
import service5 from '../../assets/services/service5.jpg';
import service6 from '../../assets/services/service6.jpg';
import service7 from '../../assets/services/service7.jpg';
import service8 from '../../assets/services/service8.jpg';
import service9 from '../../assets/services/service9.jpg';
import service10 from '../../assets/services/service10.jpg';
import service11 from '../../assets/services/service11.jpg';
import service12 from '../../assets/services/service12.jpg';
import service13 from '../../assets/services/service13.jpg';
import service14 from '../../assets/services/service14.jpg';
import service15 from '../../assets/services/service15.jpg';
import service16 from '../../assets/services/service16.png';

const ServicesGrid = () => {
  const services = [
    {
      icon: <GiTireIronCross />,
      title: 'Seasonal Tire Change (ON/OFF RIM)',
      description: 'Fast and reliable tire changes brought directly to you. Whether at home, work, or on the roadside, our technicians swap your tires quickly and safely.',
      image: service1,
    },
    {
      icon: <FaTruck />,
      title: 'Roadside Assistance',
      description: 'Stuck on the side of the road? Our rapid-response team is available 24/7 to get you moving again — no tow truck needed.',
      image: service2,
    },
    {
      icon: <GiCarWheel />,
      title: 'Rim Repair',
      description: 'Bent, cracked, or scuffed rims? We restore your wheels to their original condition using professional-grade repair techniques on-site.',
      image: service3,
    },
    {
      icon: <FaOilCan />,
      title: 'Oil Change',
      description: 'Keep your engine running clean with our mobile oil change service. We come to you with the right oil and filters for your vehicle.',
      image: service4,
    },
    {
      icon: <GiTireIronCross />,
      title: 'Flat Tire Repair',
      description: 'Don\'t let a flat tire ruin your day. Our mobile team patches and repairs flat tires on the spot, getting you back on the road fast.',
      image: service5,
    },
    {
      icon: <FaWarehouse />,
      title: 'Tire Storage',
      description: 'No space for your seasonal tires? We offer secure, climate-controlled tire storage so your tires stay in top shape all year long.',
      image: service6,
    },
    {
      icon: <FaTag />,
      title: 'Used Tires for Sale',
      description: 'Quality-tested used tires available at unbeatable prices. All tires are inspected for safety and performance before being offered for sale.',
      image: service7,
    },
    {
      icon: <FaStar />,
      title: 'New Tires for Sale',
      description: 'Shop from a wide selection of top-brand new tires suited for every vehicle type. We deliver and install them wherever you are.',
      image: service8,
    },
    {
      icon: <FaTools />,
      title: 'Brake Replacement',
      description: 'Your safety depends on reliable brakes. Our certified technicians inspect, repair, and replace brake pads and rotors at your location.',
      image: service9,
    },
    {
      icon: <FaShieldAlt />,
      title: 'Rim Protector',
      description: 'Shield your rims from curb damage and road hazards with our professional rim protector installation. Keep your wheels looking brand new.',
      image: service10,
    },
    {
      icon: <FaBolt />,
      title: 'Battery Boost',
      description: 'Dead battery? Our mobile technicians provide instant battery boost service to get your vehicle started without any hassle.',
      image: service11,
    },
    {
      icon: <FaBolt />,
      title: 'Car Battery Jump-Start',
      description: 'Quick and safe jump-start service available anytime, anywhere. We\'ll be on-site fast to get your engine running again.',
      image: service12,
    },
    {
      icon: <FaKey />,
      title: 'Car Lockout / Locksmith',
      description: 'Locked your keys inside? Our mobile locksmith service gets you back in your vehicle quickly and without damaging your car.',
      image: service13,
    },
    {
      icon: <FaGasPump />,
      title: 'Gas & Diesel Delivery',
      description: 'Run out of fuel? We deliver gas or diesel directly to your vehicle so you can get moving again without waiting for a tow.',
      image: service14,
    },
    {
      icon: <FaCar />,
      title: 'Car Detailing',
      description: 'Give your vehicle a showroom shine with our professional detailing service. Interior and exterior cleaning done right at your doorstep.',
      image: service15,
    },
    {
      icon: <FaWrench />,
      title: 'PPF (Paint Protection Film)',
      description: 'Protect your vehicle\'s paint from scratches, chips, and UV damage with our premium Paint Protection Film installation service.',
      image: service16,
    },
  ];

  return (
    <section className="bg-[#0a0a0a] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GiTireIronCross className="text-red-600 text-2xl" />
            <span className="text-red-600 font-medium">What We Offer</span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            OUR <span className="text-red-600">SERVICES</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From tire changes to car detailing — we bring professional automotive services directly to your location, 24/7.
          </p>
        </div>

        {/* Services Grid — 4 per row, show only first 8 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 8).map((service, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <div className="relative h-64">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-lg">
                  {service.icon}
                </div>
              </div>

              {/* Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-red-500 text-sm font-semibold hover:gap-3 transition-all"
                >
                  Learn More <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-8 py-3 rounded-sm font-bold text-sm tracking-widest uppercase transition-all duration-300"
          >
            Show More Services <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
