const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
  userId:          { type: mongoose.Schema.Types.ObjectId, required: true },
  userType:        { type: String, enum: ['fleet', 'member'], required: true },
  userName:        { type: String, required: true },
  userEmail:       { type: String, required: true },
  vehicle:         { type: String, default: '' },
  service:         { type: String, required: true },
  appointmentDate: { type: String, required: true },
  status:          { type: String, default: 'Appointment Pending' },
}, { timestamps: true });

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);
