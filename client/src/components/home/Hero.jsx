import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GiTireIronCross } from 'react-icons/gi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import xtremeVideo from '../../assets/xtremevideo.mp4';
import slide2 from '../../assets/slide2.jpg';
import slide3 from '../../assets/slide3.png';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { type: 'image', src: slide3 },
    { type: 'video', src: xtremeVideo },
    { type: 'image', src: slide2 },
  ];

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Slider Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.type === 'video' ? (
              <video
                src={slide.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.src})` }}
              />
            )}
          </div>
        ))}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Slider Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slider Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentSlide === index ? 'bg-red-600' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
