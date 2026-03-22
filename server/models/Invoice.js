const mongoose = require('mongoose');

const LineItemSchema = new mongoose.Schema({
  no:          { type: Number },
  description: { type: String, default: '' },
  price:       { type: Number, default: 0 },
  qty:         { type: Number, default: 1 },
  total:       { type: Number, default: 0 },
}, { _id: false });

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  companyName:   { type: String, required: true },
  issueDate:     { type: String, required: true },
  dueDate:       { type: String, required: true },
  driverName:    { type: String, default: '' },
  clientName:    { type: String, default: '' },
  clientPhone:   { type: String, default: '' },
  clientAddress: { type: String, default: '' },
  vehicleInfo:   { type: String, default: '' },
  items:         { type: [LineItemSchema], default: [] },
  subTotal:      { type: Number, default: 0 },
  netTotal:      { type: Number, default: 0 },
  tax:           { type: Number, default: 0 },
  taxPercent:    { type: Number, default: 0 },
  grandTotal:    { type: Number, default: 0 },

  // Set when admin sends to a user
  recipientId:    { type: mongoose.Schema.Types.ObjectId, default: null },
  recipientType:  { type: String, enum: ['fleet', 'member', ''], default: '' },
  recipientEmail: { type: String, default: '' },
  recipientName:  { type: String, default: '' },

  // Payment
  status:                 { type: String, enum: ['draft', 'pending', 'paid'], default: 'draft' },
  stripePaymentIntentId:  { type: String, default: '' },
  paymentMethod:          { type: String, default: '' },  // 'card' | 'cod' | 'etransfer'
  paidAt:                 { type: Date, default: null },
  customStatus:           { type: String, default: '' },  // admin-assigned status label
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
