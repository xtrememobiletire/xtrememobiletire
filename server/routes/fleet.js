const router = require('express').Router();
const Fleet = require('../models/Fleet');

// POST /api/fleet/register
router.post('/register', async (req, res) => {
  try {
    const { companyEmail } = req.body;

    const existing = await Fleet.findOne({ companyEmail: companyEmail.toLowerCase() });
    if (existing) return res.status(400).json({ message: 'This email is already registered.' });

    const fleet = new Fleet(req.body);
    await fleet.save();

    res.status(201).json({ message: 'Fleet registration submitted! We will review and contact you shortly.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;
