const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const taskRoutes = require('./routes/tasks'); // Ensure this path is correct

dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection failed:', error.message));

// Routes
app.use('/api/tasks', taskRoutes); // Define the routes for tasks

// Set the port from environment or default to 5001
const port = process.env.PORT || 5001;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };


