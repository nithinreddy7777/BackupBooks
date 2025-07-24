const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const backupRoutes = require('./routes/backupRoutes');
const verifyToken = require('./middlewares/auth'); 

dotenv.config();
const app = express();


app.use(express.json());


app.use('/api', verifyToken, backupRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  const testUser = { username: "admin" };
  const token = jwt.sign(testUser, process.env.JWT_SECRET || "default_secret", { expiresIn: '1h' });
  console.log("\n Use this token in Thunder Client:\n");
  console.log("Authorization: Bearer", token, "\n");
});
