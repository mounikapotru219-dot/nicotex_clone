require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB();
    console.log('✓ MongoDB connected');
  } catch (err) {
    console.warn('⚠️  MongoDB unavailable - running in demo mode');
  }
  app.listen(PORT, () => {
    console.log(`✓ Backend running on http://localhost:${PORT}`);
  });
})();
