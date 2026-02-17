import { Link } from 'react-router-dom';
import { GiTireIronCross } from 'react-icons/gi';
import aboutVideo from '../../assets/aboutvideo.mp4';

const AboutSection = () => {
  return (
    <section className="bg-black py-16 md:py-24 relative overflow-hidden">
<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Video */}
          <div className="relative rounded-lg overflow-hidden">
            <video
              src={aboutVideo}
              className="w-full rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          {/* Right - Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GiTireIronCross className="text-red-600 text-2xl" />
              <span className="text-red-600 font-medium">About Xtreme Mobile Tire</span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              PROFESSIONAL TIRE SERVICES<br />
              <span className="text-red-600">DELIVERED TO YOUR DOOR</span>
            </h2>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Xtreme Mobile Tire is your go-to solution for expert tire services brought directly to you — whether you're at home, at work, or stranded on the roadside. We handle everything from tire changes and repairs to rotations and balancing, all without you having to leave your location. Our certified technicians arrive fully equipped and ready to get you back on the road safely and efficiently.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Our mission is simple — make tire service fast, hassle-free, and accessible for every driver. We're committed to redefining what mobile tire service looks like by putting your safety and convenience first, every single time.
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
