const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../utils/errorhandler");
const { asynMiddleware } = require("./catchAsyncError");
const { UserModel } = require("../Model/auth.Model");

exports.isAuthenticatedUser = asynMiddleware(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("login first to enter this section"));
  }
  const decode = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = await UserModel.findById(decode.id);
  next();
});
