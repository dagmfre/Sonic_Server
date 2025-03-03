const errorHandler = (error, req, res, next) => {
  console.error("Error:", error.message);

  if (res.headersSent) {
    return next(error);
  }

  // Set the status code to the existing one or default to 500
  res.status(error.status || 500);

  // Send the JSON response with an error message and details
  res.json({
    message: error.message || "Internal Server Error",
    details: error.details || [],
  });
};

export default errorHandler;
