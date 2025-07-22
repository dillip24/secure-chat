import { apiError } from '../utils/apiError.js';

export const errorHandler = (err, req, res, next) => {
  let error = err;

  // If it's not already an apiError, convert it
  if (!(error instanceof apiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    error = new apiError(statusCode, message, error?.errors || [], err.stack);
  }

  // Handle specific PostgreSQL errors
  if (err.code) {
    switch (err.code) {
      case '23505': // Unique constraint violation
        error = new apiError(409, "Resource already exists");
        break;
      case '23503': // Foreign key constraint violation
        error = new apiError(400, "Invalid reference");
        break;
      case '23502': // Not null constraint violation
        error = new apiError(400, "Required field missing");
        break;
      case '42P01': // Table doesn't exist
        error = new apiError(500, "Database configuration error");
        break;
      default:
        error = new apiError(500, "Database error occurred");
    }
  }

  // Log error for debugging
  console.error('Error:', {
    message: error.message,
    statusCode: error.statusCode,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    originalError: err
  });

  const response = {
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  res.status(error.statusCode).json(response);
};