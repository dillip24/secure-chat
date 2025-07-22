import jwt from 'jsonwebtoken';
import { query } from '../database/server.js';

// Note the spelling: "initialize" with a "z"
export const initializeSocketIO = (io) => {
  // --- Socket.IO Middleware for Authentication ---
  // This runs for every incoming connection
  io.use((socket, next) => {
    // The client will send the token in the 'auth' object during connection
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error: Token not provided'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error: Invalid token'));
      }
      // Attach user info to the socket object for use in event handlers
      socket.user = decoded;
      next();
    });
  });


  // --- Main Connection Handler ---
  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.user.username} (ID: ${socket.id})`);

    // --- Event Handler for Joining a Chat Room ---
    socket.on('joinChat', (chatId) => {
      console.log(`${socket.user.username} is joining chat: ${chatId}`);
      socket.join(chatId); // Use socket.io's 'join' to subscribe the socket to a room
    });

    // --- Event Handler for Sending a Message ---
    socket.on('sendMessage', async (data) => {
      const { chatId, content } = data; // content is the encrypted message blob
      const senderId = socket.user.id;

      if (!chatId || !content) {
        return socket.emit('messageError', { message: "chatId and content are required." });
      }

      try {
        // 1. Save the message to the database
        const sql = 'INSERT INTO messages (chat_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *';
        const result = await query(sql, [chatId, senderId, content]);
        const newMessage = result.rows[0];

        // 2. Broadcast the new message to all users in that chat room
        // The sender's own client will also receive this event
        io.to(chatId).emit('newMessage', newMessage);

      } catch (error) {
        console.error("Error saving or broadcasting message:", error);
        // Optionally, emit an error event back to the sender
        socket.emit('messageError', { message: "Failed to send message." });
      }
    });

    // --- Event Handler for Disconnecting ---
    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.user.username} (ID: ${socket.id})`);
    });
  });
};
