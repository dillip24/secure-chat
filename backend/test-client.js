import { io } from 'socket.io-client';

// --- CONFIGURATION ---
// You need to manually get these values before running the script.

// 1. Get a JWT by logging in a user (e.g., Priya) via Postman.
const USER_A_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NTMxODU4NzQsImV4cCI6MTc1MzI3MjI3NH0.7NCHfZblfbg8WfdKD9UXk6gPQLXSvwGErLGrJM91wSY'; 

// 2. Get another JWT by logging in a different user (e.g., Sanjay) via Postman.
const USER_B_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ1c2VyMkBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoidXNlcjIiLCJpYXQiOjE3NTMxODU4OTgsImV4cCI6MTc1MzI3MjI5OH0.7N7tbDk-tCSA_nb9mQp1yTrHBCZl-H4oIJbSvDC_Dp4';

// 3. Create a one-to-one chat between Priya and Sanjay using Postman.
//    Get the chat ID from the response.
const CHAT_ID = '3'; // e.g., '1'

// --- SCRIPT LOGIC ---

// Choose which user this client will represent by commenting/uncommenting.
const currentUserToken = USER_A_TOKEN; 
// const currentUserToken = USER_B_TOKEN;

// Connect to the server, passing the token for authentication
const socket = io('http://localhost:6969', {
  auth: {
    token: currentUserToken
  }
});

// --- EVENT LISTENERS ---

socket.on('connect', () => {
  console.log(`✅ Connected to server with ID: ${socket.id}`);

  // After connecting, join the specific chat room
  socket.emit('joinChat', CHAT_ID);
  console.log(`Attempting to join chat room: ${CHAT_ID}`);

  // Simulate sending a message after a short delay
  setTimeout(() => {
    const messagePayload = {
      chatId: CHAT_ID,
      content: 'This is an encrypted message blob from the test client!'
    };
    console.log('-> Sending message:', messagePayload);
    socket.emit('sendMessage', messagePayload);
  }, 2000); // Wait 2 seconds before sending
});

socket.on('newMessage', (message) => {
  console.log('<- Received new message:', message);
});

socket.on('connect_error', (err) => {
  console.error(`❌ Connection Error: ${err.message}`);
});

socket.on('disconnect', () => {
  console.log('🔌 Disconnected from server.');
});

socket.on('messageError', (error) => {
    console.error('❌ Server reported a message error:', error);
});
