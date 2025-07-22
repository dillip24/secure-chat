import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.js';
import { apiError } from '../utils/apiError.js';
import bcrypt from 'bcrypt';
import { query } from '../database/server.js';

export const register = asyncHandler(async (req, res) => {

  const { username, email, password } = req.body;

  if(!username || !email || !password) {
    throw new apiError(400, 'All fields are required');
  }

  const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);

  if(existingUser.rows.length > 0) {
    throw new apiError(400, 'User already exists with this email');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword]
  );

  res.status(201).json(
    new apiResponse(201, {
      user: {
        id: newUser.rows[0].id,
        username: newUser.rows[0].username,
        email: newUser.rows[0].email
      }
    }, 'User registered successfully')
  );
});

export const login = async (req, res) => {
  // Login logic
  const {username, password} = req.body;
  if(!username || !password) {
    throw new apiError(400, 'Username and password are required');
  }
    const user = await query('SELECT * FROM users WHERE username = $1', [username]);
    if(user.rows.length === 0) {
        throw new apiError(401, 'Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if(!isMatch) {
        throw new apiError(401, 'Invalid username or password');
    }
    res.status(200).json(
      new apiResponse(200, {
        user: {
          id: user.rows[0].id,
          username: user.rows[0].username,
          email: user.rows[0].email
        }
      }, 'Login successful')
    );
};
