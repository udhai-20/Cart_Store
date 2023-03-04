const express = require("express");
const { registerUser, loginUser } = require("../Controller/auth.Ctrl");
const { isAuthenticatedUser } = require("../Middleware/authenticate");
const authRouter = express.Router();

authRouter.route("/user/register").post(registerUser);
authRouter.route("/user/login").post(loginUser);

module.exports = { authRouter };
