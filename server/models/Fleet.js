const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const FleetSchema = new mongoose.Schema({
  companyName:    { type: String, required: true },
  companyWebsite: { type: String, default: '' },
  companyEmail:   { type: String, required: true, unique: true, lowercase: true },
  phone:          { type: String, required: true },
  address:        { type: String, required: true },
  vehicles:       { type: Number, required: true },
  password:       { type: String, default: '' },
  status:         { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

// Hash password before save
FleetSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Fleet', FleetSchema);
