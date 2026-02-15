import { Link } from 'react-router-dom';

const DiscountSection = () => {
  return (
    <section className="bg-black py-20 md:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
        <p className="text-red-600 font-semibold mb-4">Limited Time Offer</p>
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          GET <span className="text-red-600">30%</span> DISCOUNT
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor.
          Duis a orci nunc. Suspendisse ac convallis sapien.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded transition text-lg"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default DiscountSection;
