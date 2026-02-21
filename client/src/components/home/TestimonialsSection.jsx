import xLogo from '../../assets/x.png';
import { FaGoogle } from 'react-icons/fa';
import review1 from '../../assets/reviews/review1.jpeg';
import review2 from '../../assets/reviews/review2.jpeg';
import review3 from '../../assets/reviews/review3.jpeg';
import review4 from '../../assets/reviews/review4.jpeg';
import review5 from '../../assets/reviews/review5.jpeg';
import review6 from '../../assets/reviews/review6.jpeg';
import review7 from '../../assets/reviews/review7.jpeg';
import review8 from '../../assets/reviews/review8.jpeg';
import review9 from '../../assets/reviews/review9.png';
import harryKing from '../../assets/reviews/harryking.jpeg';

const reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9];
// Duplicate once — animation scrolls exactly -50% for a seamless loop
const duplicated = [...reviews, ...reviews];

const TestimonialsSection = () => {
  return (
    <section className="bg-black py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-700/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={xLogo} alt="X" className="w-6 h-6 object-contain" />
            <span className="text-red-600 font-medium tracking-widest uppercase text-sm">Real Client Feedback</span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            WHAT OUR CLIENTS <span className="text-red-600">SAY</span>
          </h2>
      

          {/* Harry King highlight */}
          <div className="inline-flex items-center gap-3 mt-6 bg-gradient-to-r from-red-950/60 via-[#1a1a1a] to-red-950/60 border border-red-600/40 rounded-2xl px-6 py-4 max-w-xl mx-auto">
            <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-red-600 shadow-lg shadow-red-900/40">
              <img src={harryKing} alt="Harry King" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="text-white font-semibold text-sm leading-snug">
                Recognized by our clients for outstanding leadership &mdash;
              </p>
              <p className="text-red-400 font-bold text-sm tracking-wide mt-0.5">
                Harry King &nbsp;<span className="text-gray-400 font-normal text-xs">· Director of Operations</span>
              </p>
              <div className="flex items-center gap-3 mt-1">
                <a
                  href="mailto:Harry@xtrememobiletire.com"
                  className="text-gray-400 text-xs hover:text-red-400 transition-colors duration-200"
                >
                  Mail: Harry@xtrememobiletire.com
                </a>
                <span className="text-gray-400 text-xs">|</span>
                <a
                  href="tel:4373755674"
                  className="text-gray-400 text-xs hover:text-red-400 transition-colors duration-200"
                >
                 Phone: (437) 375-5674
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scrolling row — full width */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #000 0%, transparent 100%)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #000 0%, transparent 100%)' }}
        />

        {/* The scrolling strip */}
        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {duplicated.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-72 md:w-80 mx-3 rounded-2xl overflow-hidden group"
              style={{ boxShadow: '0 4px 32px 0 rgba(220,38,38,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.45)' }}
            >
              {/* Red top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700 z-10" />

              {/* Google badge */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                <FaGoogle className="text-white text-xs" />
                <span className="text-white text-[10px] font-semibold tracking-wide">Review</span>
              </div>

              <img
                src={img}
                alt={`Customer review ${(i % reviews.length) + 1}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
