const errorMiddleware = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  // console.log(process.env.NODE_ENV == "production");
  if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = new Error(message);
    console.log(err);
    console.log("wewe", err.name);
    if (err.name == "CastError") {
      message = `Resource not found`;
      error = new Error(message);
    }

    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((err) => err.message);
      error = new Error(message);
    }
    res.status(err.statuscode).json({
      success: false,
      message: error.message || "internal server error",
    });
  }
  if (process.env.NODE_ENV == "development") {
    res.status(err.statuscode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
};

module.exports = { errorMiddleware };
