const router = require('express').Router();
const Member = require('../models/Member');

// POST /api/members/register
router.post('/register', async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await Member.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: 'This email is already registered.' });

    const member = new Member(req.body);
    await member.save();

    res.status(201).json({ message: 'Membership request submitted! We will review and contact you shortly.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;
