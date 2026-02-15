import { GiTireIronCross } from 'react-icons/gi';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'David Malan',
      role: 'CEO of Abc',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus turpis sit amet quam viverra, at molestie enim tincidunt. Donec lacinia justo ut nisi rutrum.',
      rating: 5,
    },
    {
      name: 'David Malan',
      role: 'CEO of Abc',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus turpis sit amet quam viverra, at molestie enim tincidunt. Donec lacinia justo ut nisi rutrum.',
      rating: 5,
    },
    {
      name: 'David Malan',
      role: 'CEO of Abc',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus turpis sit amet quam viverra, at molestie enim tincidunt. Donec lacinia justo ut nisi rutrum.',
      rating: 5,
    },
  ];

  return (
    <section className="bg-black py-16 md:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GiTireIronCross className="text-red-600 text-2xl" />
            <span className="text-red-600 font-medium">Testimonials</span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            OUR CLIENT <span className="text-red-600">REVIEWS</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor. Duis a orci nunc.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#1a1a1a] rounded-lg p-8 relative">
              <FaQuoteLeft className="text-red-600 text-4xl mb-4 opacity-50" />
              <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.text}</p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>

              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-red-600 text-6xl opacity-10">
                <FaQuoteLeft />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
