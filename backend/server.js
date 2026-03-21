const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
console.log('====================================');
console.log('   EMS PRO BACKEND - VERSION 2.0   ');
console.log('====================================');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Load Routes
const authRoutes = require('./routes/authRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

// Database Connection
console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI ? 'URI set in .env' : 'Using Local Fallback');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/EMS', {
  dbName: 'EMS'
})
  .then(() => {
    console.log('MongoDB Connected successfully');
    console.log('Using Database:', mongoose.connection.name);
    console.log('Connection Readiness State:', mongoose.connection.readyState);
  })
  .catch(err => console.log('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
