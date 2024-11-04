const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes')
// const { errorHandler } = require('./middleware/errorMiddleware');

connectDB(); // Connect to the database

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use('/api/users', userRoutes); // User routes
app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes); // Post routes

// app.use(errorHandler); // Global error handler

module.exports = app;
