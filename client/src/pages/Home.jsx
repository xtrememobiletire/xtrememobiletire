import Hero from '../components/home/Hero';
import FeaturesBar from '../components/home/FeaturesBar';
import WelcomeSection from '../components/home/WelcomeSection';
import AboutSection from '../components/home/AboutSection';
import ServicesGrid from '../components/home/ServicesGrid';
import PackagesSection from '../components/home/PackagesSection';
import QualitySection from '../components/home/QualitySection';
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
      <ServicesGrid />
      <PackagesSection />
      <QualitySection />
      <TestimonialsSection />
      <BlogSection />
      <DiscountSection />
    </div>
  );
};

export default Home;
