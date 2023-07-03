export const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
  
    const errorResponse = {
      error: message,
    };
  
    // Include stack trace in development mode
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = err.stack;
    }
  
    return res.status(statusCode).json(errorResponse);
  };
  