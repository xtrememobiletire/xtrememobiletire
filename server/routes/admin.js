const router = require('express').Router();
const adminAuth = require('../middleware/adminAuth');
const Fleet = require('../models/Fleet');
const Member = require('../models/Member');
const Booking = require('../models/Booking');
const Contact = require('../models/Contact');

// All routes below require admin token

// ── Fleets ──
router.get('/fleets', adminAuth, async (req, res) => {
  const fleets = await Fleet.find().select('-password').sort({ createdAt: -1 });
  res.json(fleets);
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
  res.json(members);
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

// ── Dashboard stats ──
router.get('/stats', adminAuth, async (req, res) => {
  const [fleets, members, bookings, contacts] = await Promise.all([
    Fleet.countDocuments(),
    Member.countDocuments(),
    Booking.countDocuments(),
    Contact.countDocuments(),
  ]);
  const pendingFleets = await Fleet.countDocuments({ status: 'pending' });
  const pendingMembers = await Member.countDocuments({ status: 'pending' });
  const pendingBookings = await Booking.countDocuments({ status: 'pending' });
  const unreadContacts = await Contact.countDocuments({ read: false });

  res.json({ fleets, members, bookings, contacts, pendingFleets, pendingMembers, pendingBookings, unreadContacts });
});

module.exports = router;
