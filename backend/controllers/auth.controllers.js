import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.js';
import { apiError } from '../utils/apiError.js';
import bcrypt from 'bcrypt';
import { query } from '../database/server.js';
import { getClient } from '../database/server.js'; 

import jwt from 'jsonwebtoken';

// export const register = asyncHandler(async (req, res) => {

//   const { username, email, password } = req.body;

//   if(!username || !email || !password) {
//     throw new apiError(400, 'All fields are required');
//   }

//   const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);

//   if(existingUser.rows.length > 0) {
//     throw new apiError(400, 'User already exists with this email');
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = await query(
//     'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
//     [username, email, hashedPassword]
//   );

//   res.status(201).json(
//     new apiResponse(201, {
//       user: {
//         id: newUser.rows[0].id,
//         username: newUser.rows[0].username,
//         email: newUser.rows[0].email
//       }
//     }, 'User registered successfully')
//   );
// });




export const register = asyncHandler(async (req, res) => {
  // 1. Destructure all required fields, including publicKey
  const { username, email, password, publicKey } = req.body;

  // 2. Add validation for publicKey
  if (!username || !email || !password || !publicKey) {
    throw new apiError(400, 'All fields, including publicKey, are required');
  }

  // Use a database transaction
  const client = await getClient();

  try {
    // Start the transaction
    await client.query('BEGIN');

    const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      throw new apiError(409, 'User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert into 'users' table
    const userInsertQuery = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email';
    const newUserResult = await client.query(userInsertQuery, [username, email, hashedPassword]);
    const newUser = newUserResult.rows[0];

    // 4. Insert into 'public_keys' table using the new user's ID
    const keyInsertQuery = 'INSERT INTO public_keys (user_id, public_key) VALUES ($1, $2)';
    await client.query(keyInsertQuery, [newUser.id, publicKey]);

    // Commit the transaction if both inserts succeed
    await client.query('COMMIT');

    res.status(201).json(
      new apiResponse(201, { user: newUser }, 'User registered successfully')
    );
  } catch (error) {
    // If any error occurs, roll back the transaction
    await client.query('ROLLBACK');
    // Re-throw the error to be handled by the global error handler
    throw error;
  } finally {
    // Release the client back to the pool
    client.release();
  }
});



export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    throw new apiError(400, 'Username and password are required');
  }
  
  const user = await query('SELECT * FROM users WHERE username = $1', [username]);
  
  if (user.rows.length === 0) {
    throw new apiError(401, 'Invalid username or password');
  }
  
  const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
  
  if (!isMatch) {
    throw new apiError(401, 'Invalid username or password');
  }
  
  const token = jwt.sign(
    {
      id: user.rows[0].id,
      email: user.rows[0].email,
      username: user.rows[0].username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  );
  
  res.status(200).json(
    new apiResponse(200, {
      user: {
        id: user.rows[0].id,
        username: user.rows[0].username,
        email: user.rows[0].email
      },
      token: token
    }, 'Login successful')
  );
});
