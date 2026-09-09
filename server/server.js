const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection caching for serverless & local development
let connPromise = null;

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

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  if (!process.env.MONGO_URI) {
    console.error('ERROR: MONGO_URI environment variable is missing!');
    throw new Error('MONGO_URI is not set in environment variables');
  }
  if (!connPromise) {
    connPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    }).then(async () => {
      console.log('MongoDB Atlas connected');
      try {
        await mongoose.connection.collection('customstatuses').dropIndex('label_1');
      } catch { /* index may not exist, ignore */ }
      await backfillIds();
    }).catch((err) => {
      connPromise = null;
      throw err;
    });
  }
  await connPromise;
}

// Database connection middleware - MUST run before routes!
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection error:', err.message);
    res.status(500).json({ error: 'Database connection failed: ' + err.message });
  }
});

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
app.get('/', (req, res) => res.json({ 
  message: 'XMT Backend Running', 
  dbConnected: mongoose.connection.readyState === 1 
}));

// Start local server if run directly (node server.js / nodemon)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    });
}

module.exports = app;
