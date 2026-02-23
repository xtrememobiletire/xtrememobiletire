import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Shop from './pages/Shop';
import Account from './pages/Account';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

/* If admin is logged in, redirect any public page visit to /admin */
const PublicRoute = ({ element }) => {
  const isAdmin = localStorage.getItem('xmt_role') === 'admin';
  return isAdmin ? <Navigate to="/admin" replace /> : element;
};

function Layout() {
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  return (
    <div className="min-h-screen">
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<PublicRoute element={<Home />} />} />
        <Route path="/about" element={<PublicRoute element={<About />} />} />
        <Route path="/services" element={<PublicRoute element={<Services />} />} />
        <Route path="/contact" element={<PublicRoute element={<Contact />} />} />
        <Route path="/booknow" element={<PublicRoute element={<Booking />} />} />
        <Route path="/shop" element={<PublicRoute element={<Shop />} />} />
        <Route path="/account" element={<PublicRoute element={<Account />} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout />
      </Router>
    </HelmetProvider>
  );
}

export default App;
