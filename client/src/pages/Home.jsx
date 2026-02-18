import Hero from '../components/home/Hero';
import FeaturesBar from '../components/home/FeaturesBar';
import WelcomeSection from '../components/home/WelcomeSection';
import AboutSection from '../components/home/AboutSection';
import ServicesGrid from '../components/home/ServicesGrid';
import FleetSection from '../components/home/FleetSection';
import PackagesSection from '../components/home/PackagesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BlogSection from '../components/home/BlogSection';
import DiscountSection from '../components/home/DiscountSection';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturesBar />
      <WelcomeSection />
      <AboutSection />
      <BlogSection />
      <ServicesGrid />
      <FleetSection />
      <PackagesSection />
      <TestimonialsSection />
      <DiscountSection />
    </div>
  );
};

export default Home;
