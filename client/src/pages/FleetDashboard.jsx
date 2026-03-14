import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaTruck, FaBuilding, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaSignOutAlt, FaCheckCircle, FaClock, FaTimesCircle,
  FaThLarge, FaCalendarPlus, FaListAlt, FaCar, FaPlus, FaTrash,
  FaUserTie, FaEdit, FaTimes, FaFileInvoiceDollar, FaCheckDouble, FaDownload,
} from 'react-icons/fa';
import { downloadInvoicePDF } from '../utils/invoiceUtils';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QkqKjLtI0CMESl4y2zPXGCtaeEssJHtV0bUb0t2Mfbkbq8EP8Ntk8RgyDaYSNxV5k1LrpLCbKW61PSAxxfPoSOW00oqN0Dy1j');

/* ── Inline Stripe checkout form for invoice payment ── */
function InvoiceCheckoutForm({ amount, invoiceId, onSuccess }) {
  const stripe   = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true); setMessage('');
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: 'if_required',
    });
    if (error) {
      setMessage(error.message);
    } else if (paymentIntent?.status === 'succeeded') {
      try { await API.post(`/invoices/${invoiceId}/confirm-payment`, { paymentIntentId: paymentIntent.id }); }
      catch { /* still call onSuccess */ }
      onSuccess();
    } else {
      setMessage('Payment processing. Please wait…');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <PaymentElement />
      {message && <p className="text-sm text-red-400 bg-red-900/20 border border-red-600/30 rounded-lg p-3">{message}</p>}
      <button type="submit" disabled={!stripe || loading}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition">
        {loading ? 'Processing…' : `Pay $${parseFloat(amount).toFixed(2)}`}
      </button>
    </form>
  );
}
import API from '../api';
import logo from '../assets/xtrememobiletire.webp';
import xtremeBlackLogo from '../assets/xtremeblack.png';

const SERVICES = [
  'Tire Repair - Plug', 'Tire Repair - Stem', 'Tire Swap (On Rim)',
  'Tire Swap (Off Rim)', 'Wheel Balancing', 'Spare Tire Change',
  'New Tire Replacement', 'Used Tire Replacement', 'New Rims Replacement',
  'Jump Start', 'Battery Installation', 'Locksmith',
];

const inputCls = 'w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-4 py-3 rounded-lg text-sm outline-none transition';
const labelCls = 'block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide';

const STATUS_STYLES = {
  'Appointment Pending':  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Job Start':            'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Appointment Confirmed':'bg-green-500/20 text-green-400 border-green-500/30',
  'Appointment Booked':   'bg-teal-500/20 text-teal-400 border-teal-500/30',
};
const ServiceStatusBadge = ({ status }) => (
  <span className={`text-xs px-2.5 py-0.5 rounded-full border ${STATUS_STYLES[status] || 'bg-gray-700/50 text-gray-300 border-gray-600'}`}>
    {status}
  </span>
);

