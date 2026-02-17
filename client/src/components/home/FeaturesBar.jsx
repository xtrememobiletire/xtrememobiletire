import logo1 from '../../assets/companieslogo/logo1.jpeg';
import logo2 from '../../assets/companieslogo/logo2.jpeg';
import logo3 from '../../assets/companieslogo/logo3.webp';
import logo4 from '../../assets/companieslogo/logo4.jpeg';
import logo5 from '../../assets/companieslogo/logo5.jpeg';

const FeaturesBar = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5];

  return (
    <div className="bg-black py-8 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative">
          {/* Scrolling Container */}
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`Company ${index + 1}`}
                  className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`Company ${index + 1}`}
                  className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBar;
