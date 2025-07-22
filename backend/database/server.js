import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const { Pool } = pg;

// A Pool is better than a single Client for web applications
// as it manages multiple connections automatically.
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// We export a single query function to use throughout our app
export function query(text, params) {
  return pool.query(text, params);
}