const FleetDashboard = () => {
  const navigate  = useNavigate();
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab,     setTab]     = useState('dashboard');

  // Request form state
  const [form,      setForm]      = useState({ appointmentDate: '', vehicle: '', service: '', serviceType: '', address: '', phone: '', tireSize: '' });
  const [customAddress,    setCustomAddress]    = useState('');
  const [customPhone,      setCustomPhone]      = useState('');
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [useCustomPhone,   setUseCustomPhone]   = useState(false);
  const [status,    setStatus]    = useState({ loading: false, success: '', error: '' });

  // My service requests
  const [myRequests,      setMyRequests]      = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [unreadCount,     setUnreadCount]     = useState(0);

  // Vehicles
  const [vehicles,        setVehicles]        = useState([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vehicleForm,     setVehicleForm]     = useState({ makeModel: '', licenseNo: '', vinNumber: '', tireSize: '' });
  const [vehicleStatus,   setVehicleStatus]   = useState({ loading: false, error: '' });

  // Drivers
  const [drivers,        setDrivers]        = useState([]);
  const [driversLoading, setDriversLoading] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [driverForm,     setDriverForm]     = useState({ name: '', email: '', assignedVehicle: '' });
  const [driverStatus,   setDriverStatus]   = useState({ loading: false, error: '' });
  const [editingDriver,  setEditingDriver]  = useState(null); // driver object being edited

  // ── Invoice state ──
  const [myInvoices,      setMyInvoices]      = useState([]);
  const [invoicesLoading, setInvoicesLoading] = useState(false);
  const [payingInvoice,   setPayingInvoice]   = useState(null);   // invoice being paid
  const [clientSecret,    setClientSecret]    = useState('');
  const [payStep,         setPayStep]         = useState('info'); // 'info' | 'stripe' | 'success'
  const [payLoading,      setPayLoading]      = useState(false);
  const [payError,        setPayError]        = useState('');

  useEffect(() => {
    const token = localStorage.getItem('xmt_token');
    const role  = localStorage.getItem('xmt_role');
    if (!token || role !== 'fleet') { navigate('/'); return; }
    API.get('/auth/me')
      .then(res => { setUser(res.data); setLoading(false); })
      .catch(()  => handleLogout());
    // pre-load vehicles & drivers so counts are available on dashboard
    API.get('/vehicles/mine').then(res => setVehicles(res.data)).catch(() => {});
    API.get('/drivers/mine').then(res => setDrivers(res.data)).catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('xmt_token');
    localStorage.removeItem('xmt_role');
    localStorage.removeItem('xmt_name');
    navigate('/');
  };

  // Load unread count on mount
  useEffect(() => {
    API.get('/service-requests/mine')
      .then(res => setUnreadCount(res.data.filter(r => !r.viewed).length))
      .catch(() => {});
  }, []);

  // Load my service requests when switching to services tab
  useEffect(() => {
    if (tab !== 'services') return;
    setRequestsLoading(true);
    API.get('/service-requests/mine')
      .then(res => {
        setMyRequests(res.data);
        setUnreadCount(res.data.filter(r => !r.viewed).length);
        API.patch('/service-requests/mark-viewed').catch(() => {});
        // Clear highlights after 2 seconds
        setTimeout(() => {
          setMyRequests(prev => prev.map(r => ({ ...r, viewed: true })));
          setUnreadCount(0);
        }, 2000);
      })
      .catch(() => setMyRequests([]))
      .finally(() => setRequestsLoading(false));
  }, [tab]);

  // Load vehicles when switching to vehicles, request, or drivers tab
  useEffect(() => {
    if (tab !== 'vehicles' && tab !== 'request' && tab !== 'drivers') return;
    setVehiclesLoading(true);
    API.get('/vehicles/mine')
      .then(res => setVehicles(res.data))
      .catch(() => setVehicles([]))
      .finally(() => setVehiclesLoading(false));
  }, [tab]);

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setVehicleStatus({ loading: true, error: '' });
    try {
      const res = await API.post('/vehicles', vehicleForm);
      setVehicles(prev => [res.data, ...prev]);
      setVehicleForm({ makeModel: '', licenseNo: '', vinNumber: '', tireSize: '' });
      setShowVehicleForm(false);
      setVehicleStatus({ loading: false, error: '' });
    } catch (err) {
      setVehicleStatus({ loading: false, error: err.response?.data?.message || 'Failed to add vehicle.' });
    }
  };

  const handleDeleteVehicle = async (id) => {
    if (!confirm('Delete this vehicle?')) return;
    await API.delete(`/vehicles/${id}`);
    setVehicles(prev => prev.filter(v => v._id !== id));
  };

  // ── Driver handlers ──
  useEffect(() => {
    if (tab !== 'drivers') return;
    setDriversLoading(true);
    API.get('/drivers/mine')
      .then(res => setDrivers(res.data))
      .catch(() => setDrivers([]))
      .finally(() => setDriversLoading(false));
  }, [tab]);

  // ── Invoice handlers ──
  useEffect(() => {
    if (tab !== 'pending-invoices' && tab !== 'completed-invoices') return;
    setInvoicesLoading(true);
    API.get('/invoices/mine')
      .then(res => setMyInvoices(res.data))
      .catch(() => setMyInvoices([]))
      .finally(() => setInvoicesLoading(false));
  }, [tab]);

  const pendingInvoiceCount   = myInvoices.filter(i => i.status === 'pending').length;
  const completedInvoiceCount = myInvoices.filter(i => i.status === 'paid').length;

  const handlePayNow = async (invoice) => {
    setPayingInvoice(invoice);
    setPayStep('info');
    setPayError('');
    setClientSecret('');
  };

  const handleInitStripe = async () => {
    setPayLoading(true); setPayError('');
    try {
      const res = await API.post(`/invoices/${payingInvoice._id}/create-payment`, {});
      setClientSecret(res.data.clientSecret);
      setPayStep('stripe');
    } catch (err) {
      setPayError(err.response?.data?.message || 'Failed to initialize payment.');
    } finally {
      setPayLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setPayStep('success');
    setMyInvoices(prev => prev.map(i => i._id === payingInvoice._id ? { ...i, status: 'paid' } : i));
  };

  const closePayModal = () => {
    setPayingInvoice(null); setClientSecret(''); setPayStep('info'); setPayError('');
  };

  const handleAddDriver = async (e) => {
    e.preventDefault();
    setDriverStatus({ loading: true, error: '' });
    try {
      const res = await API.post('/drivers', driverForm);
      setDrivers(prev => [...prev, res.data]);
      setDriverForm({ name: '', email: '', assignedVehicle: '' });
      setShowDriverForm(false);
      setDriverStatus({ loading: false, error: '' });
    } catch (err) {
      setDriverStatus({ loading: false, error: err.response?.data?.message || 'Failed to add driver.' });
    }
  };

  const handleUpdateDriver = async (e) => {
    e.preventDefault();
    setDriverStatus({ loading: true, error: '' });
    try {
      const res = await API.put(`/drivers/${editingDriver._id}`, driverForm);
      setDrivers(prev => prev.map(d => d._id === res.data._id ? res.data : d));
      setEditingDriver(null);
      setDriverForm({ name: '', email: '', assignedVehicle: '' });
      setDriverStatus({ loading: false, error: '' });
    } catch (err) {
      setDriverStatus({ loading: false, error: err.response?.data?.message || 'Failed to update driver.' });
    }
  };

  const handleDeleteDriver = async (id) => {
    if (!confirm('Delete this driver?')) return;
    await API.delete(`/drivers/${id}`);
    setDrivers(prev => prev.filter(d => d._id !== id));
  };

  const startEditDriver = (driver) => {
    setEditingDriver(driver);
    setDriverForm({ name: driver.name, email: driver.email, assignedVehicle: driver.assignedVehicle || '' });
    setShowDriverForm(false);
    setDriverStatus({ loading: false, error: '' });
  };

  const cancelDriverForm = () => {
    setEditingDriver(null);
    setShowDriverForm(false);
    setDriverForm({ name: '', email: '', assignedVehicle: '' });
    setDriverStatus({ loading: false, error: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: '', error: '' });
    try {
      const res = await API.post('/service-requests', form);
      setStatus({ loading: false, success: res.data.message, error: '' });
      setForm({ appointmentDate: '', vehicle: '', service: '', serviceType: '', address: '', phone: '', tireSize: '' });
      setCustomAddress(''); setCustomPhone('');
      setUseCustomAddress(false); setUseCustomPhone(false);
    } catch (err) {
      setStatus({ loading: false, success: '', error: err.response?.data?.message || 'Something went wrong.' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statusConfig = {
    pending:  { icon: <FaClock className="text-yellow-400" />,       label: 'Pending Approval', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30' },
    approved: { icon: <FaCheckCircle className="text-green-400" />,  label: 'Approved',         color: 'text-green-400',  bg: 'bg-green-400/10 border-green-400/30' },
    rejected: { icon: <FaTimesCircle className="text-red-400" />,    label: 'Rejected',         color: 'text-red-400',    bg: 'bg-red-400/10 border-red-400/30' },
  };
  const s = statusConfig[user.status] || statusConfig.pending;

  const TABS = [
    { key: 'dashboard',           label: 'Dashboard',           icon: <FaThLarge /> },
    { key: 'vehicles',            label: 'Vehicles',             icon: <FaCar /> },
    { key: 'drivers',             label: 'My Drivers',           icon: <FaUserTie /> },
    { key: 'request',             label: 'Request New Service',  icon: <FaCalendarPlus /> },
    { key: 'services',            label: 'Service Status',       icon: <FaListAlt /> },
    { key: 'pending-invoices',    label: 'Pending Invoices',     icon: <FaFileInvoiceDollar /> },
    { key: 'completed-invoices',  label: 'Completed Invoices',   icon: <FaCheckDouble /> },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">

      {/* Top Bar */}
      <header className="bg-[#111] border-b border-gray-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <img src={logo} alt="XMT" className="h-10 w-auto object-contain" />
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest">Fleet Manager Portal</p>
            <p className="text-white font-bold text-sm">{user.companyName}</p>
            <p className="text-red-400 font-mono text-xs">XMT-{user.fleetId}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${s.bg} ${s.color}`}>
            {s.icon} {s.label}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition text-sm border border-gray-700 hover:border-red-600 px-3 py-1.5 rounded"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-56 bg-[#111] border-r border-gray-800 flex-shrink-0">
          <nav className="p-4 space-y-1">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setStatus({ loading: false, success: '', error: '' }); }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition flex items-center gap-2.5 ${
                  tab === t.key ? 'bg-red-600 text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-xs">{t.icon}</span>
                <span className="flex-1">{t.label}</span>
                {t.key === 'services' && unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                    {unreadCount}
                  </span>
                )}
                {t.key === 'pending-invoices' && pendingInvoiceCount > 0 && (
                  <span className="bg-yellow-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                    {pendingInvoiceCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">

          {/* ── Dashboard Tab ── */}
          {tab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard</h2>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#111] border border-gray-800 rounded-xl p-5 text-center cursor-pointer hover:border-red-600/40 transition" onClick={() => setTab('vehicles')}>
                  <FaTruck className="text-red-500 text-2xl mx-auto mb-2" />
                  <p className="text-white text-3xl font-bold">{vehicles.length}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mt-1">Vehicles</p>
                </div>
                <div className="bg-[#111] border border-gray-800 rounded-xl p-5 text-center cursor-pointer hover:border-red-600/40 transition" onClick={() => setTab('drivers')}>
                  <FaUserTie className="text-red-500 text-2xl mx-auto mb-2" />
                  <p className="text-white text-3xl font-bold">{drivers.length}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mt-1">Drivers</p>
                </div>
                <div className="bg-[#111] border border-gray-800 rounded-xl p-5 text-center">
                  <FaBuilding className="text-red-500 text-2xl mx-auto mb-2" />
                  <p className="text-white text-lg font-bold truncate">{user.companyName}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mt-1">Company</p>
                </div>
              </div>

              {/* Company Details */}
              <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-5">Company Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wide">Email</p>
                      <p className="text-white text-sm">{user.companyEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaPhone className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wide">Phone</p>
                      <p className="text-white text-sm">{user.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wide">Address</p>
                      <p className="text-white text-sm">{user.address}</p>
                    </div>
                  </div>
                  {user.companyWebsite && (
                    <div className="flex items-start gap-3">
                      <FaBuilding className="text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wide">Website</p>
                        <p className="text-white text-sm">{user.companyWebsite}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-red-600/10 border border-red-600/20 rounded-xl px-5 py-4 text-sm text-gray-400">
                Need help or have questions about your fleet account? Contact us at{' '}
                <a href="mailto:admin@xtrememobiletire.com" className="text-red-500 hover:underline">
                  admin@xtrememobiletire.com
                </a>
              </div>
            </div>
          )}

          {/* ── Vehicles Tab ── */}
          {tab === 'vehicles' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Vehicles</h2>
                  <p className="text-gray-400 text-sm mt-1">Manage your registered fleet vehicles.</p>
                </div>
                <button
                  onClick={() => { setShowVehicleForm(v => !v); setVehicleStatus({ loading: false, error: '' }); }}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition"
                >
                  <FaPlus className="text-xs" /> Add New Vehicle
                </button>
              </div>

              {/* Add Vehicle Form */}
              {showVehicleForm && (
                <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-6">
                  <h3 className="text-white font-bold mb-5">New Vehicle Details</h3>
                  <form onSubmit={handleAddVehicle} className="space-y-4">
                    <div>
                      <label className={labelCls}>Year, Make & Model *</label>
                      <input value={vehicleForm.makeModel} onChange={e => setVehicleForm({ ...vehicleForm, makeModel: e.target.value })}
                        placeholder="e.g. 2022 Ford F-150" required className={inputCls} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>License No. *</label>
                        <input value={vehicleForm.licenseNo} onChange={e => setVehicleForm({ ...vehicleForm, licenseNo: e.target.value })}
                          placeholder="e.g. ABC-1234" required className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>VIN Number</label>
                        <input value={vehicleForm.vinNumber} onChange={e => setVehicleForm({ ...vehicleForm, vinNumber: e.target.value })}
                          placeholder="e.g. 1HGBH41JXMN109186" className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Tire Size</label>
                      <input value={vehicleForm.tireSize} onChange={e => setVehicleForm({ ...vehicleForm, tireSize: e.target.value })}
                        placeholder="e.g. 235/65R17" className={inputCls} />
                    </div>
                    {vehicleStatus.error && (
                      <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">{vehicleStatus.error}</p>
                    )}
                    <div className="flex gap-3 pt-1">
                      <button type="submit" disabled={vehicleStatus.loading}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition">
                        {vehicleStatus.loading ? 'Saving…' : 'Save Vehicle'}
                      </button>
                      <button type="button" onClick={() => setShowVehicleForm(false)}
                        className="text-gray-400 hover:text-white border border-gray-700 px-6 py-2.5 rounded-lg text-sm transition">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Vehicles List */}
              {vehiclesLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-7 h-7 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : vehicles.length === 0 ? (
                <div className="bg-[#111] border border-gray-800 rounded-xl px-6 py-12 text-center">
                  <FaCar className="text-gray-700 text-4xl mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No vehicles added yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vehicles.map(v => (
                    <div key={v._id} className="bg-[#111] border border-gray-800 rounded-xl p-5 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-600/15 border border-red-600/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FaCar className="text-red-500" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{v.makeModel}</p>
                          <p className="text-gray-500 text-xs mt-1">Plate: <span className="text-gray-300">{v.licenseNo}</span></p>
                          {v.vinNumber && <p className="text-gray-500 text-xs">VIN: <span className="text-gray-300">{v.vinNumber}</span></p>}
                          {v.tireSize  && <p className="text-gray-500 text-xs">Tires: <span className="text-gray-300">{v.tireSize}</span></p>}
                        </div>
                      </div>
                      <button onClick={() => handleDeleteVehicle(v._id)}
                        className="text-xs bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 px-2.5 py-1 rounded-lg transition flex items-center gap-1">
                        <FaTrash className="text-xs" /> Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── My Drivers Tab ── */}
          {tab === 'drivers' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">My Drivers</h2>
                  <p className="text-gray-400 text-sm mt-1">Manage drivers assigned to your fleet.</p>
                </div>
                {!editingDriver && (
                  <button
                    onClick={() => { setShowDriverForm(v => !v); setDriverStatus({ loading: false, error: '' }); }}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition"
                  >
                    <FaPlus className="text-xs" /> Add New Driver
                  </button>
                )}
              </div>

              {/* Add Driver Form */}
              {showDriverForm && !editingDriver && (
                <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-6">
                  <h3 className="text-white font-bold mb-5">New Driver Details</h3>
                  <form onSubmit={handleAddDriver} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Driver Name *</label>
                        <input value={driverForm.name} onChange={e => setDriverForm({ ...driverForm, name: e.target.value })}
                          placeholder="e.g. John Smith" required className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Driver Email *</label>
                        <input type="email" value={driverForm.email} onChange={e => setDriverForm({ ...driverForm, email: e.target.value })}
                          placeholder="e.g. john@example.com" required className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Assigned Vehicle</label>
                      {vehicles.length > 0 ? (
                        <select value={driverForm.assignedVehicle} onChange={e => setDriverForm({ ...driverForm, assignedVehicle: e.target.value })}
                          className={`${inputCls} cursor-pointer`}>
                          <option value="">— Unassigned —</option>
                          {vehicles.map(v => (
                            <option key={v._id} value={`${v.makeModel} (${v.licenseNo})`}>
                              {v.makeModel} — {v.licenseNo}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input value={driverForm.assignedVehicle} onChange={e => setDriverForm({ ...driverForm, assignedVehicle: e.target.value })}
                          placeholder="e.g. 2022 Ford F-150 (ABC-1234)" className={inputCls} />
                      )}
                    </div>
                    {driverStatus.error && (
                      <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">{driverStatus.error}</p>
                    )}
                    <div className="flex gap-3 pt-1">
                      <button type="submit" disabled={driverStatus.loading}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition">
                        {driverStatus.loading ? 'Saving…' : 'Save Driver'}
                      </button>
                      <button type="button" onClick={cancelDriverForm}
                        className="text-gray-400 hover:text-white border border-gray-700 px-6 py-2.5 rounded-lg text-sm transition">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Edit Driver Form */}
              {editingDriver && (
                <div className="bg-[#111] border border-red-600/30 rounded-2xl p-6 mb-6">
                  <h3 className="text-white font-bold mb-5">Edit Driver — <span className="text-red-400">DRVR-{editingDriver.driverNo}</span></h3>
                  <form onSubmit={handleUpdateDriver} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Driver Name *</label>
                        <input value={driverForm.name} onChange={e => setDriverForm({ ...driverForm, name: e.target.value })}
                          placeholder="e.g. John Smith" required className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Driver Email *</label>
                        <input type="email" value={driverForm.email} onChange={e => setDriverForm({ ...driverForm, email: e.target.value })}
                          placeholder="e.g. john@example.com" required className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Assigned Vehicle</label>
                      {vehicles.length > 0 ? (
                        <select value={driverForm.assignedVehicle} onChange={e => setDriverForm({ ...driverForm, assignedVehicle: e.target.value })}
                          className={`${inputCls} cursor-pointer`}>
                          <option value="">— Unassigned —</option>
                          {vehicles.map(v => (
                            <option key={v._id} value={`${v.makeModel} (${v.licenseNo})`}>
                              {v.makeModel} — {v.licenseNo}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input value={driverForm.assignedVehicle} onChange={e => setDriverForm({ ...driverForm, assignedVehicle: e.target.value })}
                          placeholder="e.g. 2022 Ford F-150 (ABC-1234)" className={inputCls} />
                      )}
                    </div>
                    {driverStatus.error && (
                      <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">{driverStatus.error}</p>
                    )}
                    <div className="flex gap-3 pt-1">
                      <button type="submit" disabled={driverStatus.loading}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition">
                        {driverStatus.loading ? 'Updating…' : 'Update Driver'}
                      </button>
                      <button type="button" onClick={cancelDriverForm}
                        className="text-gray-400 hover:text-white border border-gray-700 px-6 py-2.5 rounded-lg text-sm transition">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Drivers List */}
              {driversLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-7 h-7 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : drivers.length === 0 ? (
                <div className="bg-[#111] border border-gray-800 rounded-xl px-6 py-12 text-center">
                  <FaUserTie className="text-gray-700 text-4xl mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No drivers added yet.</p>
                </div>
              ) : (
                <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr>
                        {['Driver No.', 'Name', 'Email', 'Assigned Vehicle', 'Actions'].map(h => (
                          <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 border-b border-gray-800">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {drivers.map(d => (
                        <tr key={d._id} className={`hover:bg-white/[0.02] ${editingDriver?._id === d._id ? 'bg-red-600/5' : ''}`}>
                          <td className="px-4 py-3 border-b border-gray-800/60">
                            <span className="font-mono font-bold text-red-400 text-sm">DRVR-{d.driverNo}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-white font-medium border-b border-gray-800/60">{d.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-400 border-b border-gray-800/60">{d.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-400 border-b border-gray-800/60">
                            {d.assignedVehicle || <span className="text-gray-600 italic">Unassigned</span>}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-800/60">
                            <div className="flex items-center gap-2">
                              <button onClick={() => startEditDriver(d)}
                                className="text-xs bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-600/30 px-2.5 py-1 rounded-lg transition flex items-center gap-1">
                                <FaEdit className="text-xs" /> Edit
                              </button>
                              <button onClick={() => handleDeleteDriver(d._id)}
                                className="text-xs bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 px-2.5 py-1 rounded-lg transition flex items-center gap-1">
                                <FaTrash className="text-xs" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Service Status Tab ── */}
          {tab === 'services' && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Service Status</h2>
              <p className="text-gray-400 text-sm mb-6">Track the status of your submitted service requests.</p>

              {requestsLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-7 h-7 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : myRequests.length === 0 ? (
                <div className="bg-[#111] border border-gray-800 rounded-xl px-6 py-12 text-center">
                  <FaListAlt className="text-gray-700 text-4xl mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No service requests yet.</p>
                  <button onClick={() => setTab('request')} className="mt-4 text-xs text-red-500 hover:text-red-400 underline">
                    Request your first service →
                  </button>
                </div>
              ) : (
                <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
                  <table className="w-full min-w-[680px]">
                    <thead>
                      <tr>
                        {['Appt #', 'Service', 'Type', 'Vehicle', 'Tire Size', 'Address', 'Phone', 'Appointment Date', 'Status'].map(h => (
                          <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 border-b border-gray-800">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {myRequests.map(req => (
                        <tr key={req._id} className={`hover:bg-white/2 ${!req.viewed ? 'bg-red-600/5' : ''}`}>
                          <td className="px-4 py-3 border-b border-gray-800/60">
                            <span className="font-mono font-bold text-red-400 text-sm">
                              #{req.apptNumber ?? '—'}
                            </span>
                            {!req.viewed && (
                              <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full align-middle" title="Status updated" />
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-200 border-b border-gray-800/60 font-medium">{req.service}</td>
                          <td className="px-4 py-3 border-b border-gray-800/60">
                            {req.serviceType ? (
                              <span className={`text-xs px-2 py-0.5 rounded border ${req.serviceType === 'Urgent Service' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                                {req.serviceType}
                              </span>
                            ) : '—'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-400 border-b border-gray-800/60">{req.vehicle || '—'}</td>
                          <td className="px-4 py-3 text-sm text-gray-400 border-b border-gray-800/60">{req.tireSize || '—'}</td>
                          <td className="px-4 py-3 text-sm text-gray-400 border-b border-gray-800/60 max-w-[160px] truncate">{req.address || '—'}</td>
                          <td className="px-4 py-3 text-sm text-gray-400 border-b border-gray-800/60">{req.phone || '—'}</td>
                          <td className="px-4 py-3 text-sm text-gray-400 border-b border-gray-800/60">
                            {new Date(req.appointmentDate).toLocaleString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric',
                              hour: '2-digit', minute: '2-digit',
                            })}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-800/60">
                            <ServiceStatusBadge status={req.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Request New Service Tab ── */}
          {tab === 'request' && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Book an Appointment</h2>
              <p className="text-gray-400 text-sm mb-6">Fill in the details below to request a new service.</p>

              <div className="bg-[#111] border border-gray-800 rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Row 1: Date + Vehicle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Appointment Date & Time *</label>
                      <input type="datetime-local" value={form.appointmentDate}
                        onChange={e => setForm({ ...form, appointmentDate: e.target.value })}
                        required className={`${inputCls} [color-scheme:dark]`} />
                      <p className="text-gray-600 text-xs mt-1">24/7 Hours</p>
                    </div>
                    <div>
                      <label className={labelCls}>Vehicle</label>
                      {vehiclesLoading ? (
                        <p className="text-gray-600 text-xs py-2">Loading vehicles…</p>
                      ) : vehicles.length > 0 ? (
                        <select value={form.vehicle} onChange={e => setForm({ ...form, vehicle: e.target.value })}
                          className={`${inputCls} cursor-pointer`}>
                          <option value="">Select a vehicle…</option>
                          {vehicles.map(v => (
                            <option key={v._id} value={`${v.makeModel} (${v.licenseNo})`}>
                              {v.makeModel} — {v.licenseNo}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="bg-[#0d0d0d] border border-gray-700 rounded-lg px-4 py-3 text-xs text-gray-500">
                          No vehicles added yet.{' '}
                          <button type="button" onClick={() => setTab('vehicles')} className="text-red-500 hover:underline">Add a vehicle →</button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Service + Service Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Select Service *</label>
                      <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                        required className={`${inputCls} cursor-pointer`}>
                        <option value="" disabled>Select a service...</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Service Type</label>
                      <select value={form.serviceType} onChange={e => setForm({ ...form, serviceType: e.target.value })}
                        className={`${inputCls} cursor-pointer`}>
                        <option value="">Select service type…</option>
                        <option value="Standard Service">Standard Service</option>
                        <option value="Urgent Service">Urgent Service</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Phone + Tire Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Phone Number</label>
                      <select
                        value={useCustomPhone ? '__custom__' : form.phone}
                        onChange={e => {
                          if (e.target.value === '__custom__') {
                            setUseCustomPhone(true);
                            setCustomPhone('');
                            setForm({ ...form, phone: '' });
                          } else {
                            setUseCustomPhone(false);
                            setCustomPhone('');
                            setForm({ ...form, phone: e.target.value });
                          }
                        }}
                        className={`${inputCls} cursor-pointer`}>
                        <option value="">Select phone number…</option>
                        {user.phone && <option value={user.phone}>{user.phone}</option>}
                        <option value="__custom__">Enter custom number…</option>
                      </select>
                      {useCustomPhone && (
                        <input value={customPhone}
                          onChange={e => { setCustomPhone(e.target.value); setForm({ ...form, phone: e.target.value }); }}
                          placeholder="Enter phone number…" className={`${inputCls} mt-2`} autoFocus />
                      )}
                    </div>
                    <div>
                      <label className={labelCls}>Tire Size</label>
                      <input value={form.tireSize || ''} onChange={e => setForm({ ...form, tireSize: e.target.value })}
                        placeholder="e.g. 235/65R17" className={inputCls} />
                    </div>
                  </div>

                  {/* Row 4: Address (full width) */}
                  <div>
                    <label className={labelCls}>Address</label>
                    <select
                      value={useCustomAddress ? '__custom__' : form.address}
                      onChange={e => {
                        if (e.target.value === '__custom__') {
                          setUseCustomAddress(true);
                          setCustomAddress('');
                          setForm({ ...form, address: '' });
                        } else {
                          setUseCustomAddress(false);
                          setCustomAddress('');
                          setForm({ ...form, address: e.target.value });
                        }
                      }}
                      className={`${inputCls} cursor-pointer`}>
                      <option value="">Select address…</option>
                      {user.address && <option value={user.address}>{user.address}</option>}
                      <option value="__custom__">Enter custom address…</option>
                    </select>
                    {useCustomAddress && (
                      <input value={customAddress}
                        onChange={e => { setCustomAddress(e.target.value); setForm({ ...form, address: e.target.value }); }}
                        placeholder="Enter full address…" className={`${inputCls} mt-2`} autoFocus />
                    )}
                  </div>

                  {status.success && (
                    <p className="text-green-400 text-sm text-center bg-green-400/10 border border-green-400/20 rounded-lg p-3">{status.success}</p>
                  )}
                  {status.error && (
                    <p className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3">{status.error}</p>
                  )}

                  <button type="submit" disabled={status.loading}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-lg transition tracking-wide uppercase text-sm">
                    {status.loading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ── Pending Invoices Tab ── */}
          {tab === 'pending-invoices' && (
            <div>
              <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                <FaFileInvoiceDollar className="text-red-500" /> Pending Invoices
              </h2>
              <p className="text-gray-400 text-sm mb-6">Invoices sent to you by XtremeMobileTire that require payment.</p>
              {invoicesLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : myInvoices.filter(i => i.status === 'pending').length === 0 ? (
                <div className="text-center py-20">
                  <FaFileInvoiceDollar className="text-gray-700 text-5xl mx-auto mb-3" />
                  <p className="text-gray-500">No pending invoices at this time.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myInvoices.filter(i => i.status === 'pending').map(inv => (
                    <div key={inv._id} className="bg-[#111] border border-yellow-600/30 rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-red-400">{inv.invoiceNumber}</span>
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded">Payment Pending</span>
                          </div>
                          <p className="text-white font-semibold">{inv.companyName}</p>
                          {inv.clientName && <p className="text-gray-400 text-sm">{inv.clientName}{inv.vehicleInfo ? ` — ${inv.vehicleInfo}` : ''}</p>}
                          <div className="flex gap-4 mt-2 text-xs text-gray-500">
                            <span>Issued: {inv.issueDate}</span>
                            <span>Due: {inv.dueDate}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-green-400">${(inv.grandTotal || 0).toFixed(2)}</p>
                          <p className="text-xs text-gray-500 mt-0.5">Grand Total</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-800 mt-4 pt-4">
                        <p className="text-sm text-gray-400 mb-3">
                          💳 Payment can be given through <span className="text-white font-medium">bank transfer</span> or online via Stripe below.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <button onClick={() => handlePayNow(inv)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg transition text-sm">
                            Pay Now — ${(inv.grandTotal || 0).toFixed(2)}
                          </button>
                          <button onClick={() => downloadInvoicePDF(inv, xtremeBlackLogo)}
                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg transition text-sm">
                            <FaDownload className="text-xs" /> Download PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Completed Invoices Tab ── */}
          {tab === 'completed-invoices' && (
            <div>
              <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                <FaCheckDouble className="text-green-500" /> Completed Invoices
              </h2>
              <p className="text-gray-400 text-sm mb-6">Invoices you have already paid.</p>
              {invoicesLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : myInvoices.filter(i => i.status === 'paid').length === 0 ? (
                <div className="text-center py-20">
                  <FaCheckDouble className="text-gray-700 text-5xl mx-auto mb-3" />
                  <p className="text-gray-500">No completed invoices yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myInvoices.filter(i => i.status === 'paid').map(inv => (
                    <div key={inv._id} className="bg-[#111] border border-green-600/20 rounded-2xl p-5">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-red-400">{inv.invoiceNumber}</span>
                            <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded">Payment Completed</span>
                          </div>
                          <p className="text-white font-semibold">{inv.companyName}</p>
                          <div className="flex gap-4 mt-1 text-xs text-gray-500">
                            <span>Issued: {inv.issueDate}</span>
                            <span>Paid: {inv.paidAt ? new Date(inv.paidAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</span>
                          </div>
                        </div>
                        <p className="text-xl font-black text-green-400">${(inv.grandTotal || 0).toFixed(2)}</p>
                      </div>
                      <div className="border-t border-gray-800 mt-4 pt-4">
                        <button onClick={() => downloadInvoicePDF(inv, xtremeBlackLogo)}
                          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition text-sm">
                          <FaDownload className="text-xs" /> Download PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* ── Pay Invoice Modal ── */}
      {payingInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={e => { if (e.target === e.currentTarget && payStep !== 'stripe') closePayModal(); }}>
          <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-md" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.8)' }}>

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-0.5">Invoice Payment</p>
                <h3 className="text-white font-bold text-lg">{payingInvoice.invoiceNumber}</h3>
              </div>
              {payStep !== 'stripe' && (
                <button onClick={closePayModal} className="text-gray-500 hover:text-red-400 transition text-2xl leading-none">×</button>
              )}
            </div>

            <div className="px-6 py-6">
              {payStep === 'info' && (
                <div>
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 mb-5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Company</span>
                      <span className="text-white font-medium">{payingInvoice.companyName}</span>
                    </div>
                    {payingInvoice.clientName && (
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Client</span>
                        <span className="text-white">{payingInvoice.clientName}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Due Date</span>
                      <span className="text-white">{payingInvoice.dueDate}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-800 mt-1">
                      <span className="text-gray-400 font-semibold">Grand Total</span>
                      <span className="text-green-400 font-black text-lg">${(payingInvoice.grandTotal || 0).toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-5">
                    💳 You can pay this invoice through <strong className="text-white">bank transfer</strong> or click below to pay securely via Stripe.
                  </p>
                  {payError && <p className="text-red-400 text-sm mb-3 bg-red-900/20 border border-red-600/20 rounded-lg p-3">{payError}</p>}
                  <button onClick={handleInitStripe} disabled={payLoading}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition">
                    {payLoading ? 'Loading…' : `Pay via Stripe — $${(payingInvoice.grandTotal || 0).toFixed(2)}`}
                  </button>
                </div>
              )}

              {payStep === 'stripe' && clientSecret && (
                <div>
                  <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-800">
                    <div>
                      <p className="text-xs text-gray-500">Invoice</p>
                      <p className="text-white font-medium">{payingInvoice.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-xl font-black text-red-500">${(payingInvoice.grandTotal || 0).toFixed(2)}</p>
                    </div>
                  </div>
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', variables: { colorPrimary: '#dc2626' } } }}>
                    <InvoiceCheckoutForm amount={payingInvoice.grandTotal} invoiceId={payingInvoice._id} onSuccess={handlePaymentSuccess} />
                  </Elements>
                </div>
              )}

              {payStep === 'success' && (
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">Payment Successful!</h3>
                  <p className="text-gray-400 text-sm mb-6">Invoice {payingInvoice.invoiceNumber} has been paid. It will now appear in your Completed Invoices.</p>
                  <button onClick={() => { closePayModal(); setTab('completed-invoices'); }}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl transition">
                    View Completed Invoices
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetDashboard;
