const { asynMiddleware } = require("../Middleware/catchAsyncError");
const { UserModel } = require("../Model/auth.Model");
const { ErrorHandler } = require("../utils/errorhandler");
const { sendToken } = require("../utils/jwt");

exports.registerUser = asynMiddleware(async (req, res) => {
  const { name, email, password, avatar, role } = req.body;
  const user = await UserModel.create({
    name,
    email,
    password,
    avatar,
    role,
  });

  res.status(201).json({
    success: "success",
    user,
  });
});

exports.loginUser = asynMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & paaword", 400));
  }
  //
  const user = await UserModel.findOne({ email }).select(`+password`);

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 201, res);
});
