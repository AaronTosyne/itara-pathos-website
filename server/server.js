const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables with explicit path
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to MongoDB
connectDB();

// TEST: Import models to verify they work
const Post = require('./models/Post');
const Contact = require('./models/Contact');
const User = require('./models/User');
console.log('✓ Models loaded successfully');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const postRoutes = require('./routes/posts');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');

// Mount routes
app.use('/api/posts', postRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Itara Pathos IT API' });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});