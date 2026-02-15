import { Link } from 'react-router-dom';
import { GiTireIronCross } from 'react-icons/gi';

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=1920&q=80')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center py-20 md:py-0">
        <div className="w-full lg:w-1/2 lg:ml-auto text-center lg:text-left">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4 md:mb-6 justify-center lg:justify-start">
            <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-red-600 rounded-full flex items-center justify-center">
              <GiTireIronCross className="text-red-600 text-lg md:text-xl" />
            </div>
            <span className="text-red-600 font-medium text-base md:text-lg">We Are Xtreme Mobile Tire</span>
          </div>

          {/* Heading */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
            DETAIL & PRECISION<br />
            CAR TIRE SERVICE
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Suspendisse in magna in elit hendrerit condimentum. Phasellus
            eu justo mi. Proin aliquet, mauris a volutpat lobortis, erat libero
            condimentum metus, eu tincidunt felis ligula in.
          </p>

          {/* CTA Button */}
          <Link
            to="/about"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded transition text-sm md:text-base"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
