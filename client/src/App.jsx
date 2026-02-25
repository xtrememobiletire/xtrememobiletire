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
import FleetDashboard from './pages/FleetDashboard';
import MemberDashboard from './pages/MemberDashboard';
import NotFound from './pages/NotFound';

/* Redirect logged-in users to their dashboard */
const PublicRoute = ({ element }) => {
  const role = localStorage.getItem('xmt_role');
  if (role === 'admin') return <Navigate to="/admin" replace />;
  if (role === 'fleet') return <Navigate to="/fleet-dashboard" replace />;
  if (role === 'member') return <Navigate to="/member-dashboard" replace />;
  return element;
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
        <Route path="/fleet-dashboard" element={<FleetDashboard />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
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
