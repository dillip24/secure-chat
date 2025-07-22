import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { query } from './database/server.js'; 
import dotenv from 'dotenv';

import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Secure Chat API');
});

//routes
import authRoutes from './routes/auth.routes.js';
app.use('/api/auth', authRoutes);

// Error handling middleware should be LAST
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});