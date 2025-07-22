import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { query } from '../database/server.js'; // Make sure to import the query function

export const getUserProfile = asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) {
        // This case is unlikely if verifyJWT is working, but it's good practice
        throw new apiError(404, 'User not found');
    }

    // FIX: Use res.status().json() to send the response object
    return res.status(200).json(
        new apiResponse(200, { user }, 'User profile retrieved successfully')
    );
});

export const getAllUsers = asyncHandler(async (req, res) => {
    // IMPROVEMENT: Exclude the currently logged-in user from the list
    const loggedInUserId = req.user.id;
    const sql = 'SELECT id, username, email FROM users WHERE id != $1';
    
    const users = await query(sql, [loggedInUserId]);

    // This check is fine, but you could also just return an empty array
    if (users.rows.length === 0) {
        throw new apiError(404, 'No other users found');
    }

    // FIX: Use res.status().json() to send the response object
    return res.status(200).json(
        new apiResponse(200, { users: users.rows }, 'Users retrieved successfully')
    );
});

