const mongoose = require(`mongoose`);
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter name"],
  },
  email: {
    type: String,
    required: [true, "please Enter email"],
    validate: [validator.isEmail, "please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "please Enter password"],
    maxlength: [6, "password must be at least 6 characters"],
    select: false,
  },
  avatar: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre(`save`, async function (next) {
  // console.log("check password");
  this.password = await bcrypt.hash(this.password, 3);
});
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
userSchema.methods.isValidPassword = async function (enteredpassword) {
  let res = await bcrypt.compare(enteredpassword, this.password);
  return res;
};
const UserModel = mongoose.model("UserModel", userSchema);

module.exports = { UserModel };
