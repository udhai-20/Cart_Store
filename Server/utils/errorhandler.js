class ErrorHandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
    console.log(Error);
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { ErrorHandler };
