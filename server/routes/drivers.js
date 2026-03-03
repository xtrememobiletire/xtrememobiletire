const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Driver = require('../models/Driver');

const authFleet = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token.' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'fleet') return res.status(403).json({ message: 'Fleet only.' });
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// GET /api/drivers/mine
router.get('/mine', authFleet, async (req, res) => {
  const drivers = await Driver.find({ fleetUserId: req.userId }).sort({ driverNo: 1 });
  res.json(drivers);
});

// POST /api/drivers
router.post('/', authFleet, async (req, res) => {
  try {
    const { name, email, assignedVehicle } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required.' });

    // Auto-increment driverNo per fleet
    const last = await Driver.findOne({ fleetUserId: req.userId }).sort({ driverNo: -1 });
    const driverNo = last?.driverNo ? last.driverNo + 1 : 1;

    const driver = new Driver({ driverNo, fleetUserId: req.userId, name, email, assignedVehicle: assignedVehicle || '' });
    await driver.save();
    res.status(201).json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/drivers/:id
router.put('/:id', authFleet, async (req, res) => {
  try {
    const { name, email, assignedVehicle } = req.body;
    const driver = await Driver.findOneAndUpdate(
      { _id: req.params.id, fleetUserId: req.userId },
      { name, email, assignedVehicle: assignedVehicle || '' },
      { new: true }
    );
    if (!driver) return res.status(404).json({ message: 'Driver not found.' });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/drivers/:id
router.delete('/:id', authFleet, async (req, res) => {
  await Driver.findOneAndDelete({ _id: req.params.id, fleetUserId: req.userId });
  res.json({ message: 'Driver deleted.' });
});

module.exports = router;
