import { Link } from 'react-router-dom';
import { GiTireIronCross } from 'react-icons/gi';
import { FaArrowRight, FaCalendar } from 'react-icons/fa';

const BlogSection = () => {
  const blogs = [
    {
      title: 'SHOULD YOU CHOOSE PREMIUM TIRE FOR YOUR CAR?',
      date: 'March 28, 2021',
      category: 'Tire Service',
      excerpt: 'Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor duis a orci nunc.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    },
    {
      title: 'BALANCING CORRECTLY IMPROVES THE CAR',
      date: 'March 28, 2021',
      category: 'Tire Installation',
      excerpt: 'Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor duis a orci nunc.',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&q=80',
    },
    {
      title: 'HOW OFTEN TO CHECK THE TIRE AIR PRESSURE',
      date: 'March 28, 2021',
      category: 'Car Service',
      excerpt: 'Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor duis a orci nunc.',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80',
    },
  ];

  return (
    <section className="bg-[#0a0a0a] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GiTireIronCross className="text-red-600 text-2xl" />
            <span className="text-red-600 font-medium">News & Articles</span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            OUR BLOG <span className="text-red-600">& ARTICLE</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor. Duis a orci nunc.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <FaCalendar className="text-red-600" />
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-white text-lg font-bold mb-3 leading-tight hover:text-red-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all text-sm"
                >
                  Read More <FaArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
