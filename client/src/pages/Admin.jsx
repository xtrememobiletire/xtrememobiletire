import { useEffect, useState } from 'react';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import API from '../api';
import logo from '../assets/xtrememobiletire.webp';

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

/* ── Admin Login Form ── */
const AdminLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
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
                <input name="password" type="password" value={form.password} onChange={handle}
                  placeholder="••••••••" required
                  className={`${inputCls} pl-10`} />
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

  // Load stats when logged in
  useEffect(() => {
    if (!isAdmin) return;
    API.get('/admin/stats').then(r => setStats(r.data)).catch(() => {});
  }, [isAdmin]);

  // Load tab data
  useEffect(() => {
    if (!isAdmin || tab === 'dashboard') return;
    setLoading(true);
    API.get(`/admin/${tab}`)
      .then(r => setData(r.data))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [tab, isAdmin]);

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
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'bookings',  label: 'Bookings' },
    { key: 'contacts',  label: 'Messages' },
    { key: 'fleets',    label: 'Fleet Signups' },
    { key: 'members',   label: 'Members' },
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
                  { label: 'Total Bookings', value: stats?.bookings, pending: stats?.pendingBookings, color: 'border-blue-600' },
                  { label: 'Messages', value: stats?.contacts, pending: stats?.unreadContacts, color: 'border-purple-600' },
                  { label: 'Fleet Signups', value: stats?.fleets, pending: stats?.pendingFleets, color: 'border-orange-600' },
                  { label: 'Members', value: stats?.members, pending: stats?.pendingMembers, color: 'border-green-600' },
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
                        {['Company','Email','Phone','Address','Vehicles','Status','Actions'].map(h => (
                          <th key={h} className={thCls}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(f => (
                        <tr key={f._id} className="hover:bg-white/2">
                          <td className={tdCls}>
                            <div>{f.companyName}</div>
                            {f.companyWebsite && <a href={f.companyWebsite} target="_blank" rel="noreferrer" className="text-xs text-red-400 hover:underline">{f.companyWebsite}</a>}
                          </td>
                          <td className={tdCls}>{f.companyEmail}</td>
                          <td className={tdCls}>{f.phone}</td>
                          <td className={tdCls}>{f.address}</td>
                          <td className={tdCls}>{f.vehicles}</td>
                          <td className={tdCls}><Badge s={f.status} /></td>
                          <td className={tdCls}>
                            <div className="flex gap-1 flex-wrap">
                              {f.status !== 'approved' && <button onClick={() => updateStatus(f._id, 'approved')} className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded">Approve</button>}
                              {f.status !== 'rejected' && <button onClick={() => updateStatus(f._id, 'rejected')} className="text-xs bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded">Reject</button>}
                              <button onClick={() => deleteItem(f._id)} className="text-xs bg-red-600/80 hover:bg-red-700 px-2 py-1 rounded">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {!data.length && <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-600">No fleet signups yet.</td></tr>}
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
                        {['Name','Email','Phone','Vehicle','Tire Size','Status','Actions'].map(h => (
                          <th key={h} className={thCls}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(m => (
                        <tr key={m._id} className="hover:bg-white/2">
                          <td className={tdCls}>{m.name}</td>
                          <td className={tdCls}>{m.email}</td>
                          <td className={tdCls}>{m.phone}</td>
                          <td className={tdCls}>{m.vehicle}</td>
                          <td className={tdCls}>{m.tireSize || '—'}</td>
                          <td className={tdCls}><Badge s={m.status} /></td>
                          <td className={tdCls}>
                            <div className="flex gap-1 flex-wrap">
                              {m.status !== 'approved' && <button onClick={() => updateStatus(m._id, 'approved')} className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded">Approve</button>}
                              {m.status !== 'rejected' && <button onClick={() => updateStatus(m._id, 'rejected')} className="text-xs bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded">Reject</button>}
                              <button onClick={() => deleteItem(m._id)} className="text-xs bg-red-600/80 hover:bg-red-700 px-2 py-1 rounded">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {!data.length && <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-600">No members yet.</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
