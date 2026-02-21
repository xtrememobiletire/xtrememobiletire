const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, lowercase: true },
  phone:    { type: String, required: true },
  schedule: { type: String, required: true },
  service:  { type: String, required: true },
  tireSize: { type: String, default: '' },
  status:   { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
