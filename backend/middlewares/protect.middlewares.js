import jwt from 'jsonwebtoken';
import { apiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// I've renamed the function to be more descriptive
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    // The header format is "Bearer <token>"
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new apiError(401, 'Unauthorized request: Token is missing');
    }

    // jwt.verify will throw an error if the token is invalid or expired
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user's info (from the token payload) to the request object
    req.user = {
      id: decodedToken.id,
      username: decodedToken.username,
      email: decodedToken.email
    };

    // If everything is successful, pass control to the next middleware/route handler
    next();
    
  } catch (error) {
    // The catch block will handle errors from jwt.verify (e.g., TokenExpiredError)
    // or the "missing token" error we threw above.
    throw new apiError(401, error?.message || 'Invalid access token');
  }
});