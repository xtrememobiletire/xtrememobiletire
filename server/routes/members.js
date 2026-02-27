const router = require('express').Router();
const Member = require('../models/Member');

// POST /api/members/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, website, vehicle, tireSize, password } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required.' });

    const existing = await Member.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: 'This email is already registered.' });

    const last = await Member.findOne({}, { memberId: 1 }).sort({ memberId: -1 });
    const memberId = last?.memberId ? last.memberId + 1 : 5124;

    const member = new Member({ memberId, name, email, phone, website, vehicle, tireSize, password });
    await member.save();

    res.status(201).json({ message: 'Membership request submitted! We will review and contact you shortly.' });
  } catch (err) {
    console.error('Member register error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
