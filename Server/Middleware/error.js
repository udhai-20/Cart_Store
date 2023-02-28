const errorMiddleware = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  console.log(process.env.NODE_ENV == "production");
  if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = { ...err };

    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((err) => err.message);
      error = new Error(message);
    }
    res.status(err.statusCode).json({
      success: false,
      message: error.message || "internal server error",
    });
  }
  if (process.env.NODE_ENV == "development") {
    // console.log(err.name == "ValidationError");
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
};

module.exports = { errorMiddleware };
