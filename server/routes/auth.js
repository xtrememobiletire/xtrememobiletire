const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Fleet = require('../models/Fleet');
const Member = require('../models/Member');

// POST /api/auth/login  (fleet or member login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });

    // Check admin first
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, role: 'admin', name: 'Admin' });
    }

    // Check fleet
    let user = await Fleet.findOne({ companyEmail: email.toLowerCase() });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials.' });
      if (user.status !== 'approved') return res.status(403).json({ message: 'Your account is pending approval.' });
      const token = jwt.sign({ role: 'fleet', id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, role: 'fleet', name: user.companyName });
    }

    // Check member
    user = await Member.findOne({ email: email.toLowerCase() });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials.' });
      if (user.status !== 'approved') return res.status(403).json({ message: 'Your account is pending approval.' });
      const token = jwt.sign({ role: 'member', id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, role: 'member', name: user.name });
    }

    return res.status(401).json({ message: 'Invalid credentials.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// GET /api/auth/me  — returns current user profile from token
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === 'fleet') {
      const user = await Fleet.findById(decoded.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found.' });
      return res.json({ ...user.toObject(), role: 'fleet' });
    }
    if (decoded.role === 'member') {
      const user = await Member.findById(decoded.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found.' });
      return res.json({ ...user.toObject(), role: 'member' });
    }
    if (decoded.role === 'admin') {
      return res.json({ role: 'admin', name: 'Admin', email: decoded.email });
    }
    return res.status(401).json({ message: 'Invalid token.' });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
});

module.exports = router;
