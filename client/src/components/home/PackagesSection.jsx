import { Link } from 'react-router-dom';
import xLogo from '../../assets/x.png';
import { FaCheck } from 'react-icons/fa';

const PackagesSection = () => {
  const packages = [
    {
      name: 'BASIC PACKAGES',
      title: 'Car Tire',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1594786522429-0a0b49744dff?w=300&q=80',
    },
    {
      name: 'PREMIUM PACKAGES',
      title: 'Tire Rim',
      price: '$599',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300&q=80',
      featured: true,
    },
  ];

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={xLogo} alt="X" className="w-6 h-6 object-contain" />
              <span className="text-red-600 font-medium">Our Packages</span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              GET ALL YOUR CAR NEEDS<br />
              <span className="text-red-600">IN ONE STOP</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor.
              Duis a orci nunc. Suspendisse ac convallis sapien, quis commodo libero.
            </p>

            {/* Features List */}
            <ul className="space-y-3 mb-8">
              {[
                'Cras dapibus ullamcorper dictum',
                'Vivamus nec purus eu eros pulvinar',
                'Maecenas ut mauris at',
                'Suspendisse tristique neque a lorem',
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <FaCheck className="text-red-600 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/shop"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded transition"
            >
              View Packages
            </Link>
          </div>

          {/* Right - Package Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-[#1a1a1a] rounded-lg p-6 text-center ${
                  pkg.featured ? 'ring-2 ring-red-600' : ''
                }`}
              >
                {pkg.featured && (
                  <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    POPULAR
                  </div>
                )}
                <p className="text-gray-400 text-sm mb-2">{pkg.name}</p>
                <h3 className="text-white text-2xl font-bold mb-4">{pkg.title}</h3>
                <div className="mb-4">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-40 object-contain mx-auto"
                  />
                </div>
                <div className="text-red-600 text-3xl font-bold mb-4">{pkg.price}</div>
                <Link
                  to="/shop"
                  className="block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition"
                >
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
