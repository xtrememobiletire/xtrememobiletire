const mongoose = require('mongoose');

const CustomStatusSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  type:  { type: String, enum: ['service_request', 'invoice'], default: 'service_request' },
}, { timestamps: true });

module.exports = mongoose.model('CustomStatus', CustomStatusSchema);
