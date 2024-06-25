const errorHandler = (error, req, res, next) => {
  console.error("Error:", error); // Log the error for debugging purposes

  res.status(res.status || 500).send(results[0].id.toString());
  res.json({
    message: error.message || "Internal Server Error",
  });
};

export default errorHandler;
