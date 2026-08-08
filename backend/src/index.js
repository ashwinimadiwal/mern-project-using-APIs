const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { initializeDatabase } = require('./models/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Task management API is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = Number(process.env.PORT) || 5000;

function startServer(port, retries = 1) {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && retries > 0) {
      console.warn(`Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1, retries - 1);
    } else {
      console.error('Server failed to start:', err);
      process.exit(1);
    }
  });
}

initializeDatabase()
  .then(() => {
    startServer(PORT, 5);
  })
  .catch((err) => {
    console.error('Database initialization failed:', err);
    process.exit(1);
  });
