const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const backupRoutes = require('./routes/backupRoutes');
const verifyToken = require('./middlewares/auth'); // Add this line

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Route protection using verifyToken middleware
app.use('/api', verifyToken, backupRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // ✅ Optional: Generate a test token for Thunder Client use
  const testUser = { username: "admin" }; // You can include more info like role
  const token = jwt.sign(testUser, process.env.JWT_SECRET || "default_secret", { expiresIn: '1h' });
  console.log("\n📢 Use this token in Thunder Client:\n");
  console.log("Authorization: Bearer", token, "\n");
});
