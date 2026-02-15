import { Link } from 'react-router-dom';
import { GiTireIronCross } from 'react-icons/gi';
import { FaPlay } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section className="bg-black py-16 md:py-24 relative overflow-hidden">
      {/* Background Tire Pattern */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
          alt="Tire"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600&q=80"
              alt="Tire Service"
              className="rounded-lg w-full"
            />
            {/* Play Button */}
            <button className="absolute bottom-8 right-8 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-all hover:scale-110">
              <FaPlay className="ml-1" />
            </button>
          </div>

          {/* Right - Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GiTireIronCross className="text-red-600 text-2xl" />
              <span className="text-red-600 font-medium">About Tyrest</span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              THE BEST TIRE SOLUTION FOR<br />
              <span className="text-red-600">YOUR PRIVATE CAR</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor.
              Duis a orci nunc. Suspendisse ac convallis sapien, quis commodo libero. Donec
              diam massa, porttitor ac eros varius eleifend.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center lg:text-left">
                <h3 className="text-red-600 text-4xl md:text-5xl font-bold mb-2">215</h3>
                <p className="text-gray-400 text-sm">Completed Work</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-red-600 text-4xl md:text-5xl font-bold mb-2">15</h3>
                <p className="text-gray-400 text-sm">Year Experience</p>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
