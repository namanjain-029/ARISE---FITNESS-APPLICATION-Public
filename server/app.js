require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        /\.vercel\.app$/          // allows any *.vercel.app domain
    ],
    credentials: true
}));
app.use(express.json());

// Basic Route for testing
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server is running normally' });
});

// Import and use routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/workouts', require('./src/routes/workoutRoutes'));
app.use('/api/meals', require('./src/routes/mealRoutes'));
app.use('/api/analytics', require('./src/routes/analyticsRoutes'));
app.use('/api/user', require('./src/routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
