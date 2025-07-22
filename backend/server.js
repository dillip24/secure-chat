import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import { errorHandler } from './middlewares/error.middleware.js';
import {initializeSocketIO} from './utils/socket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Secure Chat API');
});

//routes
import authRoutes from './routes/auth.routes.js';
app.use('/api/auth', authRoutes);

import userRoutes from './routes/user.routes.js';
app.use('/api/users', userRoutes);

import chatRoutes from './routes/chats.routes.js';
app.use('/api/chats', chatRoutes);

// Error handling middleware should be LAST

initializeSocketIO(io);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});