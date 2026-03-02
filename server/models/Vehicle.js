const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, required: true },
  userType:   { type: String, enum: ['fleet', 'member'], required: true },
  makeModel:  { type: String, required: true },
  licenseNo:  { type: String, required: true },
  vinNumber:  { type: String, default: '' },
  tireSize:   { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
