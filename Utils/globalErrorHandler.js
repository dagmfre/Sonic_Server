const errorHandler = (error, res) => {
  console.error("Error:", error); // Log the error for debugging purposes

  const results = [{ id: 1 }]; // Define results properly
  res.status(res.statusCode || 500).send(results[0]?.id.toString());
  res.json({
    message: error.message || "Internal Server Error",
  });
};

export default errorHandler;
