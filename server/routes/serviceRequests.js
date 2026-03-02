const router = require('express').Router();
const jwt = require('jsonwebtoken');
const ServiceRequest = require('../models/ServiceRequest');
const Fleet = require('../models/Fleet');
const Member = require('../models/Member');

// POST /api/service-requests  — fleet or member submits a request
router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!['fleet', 'member'].includes(decoded.role)) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    let userName, userEmail;
    if (decoded.role === 'fleet') {
      const fleet = await Fleet.findById(decoded.id);
      if (!fleet) return res.status(404).json({ message: 'User not found.' });
      userName  = fleet.companyName;
      userEmail = fleet.companyEmail;
    } else {
      const member = await Member.findById(decoded.id);
      if (!member) return res.status(404).json({ message: 'User not found.' });
      userName  = member.name;
      userEmail = member.email;
    }

    const { vehicle, service, appointmentDate } = req.body;
    if (!service || !appointmentDate) {
      return res.status(400).json({ message: 'Service and appointment date are required.' });
    }

    const request = new ServiceRequest({
      userId: decoded.id,
      userType: decoded.role,
      userName,
      userEmail,
      vehicle: vehicle || '',
      service,
      appointmentDate,
    });
    await request.save();

    res.status(201).json({ message: 'Service request submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/service-requests/mine  — returns own requests for logged-in fleet/member
router.get('/mine', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!['fleet', 'member'].includes(decoded.role)) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    const requests = await ServiceRequest.find({ userId: decoded.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
