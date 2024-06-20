const errorHandler = (err, req, res, next) => {
  console.error("Error:", err); // Log the error for debugging purposes

  res.status(res.status || 500).send(results[0].id.toString());
  res.json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
