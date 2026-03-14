const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/fleet', require('./routes/fleet'));
app.use('/api/members', require('./routes/members'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/stripe', require('./routes/stripe'));
app.use('/api/service-requests', require('./routes/serviceRequests'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/invoices', require('./routes/invoices'));

// Health check
app.get('/', (req, res) => res.json({ message: 'XMT Backend Running' }));

// Backfill missing fleetId / memberId for records created before the field was added
async function backfillIds() {
  const Fleet  = require('./models/Fleet');
  const Member = require('./models/Member');

  const fleetsWithoutId  = await Fleet.find({ fleetId:  { $exists: false } }).sort({ createdAt: 1 });
  const membersWithoutId = await Member.find({ memberId: { $exists: false } }).sort({ createdAt: 1 });

  if (fleetsWithoutId.length) {
    const lastFleet = await Fleet.findOne({ fleetId: { $exists: true } }).sort({ fleetId: -1 });
    let nextId = lastFleet ? lastFleet.fleetId + 1 : 5124;
    for (const f of fleetsWithoutId) {
      await Fleet.updateOne({ _id: f._id }, { $set: { fleetId: nextId++ } });
    }
    console.log(`Backfilled fleetId for ${fleetsWithoutId.length} fleet(s)`);
  }

  if (membersWithoutId.length) {
    const lastMember = await Member.findOne({ memberId: { $exists: true } }).sort({ memberId: -1 });
    let nextId = lastMember ? lastMember.memberId + 1 : 5124;
    for (const m of membersWithoutId) {
      await Member.updateOne({ _id: m._id }, { $set: { memberId: nextId++ } });
    }
    console.log(`Backfilled memberId for ${membersWithoutId.length} member(s)`);
  }
}

// Connect MongoDB & start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Atlas connected');
    await backfillIds();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
