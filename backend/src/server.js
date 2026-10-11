import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB then start Express server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 TaskFlow Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database on startup:', err);
    process.exit(1);
  });
