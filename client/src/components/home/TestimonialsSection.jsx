import { GiTireIronCross } from 'react-icons/gi';
import { FaGoogle } from 'react-icons/fa';
import review1 from '../../assets/reviews/review1.jpeg';
import review2 from '../../assets/reviews/review2.jpeg';
import review3 from '../../assets/reviews/review3.jpeg';
import review4 from '../../assets/reviews/review4.jpeg';
import review5 from '../../assets/reviews/review5.jpeg';
import review6 from '../../assets/reviews/review6.jpeg';
import review7 from '../../assets/reviews/review7.jpeg';
import review8 from '../../assets/reviews/review8.jpeg';

const reviews = [review1, review2, review3, review4, review5, review6, review7, review8];
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
            <GiTireIronCross className="text-red-600 text-2xl" />
            <span className="text-red-600 font-medium tracking-widest uppercase text-sm">Real Client Feedback</span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            WHAT OUR CLIENTS <span className="text-red-600">SAY</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            Don&apos;t just take our word for it — read what our customers have to say about Xtreme Mobile Tire Service.
          </p>

          {/* Google rating badge */}
          <div className="inline-flex items-center gap-2 mt-5 bg-[#1a1a1a] border border-red-600/30 rounded-full px-5 py-2">
            <FaGoogle className="text-white text-base" />
            <span className="text-white font-semibold text-sm">Google Verified Reviews</span>
            <span className="flex gap-0.5 ml-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
              ))}
            </span>
            <span className="text-gray-400 text-xs ml-1">5.0</span>
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
