const router = require('express').Router();
const Fleet = require('../models/Fleet');

// POST /api/fleet/register
router.post('/register', async (req, res) => {
  try {
    const { companyName, companyEmail, phone, address, vehicles, companyWebsite } = req.body;

    if (!companyEmail) return res.status(400).json({ message: 'Company email is required.' });

    const existing = await Fleet.findOne({ companyEmail: companyEmail.toLowerCase() });
    if (existing) return res.status(400).json({ message: 'This email is already registered.' });

    const fleet = new Fleet({ companyName, companyEmail, phone, address, vehicles: Number(vehicles), companyWebsite });
    await fleet.save();

    res.status(201).json({ message: 'Fleet registration submitted! We will review and contact you shortly.' });
  } catch (err) {
    console.error('Fleet register error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
