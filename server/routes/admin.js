const router = require('express').Router();
const adminAuth = require('../middleware/adminAuth');
const Fleet = require('../models/Fleet');
const Member = require('../models/Member');
const Booking = require('../models/Booking');
const Contact = require('../models/Contact');
const ServiceRequest = require('../models/ServiceRequest');
const CustomStatus = require('../models/CustomStatus');
const Vehicle = require('../models/Vehicle');

// All routes below require admin token

// ── Fleets ──
router.get('/fleets', adminAuth, async (req, res) => {
  const fleets = await Fleet.find().select('-password').sort({ createdAt: -1 });
  const counts = await Vehicle.aggregate([
    { $group: { _id: '$userId', count: { $sum: 1 } } }
  ]);
  const countMap = {};
  counts.forEach(c => { countMap[c._id.toString()] = c.count; });
  const result = fleets.map(f => ({
    ...f.toObject(),
    vehicleCount: countMap[f._id.toString()] || 0,
  }));
  res.json(result);
});

router.patch('/fleets/:id', adminAuth, async (req, res) => {
  const fleet = await Fleet.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).select('-password');
  res.json(fleet);
});

router.delete('/fleets/:id', adminAuth, async (req, res) => {
  await Fleet.findByIdAndDelete(req.params.id);
  res.json({ message: 'Fleet deleted' });
});

// ── Members ──
router.get('/members', adminAuth, async (req, res) => {
  const members = await Member.find().select('-password').sort({ createdAt: -1 });
  const counts = await Vehicle.aggregate([
    { $match: { userType: 'member' } },
    { $group: { _id: '$userId', count: { $sum: 1 } } }
  ]);
  const countMap = {};
  counts.forEach(c => { countMap[c._id.toString()] = c.count; });
  const result = members.map(m => ({
    ...m.toObject(),
    vehicleCount: countMap[m._id.toString()] || 0,
  }));
  res.json(result);
});

router.patch('/members/:id', adminAuth, async (req, res) => {
  const member = await Member.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).select('-password');
  res.json(member);
});

router.delete('/members/:id', adminAuth, async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ message: 'Member deleted' });
});

// ── Bookings ──
router.get('/bookings', adminAuth, async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

router.patch('/bookings/:id', adminAuth, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(booking);
});

router.delete('/bookings/:id', adminAuth, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Booking deleted' });
});

// ── Contacts ──
router.get('/contacts', adminAuth, async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

router.patch('/contacts/:id/read', adminAuth, async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(contact);
});

router.delete('/contacts/:id', adminAuth, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted' });
});

// ── Vehicles by user (admin view) ──
router.get('/vehicles/:userId', adminAuth, async (req, res) => {
  const vehicles = await Vehicle.find({ userId: req.params.userId }).sort({ createdAt: -1 });
  res.json(vehicles);
});

// ── Service Requests ──
router.get('/service-requests', adminAuth, async (req, res) => {
  const requests = await ServiceRequest.find().sort({ createdAt: -1 });
  res.json(requests);
});

router.patch('/service-requests/:id', adminAuth, async (req, res) => {
  const request = await ServiceRequest.findByIdAndUpdate(
    req.params.id, { status: req.body.status }, { new: true }
  );
  res.json(request);
});

router.delete('/service-requests/:id', adminAuth, async (req, res) => {
  await ServiceRequest.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service request deleted' });
});

// ── Custom Statuses ──
router.get('/custom-statuses', adminAuth, async (req, res) => {
  let statuses = await CustomStatus.find().sort({ createdAt: 1 });
  // Seed defaults on first use
  if (statuses.length === 0) {
    const defaults = ['Appointment Pending', 'Job Start', 'Appointment Confirmed', 'Appointment Booked'];
    await CustomStatus.insertMany(defaults.map(label => ({ label })));
    statuses = await CustomStatus.find().sort({ createdAt: 1 });
  }
  res.json(statuses);
});

router.post('/custom-statuses', adminAuth, async (req, res) => {
  const { label } = req.body;
  if (!label) return res.status(400).json({ message: 'Label required.' });
  const existing = await CustomStatus.findOne({ label });
  if (existing) return res.status(400).json({ message: 'Status already exists.' });
  const status = new CustomStatus({ label });
  await status.save();
  res.status(201).json(status);
});

router.delete('/custom-statuses/:id', adminAuth, async (req, res) => {
  await CustomStatus.findByIdAndDelete(req.params.id);
  res.json({ message: 'Custom status deleted' });
});

// ── Dashboard stats ──
router.get('/stats', adminAuth, async (req, res) => {
  const [fleets, members, bookings, contacts, serviceRequests] = await Promise.all([
    Fleet.countDocuments(),
    Member.countDocuments(),
    Booking.countDocuments(),
    Contact.countDocuments(),
    ServiceRequest.countDocuments(),
  ]);
  const pendingFleets    = await Fleet.countDocuments({ status: 'pending' });
  const pendingMembers   = await Member.countDocuments({ status: 'pending' });
  const pendingBookings  = await Booking.countDocuments({ status: 'pending' });
  const unreadContacts   = await Contact.countDocuments({ read: false });
  const pendingServices  = await ServiceRequest.countDocuments({ status: 'Appointment Pending' });

  res.json({ fleets, members, bookings, contacts, serviceRequests, pendingFleets, pendingMembers, pendingBookings, unreadContacts, pendingServices });
});

module.exports = router;
