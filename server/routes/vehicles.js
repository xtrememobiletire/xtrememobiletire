const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Vehicle = require('../models/Vehicle');

const authUser = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token.');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!['fleet', 'member'].includes(decoded.role)) throw new Error('Access denied.');
  return decoded;
};

// GET /api/vehicles/mine
router.get('/mine', async (req, res) => {
  try {
    const decoded = authUser(req);
    const vehicles = await Vehicle.find({ userId: decoded.id }).sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// POST /api/vehicles
router.post('/', async (req, res) => {
  try {
    const decoded = authUser(req);
    const { makeModel, licenseNo, vinNumber, tireSize } = req.body;
    if (!makeModel || !licenseNo) {
      return res.status(400).json({ message: 'Year/Make/Model and License No. are required.' });
    }
    const vehicle = new Vehicle({
      userId: decoded.id,
      userType: decoded.role,
      makeModel, licenseNo,
      vinNumber: vinNumber || '',
      tireSize:  tireSize  || '',
    });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/vehicles/:id
router.delete('/:id', async (req, res) => {
  try {
    const decoded = authUser(req);
    await Vehicle.findOneAndDelete({ _id: req.params.id, userId: decoded.id });
    res.json({ message: 'Vehicle deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
