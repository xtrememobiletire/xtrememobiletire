import { FaCog, FaTools, FaAward, FaUsers } from 'react-icons/fa';

const FeaturesBar = () => {
  const features = [
    { icon: <FaCog />, label: 'LogoIpsum' },
    { icon: <FaTools />, label: 'LogoIpsum' },
    { icon: <FaAward />, label: 'LogoIpsum' },
    { icon: <FaUsers />, label: 'LogoIpsum' },
  ];

  return (
    <div className="bg-black py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center justify-center gap-3 text-white">
              <div className="text-3xl md:text-4xl text-red-600">
                {feature.icon}
              </div>
              <span className="font-semibold text-sm md:text-base">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesBar;
