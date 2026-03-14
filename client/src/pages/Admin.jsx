import { useEffect, useState } from 'react';
import { FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash, FaCheck, FaTimes, FaCar, FaTrash, FaUserTie, FaFileInvoiceDollar, FaPlus, FaPaperPlane, FaChevronLeft, FaDownload, FaEye as FaEyeView, FaCheckDouble } from 'react-icons/fa';
import API from '../api';
import logo from '../assets/xtrememobiletire.webp';
import xtremeBlackLogo from '../assets/xtremeblack.png';
import { downloadInvoicePDF } from '../utils/invoiceUtils';

const STATUS_COLORS = {
  pending:   'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  approved:  'bg-green-500/20 text-green-400 border-green-500/30',
  rejected:  'bg-red-500/20 text-red-400 border-red-500/30',
  confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const Badge = ({ s }) => (
  <span className={`text-xs px-2 py-0.5 rounded border capitalize ${STATUS_COLORS[s] || 'bg-gray-700 text-gray-300'}`}>{s}</span>
);

const thCls = 'text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 border-b border-gray-800';
const tdCls = 'px-4 py-3 text-sm text-gray-300 border-b border-gray-800/60';
const inputCls = 'w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-4 py-3 rounded-lg text-sm outline-none transition';
const labelCls = 'block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide';

/* ── Invoice Preview Component ── */
const InvoicePreview = ({ form, items, tax, taxPercent, logo }) => {
  const subTotal   = items.reduce((s, i) => s + (parseFloat(i.price) || 0) * (parseFloat(i.qty) || 0), 0);
  const taxAmt     = parseFloat(tax) || 0;
  const grandTotal = subTotal + taxAmt;
  const taxPct     = parseFloat(taxPercent) || 0;

  // Pad to at least 5 rows
  const displayItems = [...items];
  while (displayItems.length < 5) displayItems.push({ no: '', description: '', price: '', qty: '' });

  return (
    <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-2xl" style={{ fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div className="flex justify-between items-start px-8 pt-8 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Invoice</h1>
          <p className="text-sm text-gray-500 mt-1">Invoice No # {form.invoiceNumber || '—'}</p>
        </div>
        <div>
          <img src={logo} alt="Xtreme Mobile Tire" className="h-16 w-auto object-contain" />
        </div>
      </div>

      {/* Info Row — 3 columns */}
      <div className="px-8 pb-5 grid grid-cols-3 gap-5 border-t border-b border-gray-200 py-4">
        {/* Client info */}
        <div>
          <p className="font-bold text-gray-900 text-sm">{form.clientName || form.companyName || '—'}</p>
          {form.companyName && form.clientName && form.companyName !== form.clientName && (
            <p className="text-xs text-gray-600 mt-0.5">{form.companyName}</p>
          )}
          {form.clientPhone   && <p className="text-xs text-gray-700 mt-0.5">{form.clientPhone}</p>}
          {form.clientAddress && <p className="text-xs text-gray-700 mt-0.5">{form.clientAddress}</p>}
          {form.driverName    && <p className="text-xs text-gray-600 mt-0.5">Driver: {form.driverName}</p>}
        </div>
        {/* Dates */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Issue Date</p>
            <p className="text-sm text-gray-800 font-medium mt-0.5">{form.issueDate || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Due Date</p>
            <p className="text-sm text-gray-800 font-medium mt-0.5">{form.dueDate || '—'}</p>
          </div>
        </div>
        {/* Company info */}
        <div>
          <p className="font-bold text-sm text-gray-900">XTREME MOBILE TIRE</p>
          <p className="text-xs text-gray-500 mt-0.5">857 Winterton Way, Mississauga</p>
          <p className="text-xs text-gray-500">ON L5V 1Z5 Canada</p>
          <p className="text-xs text-gray-600 mt-1.5">HST# 799787635RT001</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="px-8 pt-4 pb-2">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="text-center px-3 py-2 text-xs font-bold border border-gray-300 bg-gray-50 w-12">No</th>
              <th className="text-left px-3 py-2 text-xs font-bold border border-gray-300 bg-gray-50">Item Details</th>
              <th className="text-right px-3 py-2 text-xs font-bold border border-gray-300 bg-gray-50 w-24">Price</th>
              <th className="text-right px-3 py-2 text-xs font-bold border border-gray-300 bg-gray-50 w-16">Qty</th>
              <th className="text-right px-3 py-2 text-xs font-bold border border-gray-300 bg-gray-50 w-28">Total</th>
            </tr>
          </thead>
          <tbody>
            {displayItems.map((item, i) => (
              <tr key={i}>
                <td className="px-3 py-2.5 text-sm text-center text-gray-600 border border-gray-200">{item.no || ''}</td>
                <td className="px-3 py-2.5 text-sm text-gray-800 border border-gray-200">{item.description || ''}</td>
                <td className="px-3 py-2.5 text-sm text-gray-700 text-right border border-gray-200">
                  {item.price ? `$${(parseFloat(item.price) || 0).toFixed(2)}` : ''}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-700 text-right border border-gray-200">
                  {item.qty ? (parseFloat(item.qty) || 0) : ''}
                </td>
                <td className="px-3 py-2.5 text-sm font-medium text-gray-900 text-right border border-gray-200">
                  {item.price && item.qty ? `$${((parseFloat(item.price) || 0) * (parseFloat(item.qty) || 0)).toFixed(2)}` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="px-8 pt-2 pb-6 flex justify-end">
        <table className="border-collapse" style={{ width: '260px' }}>
          <tbody>
            <tr>
              <td className="py-1.5 px-3 text-sm text-gray-500 text-right border border-gray-200">Sub Total</td>
              <td className="py-1.5 px-3 text-sm text-right font-medium text-gray-800 border border-gray-200">${subTotal.toFixed(2)}</td>
            </tr>
            <tr className="bg-blue-50">
              <td className="py-1.5 px-3 text-sm text-gray-700 font-semibold text-right border border-blue-200">Net Total</td>
              <td className="py-1.5 px-3 text-sm text-right font-bold text-blue-700 border border-blue-200">${subTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="py-1.5 px-3 text-sm text-gray-500 text-right border border-gray-200">
                Total Tax{taxPct > 0 ? ` ${taxPct}%` : ''}
              </td>
              <td className="py-1.5 px-3 text-sm text-right font-medium text-gray-800 border border-gray-200">${taxAmt.toFixed(2)}</td>
            </tr>
            <tr className="bg-blue-50">
              <td className="py-1.5 px-3 text-sm font-bold text-gray-900 text-right border border-blue-200">Grand Total</td>
              <td className="py-1.5 px-3 text-sm text-right font-bold text-blue-700 border border-blue-200 text-base">${grandTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mx-8 border-t border-gray-200 pt-4 pb-3">
        <p className="text-xs font-bold text-gray-900 mb-1">Terms and Conditions</p>
        <p className="text-xs text-gray-500">
          Please Send payment via E-transfer or bank Transfer to:{' '}
          <span className="text-blue-600">Payments@Calltire.com</span>
        </p>
      </div>
      <div className="mx-8 border-t border-gray-100 py-3 text-center">
        <p className="text-xs text-gray-400">Assigned Code : {form.invoiceNumber || '—'} 2025 : XTREME Mobile -FixTire</p>
      </div>
    </div>
  );
};

/* ── Admin Login Form ── */
const AdminLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '' });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });
    try {
      const res = await API.post('/auth/login', form);
      if (res.data.role !== 'admin') {
        setStatus({ loading: false, error: 'Access denied. Admin accounts only.' });
        return;
      }
      localStorage.setItem('xmt_token', res.data.token);
      localStorage.setItem('xmt_role', res.data.role);
      localStorage.setItem('xmt_name', res.data.name);
      onLogin();
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || 'Login failed.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="Xtreme Mobile Tire" className="h-16 w-auto mx-auto mb-4 object-contain" />
          <p className="text-gray-500 text-sm mt-1">Sign in to access the dashboard</p>
        </div>
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-8" style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.5)' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelCls}>Email Address *</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                <input name="email" type="email" value={form.email} onChange={handle}
                  placeholder="Email address" required
                  className={`${inputCls} pl-10`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Password *</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handle}
                  placeholder="••••••••" required
                  className={`${inputCls} pl-10 pr-10`} />
                <button type="button" onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {status.error && <p className="text-red-400 text-sm text-center">{status.error}</p>}
            <button type="submit" disabled={status.loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-lg transition tracking-wide uppercase text-sm flex items-center justify-center gap-2">
              <FaArrowRight className="text-xs" /> {status.loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ── Admin Dashboard ── */
export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('xmt_role') === 'admin');
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Vehicle modal
  const [vehicleModal,        setVehicleModal]        = useState(null);
  const [vehicleModalData,    setVehicleModalData]    = useState([]);
  const [vehicleModalLoading, setVehicleModalLoading] = useState(false);

  const openVehicleModal = async (name, userId) => {
    setVehicleModal({ name, userId });
    setVehicleModalData([]);
    setVehicleModalLoading(true);
    try {
      const res = await API.get(`/admin/vehicles/${userId}`);
      setVehicleModalData(res.data);
    } catch { setVehicleModalData([]); }
    finally { setVehicleModalLoading(false); }
  };

  // Driver modal
  const [driverModal,        setDriverModal]        = useState(null);
  const [driverModalData,    setDriverModalData]    = useState([]);
  const [driverModalLoading, setDriverModalLoading] = useState(false);

  const openDriverModal = async (name, userId) => {
    setDriverModal({ name, userId });
    setDriverModalData([]);
    setDriverModalLoading(true);
    try {
      const res = await API.get(`/admin/drivers/${userId}`);
      setDriverModalData(res.data);
    } catch { setDriverModalData([]); }
    finally { setDriverModalLoading(false); }
  };

  // Service request detail modal
  const [reqDetail, setReqDetail] = useState(null);

  // Status management
  const [allStatuses,    setAllStatuses]    = useState([]);
  const [showStatusModal,setShowStatusModal]= useState(false);
  const [newStatusLabel, setNewStatusLabel] = useState('');
  const [statusAdding,   setStatusAdding]   = useState(false);

  // ── Invoice state ──
  const [invoiceView,    setInvoiceView]    = useState('list');   // 'list' | 'create'
  const [invoiceStep,    setInvoiceStep]    = useState(1);        // 1 | 2 | 3
  const [invoiceForm,    setInvoiceForm]    = useState({
    invoiceNumber: '', companyName: '', issueDate: '', dueDate: '',
    driverName: '', clientName: '', clientPhone: '', clientAddress: '', vehicleInfo: '',
  });
  const [invoiceItems,   setInvoiceItems]   = useState([{ no: 1, description: '', price: '', qty: '', total: 0 }]);
  const [invoiceTax,     setInvoiceTax]     = useState('');
  const [allInvoices,    setAllInvoices]    = useState([]);
  const [invoicesLoading,setInvoicesLoading]= useState(false);
  const [usersList,      setUsersList]      = useState([]);
  const [usersLoading,   setUsersLoading]   = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [invoiceGenBusy, setInvoiceGenBusy] = useState(false);
  const [invoiceSendBusy,setInvoiceSendBusy]= useState(false);
  const [invoiceError,   setInvoiceError]   = useState('');
  const [viewingInvoice, setViewingInvoice] = useState(null); // invoice preview modal

  const loadStatuses = () =>
    API.get('/admin/custom-statuses').then(r => setAllStatuses(r.data)).catch(() => {});

  // ── Invoice helpers ──
  const loadAllInvoices = async () => {
    setInvoicesLoading(true);
    try   { const r = await API.get('/invoices/admin/all'); setAllInvoices(r.data); }
    catch { setAllInvoices([]); }
    finally { setInvoicesLoading(false); }
  };

  const loadUsersList = async () => {
    setUsersLoading(true);
    try   { const r = await API.get('/invoices/admin/users-list'); setUsersList(r.data); }
    catch { setUsersList([]); }
    finally { setUsersLoading(false); }
  };

  const invoiceSubTotal   = invoiceItems.reduce((s, i) => s + (parseFloat(i.price) || 0) * (parseFloat(i.qty) || 0), 0);
  const invoiceTaxPct     = parseFloat(invoiceTax) || 0;
  const invoiceTaxAmt     = invoiceSubTotal * (invoiceTaxPct / 100);
  const invoiceGrandTotal = invoiceSubTotal + invoiceTaxAmt;

  const updateInvoiceItem = (idx, field, val) =>
    setInvoiceItems(prev => prev.map((item, i) => i === idx ? { ...item, [field]: val } : item));

  const addInvoiceItem = () =>
    setInvoiceItems(prev => [...prev, { no: prev.length + 1, description: '', price: '', qty: '', total: 0 }]);

  const removeInvoiceItem = (idx) =>
    setInvoiceItems(prev => prev.filter((_, i) => i !== idx).map((item, i) => ({ ...item, no: i + 1 })));

  const resetInvoiceForm = () => {
    setInvoiceForm({ invoiceNumber: '', companyName: '', issueDate: '', dueDate: '', driverName: '', clientName: '', clientPhone: '', clientAddress: '', vehicleInfo: '' });
    setInvoiceItems([{ no: 1, description: '', price: '', qty: '', total: 0 }]);
    setInvoiceTax('');
    setSelectedUserId('');
    setInvoiceError('');
    setInvoiceStep(1);
  };

  const handleGeneratePreview = () => {
    setInvoiceError('');
    const { invoiceNumber, companyName, issueDate, dueDate } = invoiceForm;
    if (!invoiceNumber || !companyName || !issueDate || !dueDate) {
      setInvoiceError('Please fill in Invoice #, Company Name, Issue Date and Due Date.');
      return;
    }
    setInvoiceStep(2);
  };

  const handleSendInvoice = async () => {
    if (!selectedUserId) { setInvoiceError('Please select a recipient.'); return; }
    setInvoiceSendBusy(true);
    setInvoiceError('');
    try {
      const user = usersList.find(u => u.id === selectedUserId);
      const createRes = await API.post('/invoices/admin/create', {
        ...invoiceForm,
        items: invoiceItems.map(item => ({
          ...item,
          price: parseFloat(item.price) || 0,
          qty:   parseFloat(item.qty)   || 0,
          total: (parseFloat(item.price) || 0) * (parseFloat(item.qty) || 0),
        })),
        subTotal:   invoiceSubTotal,
        netTotal:   invoiceSubTotal,
        tax:        invoiceTaxAmt,
        taxPercent: invoiceTaxPct,
        grandTotal: invoiceGrandTotal,
      });
      await API.post(`/invoices/admin/${createRes.data._id}/send`, {
        recipientId:    user.id,
        recipientType:  user.type,
        recipientName:  user.name,
        recipientEmail: user.email,
      });
      setInvoiceView('list');
      resetInvoiceForm();
      loadAllInvoices();
    } catch (err) {
      setInvoiceError(err.response?.data?.message || 'Failed to send invoice.');
    } finally {
      setInvoiceSendBusy(false);
    }
  };

  const deleteInvoice = async (id) => {
    if (!confirm('Delete this invoice?')) return;
    await API.delete(`/invoices/admin/${id}`);
    setAllInvoices(prev => prev.filter(inv => inv._id !== id));
  };

  // Load stats + invoice counts when logged in
  useEffect(() => {
    if (!isAdmin) return;
    API.get('/admin/stats').then(r => setStats(r.data)).catch(() => {});
    loadAllInvoices(); // preload for sidebar badge counts
  }, [isAdmin]);

  // Load tab data
  const INVOICE_TABS = ['invoices', 'admin-pending', 'admin-completed'];
  useEffect(() => {
    if (!isAdmin || tab === 'dashboard' || INVOICE_TABS.includes(tab)) return;
    setLoading(true);
    API.get(`/admin/${tab}`)
      .then(r => setData(r.data))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
    if (tab === 'service-requests') loadStatuses();
  }, [tab, isAdmin]);

  // Load invoices for any invoice tab
  useEffect(() => {
    if (!isAdmin || !INVOICE_TABS.includes(tab)) return;
    loadAllInvoices();
  }, [tab, isAdmin]);

  const handleAddStatus = async () => {
    if (!newStatusLabel.trim()) return;
    setStatusAdding(true);
    try {
      const res = await API.post('/admin/custom-statuses', { label: newStatusLabel.trim() });
      setAllStatuses(prev => [...prev, res.data]);
      setNewStatusLabel('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add status.');
    } finally {
      setStatusAdding(false);
    }
  };

  const handleDeleteStatus = async (id) => {
    await API.delete(`/admin/custom-statuses/${id}`);
    setAllStatuses(prev => prev.filter(s => s._id !== id));
  };

  const updateStatus = async (id, status) => {
    await API.patch(`/admin/${tab}/${id}`, { status });
    setData(prev => prev.map(item => item._id === id ? { ...item, status } : item));
    API.get('/admin/stats').then(r => setStats(r.data));
  };

  const deleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    await API.delete(`/admin/${tab}/${id}`);
    setData(prev => prev.filter(item => item._id !== id));
    API.get('/admin/stats').then(r => setStats(r.data));
  };

  const markRead = async (id) => {
    await API.patch(`/admin/contacts/${id}/read`);
    setData(prev => prev.map(item => item._id === id ? { ...item, read: true } : item));
  };

  const logout = () => {
    localStorage.removeItem('xmt_token');
    localStorage.removeItem('xmt_role');
    localStorage.removeItem('xmt_name');
    setIsAdmin(false);
    setTab('dashboard');
    setStats(null);
    setData([]);
  };

  // Show login form if not authenticated
  if (!isAdmin) {
    return <AdminLogin onLogin={() => setIsAdmin(true)} />;
  }

  const TABS = [
    { key: 'dashboard',        label: 'Dashboard' },
    { key: 'bookings',         label: 'Bookings' },
    { key: 'contacts',         label: 'Messages' },
    { key: 'fleets',           label: 'Fleet Signups' },
    { key: 'members',          label: 'Members' },
    { key: 'service-requests', label: 'Services' },
    { key: 'invoices',         label: 'Invoices' },
    { key: 'admin-pending',    label: 'Pending Invoices' },
    { key: 'admin-completed',  label: 'Completed Invoices' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">

      {/* Top Nav */}
      <header className="bg-[#111] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Xtreme Mobile Tire" className="h-9 w-auto object-contain" />
        </div>
        <button onClick={logout} className="text-xs text-gray-400 hover:text-red-400 transition border border-gray-700 hover:border-red-600 px-3 py-1.5 rounded">
          Logout
        </button>
      </header>

      <div className="flex flex-1">

        {/* Sidebar */}
        <aside className="w-56 bg-[#111] border-r border-gray-800 flex-shrink-0">
          <nav className="p-4 space-y-1">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                  tab === t.key ? 'bg-red-600 text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.label}
                {t.key === 'bookings' && stats?.pendingBookings > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">{stats.pendingBookings}</span>
                )}
                {t.key === 'contacts' && stats?.unreadContacts > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">{stats.unreadContacts}</span>
                )}
                {t.key === 'fleets' && stats?.pendingFleets > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">{stats.pendingFleets}</span>
                )}
                {t.key === 'members' && stats?.pendingMembers > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">{stats.pendingMembers}</span>
                )}
                {t.key === 'service-requests' && stats?.pendingServices > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">{stats.pendingServices}</span>
                )}
                {t.key === 'admin-pending' && allInvoices.filter(i => i.status === 'pending').length > 0 && (
                  <span className="ml-2 bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {allInvoices.filter(i => i.status === 'pending').length}
                  </span>
                )}
                {t.key === 'admin-completed' && allInvoices.filter(i => i.status === 'paid').length > 0 && (
                  <span className="ml-2 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {allInvoices.filter(i => i.status === 'paid').length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 overflow-auto">

          {/* Dashboard */}
          {tab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Bookings',    value: stats?.bookings,        pending: stats?.pendingBookings,  color: 'border-blue-600' },
                  { label: 'Messages',          value: stats?.contacts,        pending: stats?.unreadContacts,   color: 'border-purple-600' },
                  { label: 'Fleet Signups',     value: stats?.fleets,          pending: stats?.pendingFleets,    color: 'border-orange-600' },
                  { label: 'Members',           value: stats?.members,         pending: stats?.pendingMembers,   color: 'border-green-600' },
                  { label: 'Service Requests',  value: stats?.serviceRequests, pending: stats?.pendingServices,  color: 'border-red-600' },
                ].map(card => (
                  <div key={card.label} className={`bg-[#111] border-l-4 ${card.color} border border-gray-800 rounded-xl p-5`}>
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">{card.label}</p>
                    <p className="text-3xl font-bold">{card.value ?? '—'}</p>
                    {card.pending > 0 && (
                      <p className="text-xs text-yellow-400 mt-1">{card.pending} pending</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings */}
          {tab === 'bookings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Bookings ({data.length})</h2>
              {loading ? <p className="text-gray-500">Loading...</p> : (
                <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr>
                        {['Name','Email','Phone','Service','Date','Tire Size','Status','Actions'].map(h => (
                          <th key={h} className={thCls}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(b => (
                        <tr key={b._id} className="hover:bg-white/2">
                          <td className={tdCls}>{b.fullName}</td>
                          <td className={tdCls}>{b.email}</td>
                          <td className={tdCls}>{b.phone}</td>
                          <td className={tdCls}>{b.service}</td>
                          <td className={tdCls}>{b.schedule}</td>
                          <td className={tdCls}>{b.tireSize || '—'}</td>
                          <td className={tdCls}><Badge s={b.status} /></td>
                          <td className={tdCls}>
                            <div className="flex gap-1 flex-wrap">
                              {b.status === 'pending' && <>
                                <button onClick={() => updateStatus(b._id, 'confirmed')} className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded">Confirm</button>
                                <button onClick={() => updateStatus(b._id, 'cancelled')} className="text-xs bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded">Cancel</button>
                              </>}
                              {b.status === 'confirmed' && (
                                <button onClick={() => updateStatus(b._id, 'completed')} className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded">Complete</button>
                              )}
                              <button onClick={() => deleteItem(b._id)} className="text-xs bg-red-600/80 hover:bg-red-700 px-2 py-1 rounded">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {!data.length && <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-600">No bookings yet.</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Contacts */}
          {tab === 'contacts' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Messages ({data.length})</h2>
              {loading ? <p className="text-gray-500">Loading...</p> : (
                <div className="space-y-3">
                  {data.map(c => (
                    <div key={c._id} className={`bg-[#111] border rounded-xl p-5 ${c.read ? 'border-gray-800' : 'border-red-600/40'}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">{c.name}</span>
                            {!c.read && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">New</span>}
                          </div>
                          <p className="text-xs text-gray-500 mb-1">{c.email} {c.phone && `· ${c.phone}`}</p>
                          {c.subject && <p className="text-xs text-gray-400 font-medium mb-2">Subject: {c.subject}</p>}
                          <p className="text-sm text-gray-300">{c.message}</p>
                          <p className="text-xs text-gray-600 mt-2">{new Date(c.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          {!c.read && <button onClick={() => markRead(c._id)} className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">Mark Read</button>}
                          <button onClick={() => deleteItem(c._id)} className="text-xs bg-red-600/80 hover:bg-red-700 px-2 py-1 rounded">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!data.length && <p className="text-gray-600 text-center py-8">No messages yet.</p>}
                </div>
              )}
            </div>
          )}

          {/* Fleets */}
          {tab === 'fleets' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Fleet Signups ({data.length})</h2>
              {loading ? <p className="text-gray-500">Loading...</p> : (
                <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr>
                        {['Fleet ID','Company','Email','Phone','Address','Vehicles','Drivers','Status','Actions'].map(h => (
                          <th key={h} className={thCls}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(f => (
                        <tr key={f._id} className="hover:bg-white/2">
                          <td className={tdCls}>
                            <span className="font-mono font-bold text-red-400">XMT-{f.fleetId ?? '—'}</span>
                          </td>
                          <td className={tdCls}>
                            <div>{f.companyName}</div>
                            {f.companyWebsite && <a href={f.companyWebsite} target="_blank" rel="noreferrer" className="text-xs text-red-400 hover:underline">{f.companyWebsite}</a>}
                          </td>
                          <td className={tdCls}>{f.companyEmail}</td>
                          <td className={tdCls}>{f.phone}</td>
                          <td className={tdCls}>{f.address}</td>
                          <td className={tdCls}>{f.vehicleCount ?? 0}</td>
                          <td className={tdCls}>
                            <button
                              onClick={() => openDriverModal(f.companyName, f._id)}
                              className="font-bold text-white hover:text-red-400 transition underline-offset-2 hover:underline"
                              title="View Drivers"
                            >
                              {f.driverCount ?? 0}
                            </button>
                          </td>
                          <td className={tdCls}><Badge s={f.status} /></td>
                          <td className={tdCls}>
                            <div className="flex gap-1.5 items-center">
                              {f.status !== 'approved' && (
                                <button onClick={() => updateStatus(f._id, 'approved')} title="Approve"
                                  className="w-7 h-7 flex items-center justify-center bg-green-600 hover:bg-green-700 rounded transition">
                                  <FaCheck className="text-white text-xs" />
                                </button>
                              )}
                              {f.status !== 'rejected' && (
                                <button onClick={() => updateStatus(f._id, 'rejected')} title="Reject"
                                  className="w-7 h-7 flex items-center justify-center bg-gray-600 hover:bg-gray-700 rounded transition">
                                  <FaTimes className="text-white text-xs" />
                                </button>
                              )}
                              <button onClick={() => openVehicleModal(f.companyName, f._id)} title="View Vehicles"
                                className="w-7 h-7 flex items-center justify-center bg-blue-600/80 hover:bg-blue-700 rounded transition">
                                <FaCar className="text-white text-xs" />
                              </button>
                              <button onClick={() => openDriverModal(f.companyName, f._id)} title="View Drivers"
                                className="w-7 h-7 flex items-center justify-center bg-purple-600/80 hover:bg-purple-700 rounded transition">
                                <FaUserTie className="text-white text-xs" />
                              </button>
                              <button onClick={() => deleteItem(f._id)} title="Delete"
                                className="w-7 h-7 flex items-center justify-center bg-red-600/80 hover:bg-red-700 rounded transition">
                                <FaTrash className="text-white text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {!data.length && <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-600">No fleet signups yet.</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Members */}
          {tab === 'members' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Members ({data.length})</h2>
              {loading ? <p className="text-gray-500">Loading...</p> : (
                <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
                  <table className="w-full min-w-[750px]">
                    <thead>
                      <tr>
                        {['Member ID','Name','Email','Phone','Vehicles','Status','Actions'].map(h => (
                          <th key={h} className={thCls}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(m => (
                        <tr key={m._id} className="hover:bg-white/2">
                          <td className={tdCls}>
                            <span className="font-mono font-bold text-red-400">XMT-{m.memberId ?? '—'}</span>
                          </td>
                          <td className={tdCls}>{m.name}</td>
                          <td className={tdCls}>{m.email}</td>
                          <td className={tdCls}>{m.phone}</td>
                          <td className={tdCls}><span className="font-bold text-white">{m.vehicleCount ?? 0}</span></td>
                          <td className={tdCls}><Badge s={m.status} /></td>
                          <td className={tdCls}>
                            <div className="flex gap-1.5 items-center">
                              {m.status !== 'approved' && (
                                <button onClick={() => updateStatus(m._id, 'approved')} title="Approve"
                                  className="w-7 h-7 flex items-center justify-center bg-green-600 hover:bg-green-700 rounded transition">
                                  <FaCheck className="text-white text-xs" />
                                </button>
                              )}
                              {m.status !== 'rejected' && (
                                <button onClick={() => updateStatus(m._id, 'rejected')} title="Reject"
                                  className="w-7 h-7 flex items-center justify-center bg-gray-600 hover:bg-gray-700 rounded transition">
                                  <FaTimes className="text-white text-xs" />
                                </button>
                              )}
                              <button onClick={() => openVehicleModal(m.name, m._id)} title="View Vehicles"
                                className="w-7 h-7 flex items-center justify-center bg-blue-600/80 hover:bg-blue-700 rounded transition">
                                <FaCar className="text-white text-xs" />
                              </button>
                              <button onClick={() => deleteItem(m._id)} title="Delete"
                                className="w-7 h-7 flex items-center justify-center bg-red-600/80 hover:bg-red-700 rounded transition">
                                <FaTrash className="text-white text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {!data.length && <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-600">No members yet.</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Service Requests */}
          {tab === 'service-requests' && (
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-2xl font-bold">Service Requests ({data.length})</h2>
                <button
                  onClick={() => { setShowStatusModal(true); setNewStatusLabel(''); }}
                  className="flex items-center gap-1.5 text-xs bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-semibold"
                >
                  <span className="text-base leading-none">+</span> Custom Status
                </button>
              </div>

              {/* Requests Table */}
              {loading ? <p className="text-gray-500">Loading...</p> : (
                <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr>
                        {['Name', 'Type', 'Email', 'Vehicle', 'Service', 'Svc Type', 'Tire Size', 'Address', 'Phone', 'Date & Time', 'Status', 'Actions'].map(h => (
                          <th key={h} className={thCls}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(req => (
                        <tr key={req._id} className="hover:bg-white/5 cursor-pointer" onClick={() => setReqDetail(req)}>
                          <td className={tdCls}>{req.userName}</td>
                          <td className={tdCls}>
                            <span className={`text-xs px-2 py-0.5 rounded border capitalize ${
                              req.userType === 'fleet'
                                ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                                : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            }`}>{req.userType}</span>
                          </td>
                          <td className={tdCls}>{req.userEmail}</td>
                          <td className={tdCls}>{req.vehicle || '—'}</td>
                          <td className={tdCls}>{req.service}</td>
                          <td className={tdCls}>
                            {req.serviceType ? (
                              <span className={`text-xs px-2 py-0.5 rounded border ${req.serviceType === 'Urgent Service' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                                {req.serviceType}
                              </span>
                            ) : '—'}
                          </td>
                          <td className={tdCls}>{req.tireSize || '—'}</td>
                          <td className={tdCls}>{req.address || '—'}</td>
                          <td className={tdCls}>{req.phone || '—'}</td>
                          <td className={tdCls}>
                            {req.appointmentDate
                              ? new Date(req.appointmentDate).toLocaleString('en-US', {
                                  month: 'short', day: 'numeric', year: 'numeric',
                                  hour: '2-digit', minute: '2-digit',
                                })
                              : '—'}
                          </td>
                          <td className={tdCls} onClick={e => e.stopPropagation()}>
                            <select
                              value={req.status}
                              onChange={e => updateStatus(req._id, e.target.value)}
                              className="bg-[#0a0a0a] border border-gray-700 text-gray-300 text-xs rounded-lg px-2 py-1.5 outline-none focus:border-red-600 transition cursor-pointer"
                            >
                              {allStatuses.map(s => (
                                <option key={s._id} value={s.label}>{s.label}</option>
                              ))}
                            </select>
                          </td>
                          <td className={tdCls} onClick={e => e.stopPropagation()}>
                            <button
                              onClick={() => deleteItem(req._id)}
                              className="text-xs bg-red-600/80 hover:bg-red-700 px-2 py-1 rounded"
                            >Delete</button>
                          </td>
                        </tr>
                      ))}
                      {!data.length && (
                        <tr><td colSpan={12} className="px-4 py-8 text-center text-gray-600">No service requests yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ── Status Modal ── */}
              {showStatusModal && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
                  onClick={e => { if (e.target === e.currentTarget) setShowStatusModal(false); }}
                >
                  <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-md p-6"
                    style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.7)' }}>

                    {/* Modal header */}
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-white font-bold text-lg">Manage Statuses</h3>
                      <button
                        onClick={() => setShowStatusModal(false)}
                        className="text-gray-500 hover:text-red-400 transition text-xl leading-none"
                      >×</button>
                    </div>

                    {/* All statuses list */}
                    <div className="space-y-2 mb-5 max-h-64 overflow-y-auto pr-1">
                      {allStatuses.length === 0 && (
                        <p className="text-gray-600 text-sm text-center py-4">No statuses yet.</p>
                      )}
                      {allStatuses.map(s => (
                        <div key={s._id} className="flex items-center justify-between bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5">
                          <span className="text-gray-300 text-sm">{s.label}</span>
                          <button
                            onClick={() => handleDeleteStatus(s._id)}
                            className="text-xs bg-red-600/80 hover:bg-red-700 text-white px-2.5 py-1 rounded transition ml-3"
                          >Delete</button>
                        </div>
                      ))}
                    </div>

                    {/* Add new status */}
                    <div className="border-t border-gray-800 pt-4">
                      <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Add New Status</p>
                      <div className="flex gap-2">
                        <input
                          value={newStatusLabel}
                          onChange={e => setNewStatusLabel(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleAddStatus()}
                          placeholder="Status name…"
                          autoFocus
                          className="flex-1 bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-3 py-2 rounded-lg text-sm outline-none transition"
                        />
                        <button
                          onClick={handleAddStatus}
                          disabled={statusAdding}
                          className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                        >
                          {statusAdding ? '…' : 'Add'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Invoices ── */}
          {tab === 'invoices' && (
            <div>
              {invoiceView === 'list' ? (
                /* All Invoices List */
                <div>
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <FaFileInvoiceDollar className="text-red-500" /> Invoices ({allInvoices.length})
                    </h2>
                    <button
                      onClick={() => { setInvoiceView('create'); resetInvoiceForm(); }}
                      className="flex items-center gap-1.5 text-xs bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-semibold"
                    >
                      <FaPlus /> New Invoice
                    </button>
                  </div>

                  {invoicesLoading ? <p className="text-gray-500">Loading...</p> : (
                    <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
                      <table className="w-full min-w-[900px]">
                        <thead>
                          <tr>
                            {['Invoice #','Company','Client','Issue Date','Due Date','Grand Total','Status','Sent To','Actions'].map(h => (
                              <th key={h} className={thCls}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {allInvoices.map(inv => (
                            <tr key={inv._id} className="hover:bg-white/5 cursor-pointer" onClick={() => setViewingInvoice(inv)}>
                              <td className={tdCls}><span className="font-mono font-bold text-red-400">{inv.invoiceNumber}</span></td>
                              <td className={tdCls}>{inv.companyName}</td>
                              <td className={tdCls}>{inv.clientName || '—'}</td>
                              <td className={tdCls}>{inv.issueDate}</td>
                              <td className={tdCls}>{inv.dueDate}</td>
                              <td className={tdCls}><span className="font-bold text-green-400">${(inv.grandTotal || 0).toFixed(2)}</span></td>
                              <td className={tdCls}>
                                <span className={`text-xs px-2 py-0.5 rounded border capitalize ${
                                  inv.status === 'paid'    ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                  inv.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                  'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                }`}>{inv.status === 'paid' ? 'Payment Completed' : inv.status}</span>
                              </td>
                              <td className={tdCls}>{inv.recipientName || <span className="text-gray-600 italic">Not sent</span>}</td>
                              <td className={tdCls} onClick={e => e.stopPropagation()}>
                                <div className="flex gap-1">
                                  <button onClick={() => downloadInvoicePDF(inv, xtremeBlackLogo)} title="Download PDF"
                                    className="text-xs bg-blue-600/80 hover:bg-blue-700 px-2 py-1 rounded flex items-center gap-1">
                                    <FaDownload className="text-xs" />
                                  </button>
                                  <button onClick={() => deleteInvoice(inv._id)} className="text-xs bg-red-600/80 hover:bg-red-700 px-2 py-1 rounded">Delete</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {!allInvoices.length && (
                            <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-600">No invoices yet. Click "New Invoice" to create one.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                /* Invoice Creator — 3-step stepper */
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => { setInvoiceView('list'); resetInvoiceForm(); }}
                      className="text-gray-400 hover:text-white transition p-1.5 rounded-lg hover:bg-white/5">
                      <FaChevronLeft />
                    </button>
                    <h2 className="text-2xl font-bold">Create Invoice</h2>
                  </div>

                  {/* Step indicators */}
                  <div className="flex items-center mb-8">
                    {[
                      { n: 1, label: 'Fill Details' },
                      { n: 2, label: 'Preview' },
                      { n: 3, label: 'Send' },
                    ].map(({ n, label }, i) => (
                      <div key={n} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
                          invoiceStep >= n ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-500'
                        }`}>{n}</div>
                        <span className={`ml-2 text-sm font-medium transition ${invoiceStep >= n ? 'text-white' : 'text-gray-500'}`}>{label}</span>
                        {i < 2 && <div className={`w-12 h-px mx-3 transition ${invoiceStep > n ? 'bg-red-600' : 'bg-gray-700'}`} />}
                      </div>
                    ))}
                  </div>

                  {invoiceError && (
                    <div className="mb-4 bg-red-600/10 border border-red-600/30 text-red-400 text-sm px-4 py-3 rounded-lg">{invoiceError}</div>
                  )}

                  {/* ── STEP 1: Form ── */}
                  {invoiceStep === 1 && (
                    <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
                      <div className="grid grid-cols-2 gap-5 mb-6">
                        <div>
                          <label className={labelCls}>Invoice Number *</label>
                          <input value={invoiceForm.invoiceNumber}
                            onChange={e => setInvoiceForm(p => ({ ...p, invoiceNumber: e.target.value }))}
                            placeholder="e.g. INV-001"
                            className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Company Name *</label>
                          <input value={invoiceForm.companyName}
                            onChange={e => setInvoiceForm(p => ({ ...p, companyName: e.target.value }))}
                            placeholder="Client company name"
                            className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Issue Date *</label>
                          <input type="date" value={invoiceForm.issueDate}
                            onChange={e => setInvoiceForm(p => ({ ...p, issueDate: e.target.value }))}
                            className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Due Date *</label>
                          <input type="date" value={invoiceForm.dueDate}
                            onChange={e => setInvoiceForm(p => ({ ...p, dueDate: e.target.value }))}
                            className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Client Name</label>
                          <input value={invoiceForm.clientName}
                            onChange={e => setInvoiceForm(p => ({ ...p, clientName: e.target.value }))}
                            placeholder="e.g. Mr. John Smith"
                            className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Client Phone</label>
                          <input value={invoiceForm.clientPhone}
                            onChange={e => setInvoiceForm(p => ({ ...p, clientPhone: e.target.value }))}
                            placeholder="e.g. (416) 555-0123"
                            className={inputCls} />
                        </div>
                        <div className="col-span-2">
                          <label className={labelCls}>Client Address</label>
                          <input value={invoiceForm.clientAddress}
                            onChange={e => setInvoiceForm(p => ({ ...p, clientAddress: e.target.value }))}
                            placeholder="e.g. 123 Main St, Toronto ON Canada"
                            className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Driver Name <span className="text-gray-600 normal-case">(optional)</span></label>
                          <input value={invoiceForm.driverName}
                            onChange={e => setInvoiceForm(p => ({ ...p, driverName: e.target.value }))}
                            placeholder="Driver name (optional)"
                            className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Year / Make & Model <span className="text-gray-600 normal-case">(optional)</span></label>
                          <input value={invoiceForm.vehicleInfo}
                            onChange={e => setInvoiceForm(p => ({ ...p, vehicleInfo: e.target.value }))}
                            placeholder="e.g. 2022 Ford F-150"
                            className={inputCls} />
                        </div>
                      </div>

                      {/* Services / Line Items */}
                      <div className="border-t border-gray-800 pt-5 mb-5">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-gray-300 text-sm font-semibold uppercase tracking-wide">Services</p>
                          <button onClick={addInvoiceItem}
                            className="flex items-center gap-1 text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition font-semibold">
                            <FaPlus className="text-xs" /> Add Row
                          </button>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[640px]">
                            <thead>
                              <tr className="border-b border-gray-700">
                                {['No.','Item Details','Price ($)','Qty','Total',''].map(h => (
                                  <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {invoiceItems.map((item, i) => (
                                <tr key={i} className="border-b border-gray-800/50">
                                  <td className="px-3 py-2 text-sm text-gray-500 w-10">{item.no}</td>
                                  <td className="px-3 py-2 w-1/3">
                                    <input value={item.description}
                                      onChange={e => updateInvoiceItem(i, 'description', e.target.value)}
                                      placeholder="Item description"
                                      className="w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-3 py-2 rounded text-sm outline-none transition" />
                                  </td>
                                  <td className="px-3 py-2 w-24">
                                    <input type="number" min="0" step="0.01" value={item.price}
                                      onChange={e => updateInvoiceItem(i, 'price', e.target.value)}
                                      placeholder="0.00"
                                      className="w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-3 py-2 rounded text-sm outline-none transition" />
                                  </td>
                                  <td className="px-3 py-2 w-16">
                                    <input type="number" min="0" step="1" value={item.qty}
                                      onChange={e => updateInvoiceItem(i, 'qty', e.target.value)}
                                      placeholder="1"
                                      className="w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-3 py-2 rounded text-sm outline-none transition" />
                                  </td>
                                  <td className="px-3 py-2 text-sm font-medium text-green-400 w-24">
                                    ${((parseFloat(item.price) || 0) * (parseFloat(item.qty) || 0)).toFixed(2)}
                                  </td>
                                  <td className="px-3 py-2">
                                    {invoiceItems.length > 1 && (
                                      <button onClick={() => removeInvoiceItem(i)}
                                        className="text-gray-600 hover:text-red-400 transition text-lg leading-none">×</button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Totals */}
                      <div className="flex justify-end">
                        <div className="w-64 space-y-2">
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>Sub Total</span>
                            <span className="text-white font-medium">${invoiceSubTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>Net Total</span>
                            <span className="text-white font-medium">${invoiceSubTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-400">
                            <span>Tax %</span>
                            <div className="flex items-center gap-1">
                              <input type="number" min="0" max="100" step="0.5" value={invoiceTax}
                                onChange={e => setInvoiceTax(e.target.value)}
                                placeholder="0"
                                className="w-20 bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-2 py-1 rounded text-sm outline-none transition text-right" />
                              <span className="text-gray-500">%</span>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Tax Amount</span>
                            <span>${invoiceTaxAmt.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-700">
                            <span className="text-white">Grand Total</span>
                            <span className="text-red-400 text-lg">${invoiceGrandTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Generate Button */}
                      <div className="mt-6 flex justify-end">
                        <button onClick={handleGeneratePreview}
                          disabled={invoiceGenBusy}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold px-8 py-3 rounded-lg transition">
                          {invoiceGenBusy ? 'Generating...' : 'Generate Invoice →'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2: Preview ── */}
                  {invoiceStep === 2 && (
                    <div>
                      <div className="max-w-3xl mx-auto">
                        <InvoicePreview form={invoiceForm} items={invoiceItems} tax={invoiceTaxAmt} taxPercent={invoiceTaxPct} logo={xtremeBlackLogo} />
                      </div>
                      <div className="flex items-center justify-between mt-6 max-w-3xl mx-auto">
                        <button onClick={() => setInvoiceStep(1)}
                          className="flex items-center gap-2 text-gray-400 hover:text-white transition border border-gray-700 hover:border-gray-500 px-4 py-2.5 rounded-lg text-sm">
                          <FaChevronLeft className="text-xs" /> Back to Edit
                        </button>
                        <button onClick={() => { setInvoiceStep(3); loadUsersList(); }}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg transition">
                          <FaPaperPlane className="text-xs" /> Send To →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 3: Send ── */}
                  {invoiceStep === 3 && (
                    <div className="max-w-xl mx-auto">
                      <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
                        <h3 className="text-white font-bold text-lg mb-1">Send Invoice</h3>
                        <p className="text-gray-500 text-sm mb-5">Select a registered user to send this invoice to.</p>

                        {usersLoading ? (
                          <div className="flex items-center justify-center py-10">
                            <div className="w-7 h-7 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                          </div>
                        ) : usersList.length === 0 ? (
                          <p className="text-gray-600 text-center py-6 text-sm">No approved users found.</p>
                        ) : (
                          <div className="space-y-2 max-h-80 overflow-y-auto pr-1 mb-5">
                            {usersList.map(u => (
                              <label key={u.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                                selectedUserId === u.id
                                  ? 'border-red-600 bg-red-600/10'
                                  : 'border-gray-800 hover:border-gray-600 bg-[#0a0a0a]'
                              }`}>
                                <input type="radio" name="recipient" value={u.id}
                                  checked={selectedUserId === u.id}
                                  onChange={() => setSelectedUserId(u.id)}
                                  className="accent-red-600" />
                                <div className="flex-1">
                                  <p className="text-white text-sm font-medium">{u.name}</p>
                                  <p className="text-gray-500 text-xs">{u.email}</p>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded border capitalize ${
                                  u.type === 'fleet'
                                    ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                                    : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                }`}>{u.type}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                          <button onClick={() => setInvoiceStep(2)}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm">
                            <FaChevronLeft className="text-xs" /> Back
                          </button>
                          <button onClick={handleSendInvoice}
                            disabled={invoiceSendBusy || !selectedUserId}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg transition text-sm">
                            {invoiceSendBusy ? 'Sending...' : <><FaPaperPlane className="text-xs" /> Send Invoice</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── Admin Pending Invoices Tab ── */}
          {tab === 'admin-pending' && (
            <div>
              <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                <FaFileInvoiceDollar className="text-yellow-500" /> Pending Invoices ({allInvoices.filter(i => i.status === 'pending').length})
              </h2>
              <p className="text-gray-400 text-sm mb-6">Invoices sent to users awaiting payment.</p>
              {invoicesLoading ? <p className="text-gray-500">Loading...</p> : (
                <div className="space-y-4">
                  {allInvoices.filter(i => i.status === 'pending').length === 0 ? (
                    <div className="text-center py-20">
                      <FaFileInvoiceDollar className="text-gray-700 text-5xl mx-auto mb-3" />
                      <p className="text-gray-500">No pending invoices.</p>
                    </div>
                  ) : allInvoices.filter(i => i.status === 'pending').map(inv => (
                    <div key={inv._id} className="bg-[#111] border border-yellow-600/30 rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-red-400">{inv.invoiceNumber}</span>
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded">Payment Pending</span>
                          </div>
                          <p className="text-white font-semibold">{inv.companyName}</p>
                          {inv.clientName && <p className="text-gray-400 text-sm">{inv.clientName}{inv.vehicleInfo ? ` — ${inv.vehicleInfo}` : ''}</p>}
                          <div className="flex gap-4 mt-2 text-xs text-gray-500">
                            <span>Issued: {inv.issueDate}</span>
                            <span>Due: {inv.dueDate}</span>
                            <span>Sent to: <span className="text-gray-300">{inv.recipientName || '—'}</span></span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-green-400">${(inv.grandTotal || 0).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-800 mt-4 pt-4 flex gap-2">
                        <button onClick={() => setViewingInvoice(inv)}
                          className="flex items-center gap-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition">
                          <FaEyeView className="text-xs" /> View Invoice
                        </button>
                        <button onClick={() => downloadInvoicePDF(inv, xtremeBlackLogo)}
                          className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition">
                          <FaDownload className="text-xs" /> Download PDF
                        </button>
                        <button onClick={() => deleteInvoice(inv._id)}
                          className="flex items-center gap-1.5 text-xs bg-red-600/80 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition ml-auto">
                          <FaTrash className="text-xs" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Admin Completed Invoices Tab ── */}
          {tab === 'admin-completed' && (
            <div>
              <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                <FaCheckDouble className="text-green-500" /> Completed Invoices ({allInvoices.filter(i => i.status === 'paid').length})
              </h2>
              <p className="text-gray-400 text-sm mb-6">Invoices that have been paid by users.</p>
              {invoicesLoading ? <p className="text-gray-500">Loading...</p> : (
                <div className="space-y-3">
                  {allInvoices.filter(i => i.status === 'paid').length === 0 ? (
                    <div className="text-center py-20">
                      <FaCheckDouble className="text-gray-700 text-5xl mx-auto mb-3" />
                      <p className="text-gray-500">No completed invoices yet.</p>
                    </div>
                  ) : allInvoices.filter(i => i.status === 'paid').map(inv => (
                    <div key={inv._id} className="bg-[#111] border border-green-600/20 rounded-2xl p-5">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-red-400">{inv.invoiceNumber}</span>
                            <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded">Payment Completed</span>
                          </div>
                          <p className="text-white font-semibold">{inv.companyName}</p>
                          <div className="flex gap-4 mt-1 text-xs text-gray-500">
                            <span>Issued: {inv.issueDate}</span>
                            <span>Paid: {inv.paidAt ? new Date(inv.paidAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</span>
                            <span>Paid by: <span className="text-gray-300">{inv.recipientName || '—'}</span></span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black text-green-400">${(inv.grandTotal || 0).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-800 mt-4 pt-4 flex gap-2">
                        <button onClick={() => setViewingInvoice(inv)}
                          className="flex items-center gap-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition">
                          <FaEyeView className="text-xs" /> View Invoice
                        </button>
                        <button onClick={() => downloadInvoicePDF(inv, xtremeBlackLogo)}
                          className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition">
                          <FaDownload className="text-xs" /> Download PDF
                        </button>
                        <button onClick={() => deleteInvoice(inv._id)}
                          className="flex items-center gap-1.5 text-xs bg-red-600/80 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition ml-auto">
                          <FaTrash className="text-xs" /> Delete
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

      {/* ── Invoice View Modal ── */}
      {viewingInvoice && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={e => { if (e.target === e.currentTarget) setViewingInvoice(null); }}>
          <div className="w-full max-w-3xl my-8">
            {/* Modal Actions */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-white font-bold text-lg">{viewingInvoice.invoiceNumber}</p>
              <div className="flex gap-2">
                <button onClick={() => downloadInvoicePDF(viewingInvoice, xtremeBlackLogo)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg transition text-sm">
                  <FaDownload /> Download PDF
                </button>
                <button onClick={() => setViewingInvoice(null)}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition text-sm">
                  Close
                </button>
              </div>
            </div>
            {/* Invoice Preview */}
            <InvoicePreview
              form={{
                invoiceNumber: viewingInvoice.invoiceNumber,
                companyName:   viewingInvoice.companyName,
                issueDate:     viewingInvoice.issueDate,
                dueDate:       viewingInvoice.dueDate,
                driverName:    viewingInvoice.driverName,
                clientName:    viewingInvoice.clientName,
                clientPhone:   viewingInvoice.clientPhone,
                clientAddress: viewingInvoice.clientAddress,
                vehicleInfo:   viewingInvoice.vehicleInfo,
              }}
              items={viewingInvoice.items || []}
              tax={viewingInvoice.tax || 0}
              taxPercent={viewingInvoice.taxPercent || 0}
              logo={xtremeBlackLogo}
            />
          </div>
        </div>
      )}

      {/* ── Service Request Detail Modal ── */}
      {reqDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.80)' }}
          onClick={e => { if (e.target === e.currentTarget) setReqDetail(null); }}
        >
          <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.7)' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-0.5">Service Request</p>
                <h3 className="text-white font-bold text-lg">
                  Appt #{reqDetail.apptNumber ?? '—'} — {reqDetail.userName}
                </h3>
              </div>
              <button onClick={() => setReqDetail(null)}
                className="text-gray-500 hover:text-red-400 transition text-2xl leading-none">×</button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-6">

              {/* User Info */}
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">User Info</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3">
                    <p className="text-gray-500 text-xs mb-1">Name</p>
                    <p className="text-white text-sm font-medium">{reqDetail.userName}</p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3">
                    <p className="text-gray-500 text-xs mb-1">Type</p>
                    <span className={`text-xs px-2 py-0.5 rounded border capitalize ${
                      reqDetail.userType === 'fleet'
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}>{reqDetail.userType}</span>
                  </div>
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3">
                    <p className="text-gray-500 text-xs mb-1">Email</p>
                    <p className="text-white text-sm">{reqDetail.userEmail}</p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3">
                    <p className="text-gray-500 text-xs mb-1">Phone</p>
                    <p className="text-white text-sm">{reqDetail.phone || '—'}</p>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Service Info</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3">
                    <p className="text-gray-500 text-xs mb-1">Service</p>
                    <p className="text-white text-sm font-medium">{reqDetail.service}</p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3">
                    <p className="text-gray-500 text-xs mb-1">Service Type</p>
                    {reqDetail.serviceType ? (
                      <span className={`text-xs px-2 py-0.5 rounded border ${reqDetail.serviceType === 'Urgent Service' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                        {reqDetail.serviceType}
                      </span>
                    ) : <p className="text-gray-500 text-sm">—</p>}
                  </div>
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3">
                    <p className="text-gray-500 text-xs mb-1">Vehicle</p>
                    <p className="text-white text-sm">{reqDetail.vehicle || '—'}</p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3">
                    <p className="text-gray-500 text-xs mb-1">Tire Size</p>
                    <p className="text-white text-sm">{reqDetail.tireSize || '—'}</p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3 col-span-2">
                    <p className="text-gray-500 text-xs mb-1">Address</p>
                    <p className="text-white text-sm">{reqDetail.address || '—'}</p>
                  </div>
                </div>
              </div>

              {/* Appointment Info */}
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Appointment</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3">
                    <p className="text-gray-500 text-xs mb-1">Date & Time</p>
                    <p className="text-white text-sm">
                      {reqDetail.appointmentDate
                        ? new Date(reqDetail.appointmentDate).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                          })
                        : '—'}
                    </p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3">
                    <p className="text-gray-500 text-xs mb-1">Submitted</p>
                    <p className="text-white text-sm">
                      {new Date(reqDetail.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Status</p>
                <div className="flex items-center gap-3">
                  <select
                    value={reqDetail.status}
                    onChange={e => {
                      updateStatus(reqDetail._id, e.target.value);
                      setReqDetail({ ...reqDetail, status: e.target.value });
                    }}
                    className="bg-[#0a0a0a] border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-red-600 transition cursor-pointer"
                  >
                    {allStatuses.map(s => (
                      <option key={s._id} value={s.label}>{s.label}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => { deleteItem(reqDetail._id); setReqDetail(null); }}
                    className="text-xs bg-red-600/80 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition"
                  >Delete Request</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Driver Modal ── */}
      {driverModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={e => { if (e.target === e.currentTarget) setDriverModal(null); }}
        >
          <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-2xl"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.7)' }}>

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <FaUserTie className="text-red-500" /> Drivers
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">{driverModal.name}</p>
              </div>
              <button
                onClick={() => setDriverModal(null)}
                className="text-xs bg-red-600/80 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition"
              >Close</button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {driverModalLoading ? (
                <div className="flex items-center justify-center py-10">
                  <div className="w-7 h-7 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : driverModalData.length === 0 ? (
                <p className="text-gray-600 text-center py-8 text-sm">No drivers registered yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        {['Driver No.', 'Name', 'Email', 'Assigned Vehicle', 'Added'].map(h => (
                          <th key={h} className={thCls}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {driverModalData.map(d => (
                        <tr key={d._id} className="hover:bg-white/2">
                          <td className={tdCls}><span className="font-mono font-bold text-red-400">DRVR-{d.driverNo}</span></td>
                          <td className={tdCls}><span className="font-medium text-white">{d.name}</span></td>
                          <td className={tdCls}>{d.email}</td>
                          <td className={tdCls}>{d.assignedVehicle || <span className="text-gray-600 italic">Unassigned</span>}</td>
                          <td className={tdCls}>{new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Vehicle Modal ── */}
      {vehicleModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={e => { if (e.target === e.currentTarget) setVehicleModal(null); }}
        >
          <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-2xl"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.7)' }}>

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div>
                <h3 className="text-white font-bold text-lg">Vehicles</h3>
                <p className="text-gray-500 text-xs mt-0.5">{vehicleModal.name}</p>
              </div>
              <button
                onClick={() => setVehicleModal(null)}
                className="text-xs bg-red-600/80 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition"
              >Close</button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {vehicleModalLoading ? (
                <div className="flex items-center justify-center py-10">
                  <div className="w-7 h-7 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : vehicleModalData.length === 0 ? (
                <p className="text-gray-600 text-center py-8 text-sm">No vehicles registered yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead>
                      <tr>
                        {['Year / Make & Model', 'License No.', 'VIN Number', 'Tire Size', 'Added'].map(h => (
                          <th key={h} className={thCls}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {vehicleModalData.map(v => (
                        <tr key={v._id} className="hover:bg-white/2">
                          <td className={tdCls}><span className="font-medium text-white">{v.makeModel}</span></td>
                          <td className={tdCls}>{v.licenseNo}</td>
                          <td className={tdCls}>{v.vinNumber || '—'}</td>
                          <td className={tdCls}>{v.tireSize  || '—'}</td>
                          <td className={tdCls}>{new Date(v.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
