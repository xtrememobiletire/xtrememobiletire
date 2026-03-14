const router  = require('express').Router();
const jwt      = require('jsonwebtoken');
const stripe   = require('stripe');
const adminAuth = require('../middleware/adminAuth');
const Invoice  = require('../models/Invoice');
const Fleet    = require('../models/Fleet');
const Member   = require('../models/Member');

// ── helper: decode user token (fleet or member) ──────────────────────
const authUser = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token.');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!['fleet', 'member'].includes(decoded.role)) throw new Error('Access denied.');
  return decoded;
};

// ═══════════════════════════════════════════════════════════════════════
//  ADMIN ROUTES
// ═══════════════════════════════════════════════════════════════════════

// GET /api/invoices/admin/users-list  — all fleets + members for send dropdown
router.get('/admin/users-list', adminAuth, async (req, res) => {
  try {
    const [fleets, members] = await Promise.all([
      Fleet.find({ status: 'approved' }).select('companyName companyEmail _id').sort({ companyName: 1 }),
      Member.find({ status: 'approved' }).select('name email _id').sort({ name: 1 }),
    ]);
    const users = [
      ...fleets.map(f  => ({ id: f._id, type: 'fleet',  name: f.companyName, email: f.companyEmail })),
      ...members.map(m => ({ id: m._id, type: 'member', name: m.name,        email: m.email })),
    ];
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/invoices/admin/all  — all invoices for admin view
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/invoices/admin/create  — create a draft invoice
router.post('/admin/create', adminAuth, async (req, res) => {
  try {
    const {
      invoiceNumber, companyName, issueDate, dueDate,
      driverName, clientName, vehicleInfo,
      items, subTotal, netTotal, tax, grandTotal,
    } = req.body;

    // Check duplicate invoice number
    const existing = await Invoice.findOne({ invoiceNumber });
    if (existing) return res.status(400).json({ message: 'Invoice number already exists.' });

    const invoice = new Invoice({
      invoiceNumber, companyName, issueDate, dueDate,
      driverName:  driverName  || '',
      clientName:  clientName  || '',
      vehicleInfo: vehicleInfo || '',
      items:       items       || [],
      subTotal:    subTotal    || 0,
      netTotal:    netTotal    || 0,
      tax:         tax         || 0,
      grandTotal:  grandTotal  || 0,
      status: 'draft',
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/invoices/admin/:id/send  — send draft invoice to a user
router.post('/admin/:id/send', adminAuth, async (req, res) => {
  try {
    const { recipientId, recipientType, recipientName, recipientEmail } = req.body;
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { recipientId, recipientType, recipientName, recipientEmail, status: 'pending' },
      { new: true }
    );
    if (!invoice) return res.status(404).json({ message: 'Invoice not found.' });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/invoices/admin/:id  — delete invoice
router.delete('/admin/:id', adminAuth, async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Invoice deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════
//  USER ROUTES  (fleet + member)
// ═══════════════════════════════════════════════════════════════════════

// GET /api/invoices/mine  — get invoices sent to current user
router.get('/mine', async (req, res) => {
  try {
    const decoded  = authUser(req);
    const invoices = await Invoice.find({ recipientId: decoded.id, status: { $in: ['pending', 'paid'] } }).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// POST /api/invoices/:id/create-payment  — create Stripe payment intent
router.post('/:id/create-payment', async (req, res) => {
  try {
    const decoded = authUser(req);
    const invoice = await Invoice.findOne({ _id: req.params.id, recipientId: decoded.id, status: 'pending' });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found or already paid.' });

    const stripeClient   = stripe(process.env.STRIPE_SECRET_KEY);
    const amountInCents  = Math.round(invoice.grandTotal * 100);

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount:      amountInCents,
      currency:    'usd',
      description: `Invoice ${invoice.invoiceNumber} — ${invoice.companyName}`,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret, amount: invoice.grandTotal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/invoices/:id/confirm-payment  — mark invoice as paid after Stripe success
router.post('/:id/confirm-payment', async (req, res) => {
  try {
    const decoded = authUser(req);
    const { paymentIntentId } = req.body;

    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, recipientId: decoded.id, status: 'pending' },
      { status: 'paid', stripePaymentIntentId: paymentIntentId || '', paidAt: new Date() },
      { new: true }
    );
    if (!invoice) return res.status(404).json({ message: 'Invoice not found or already paid.' });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
