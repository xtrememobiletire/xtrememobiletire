import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import FeaturesBar from '../components/home/FeaturesBar';
import WelcomeSection from '../components/home/WelcomeSection';
import AboutSection from '../components/home/AboutSection';
import ServicesGrid from '../components/home/ServicesGrid';
import FleetSection from '../components/home/FleetSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BlogSection from '../components/home/BlogSection';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Xtreme Mobile Tire | Mobile Tire Repair & Replacement</title>
        <meta name="description" content="Xtreme Mobile Tire provides fast, professional mobile tire repair and replacement. We come to you — no need to visit a shop. Book online today!" />
        <link rel="canonical" href="https://xtrememobiletire.com/" />
      </Helmet>
      <Hero />
      <FeaturesBar />
      <WelcomeSection />
      <AboutSection />
      <BlogSection />
      <ServicesGrid />
      <FleetSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
