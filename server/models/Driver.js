const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  driverNo:        { type: Number },
  fleetUserId:     { type: mongoose.Schema.Types.ObjectId, required: true },
  name:            { type: String, required: true },
  email:           { type: String, required: true },
  assignedVehicle: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Driver', DriverSchema);
