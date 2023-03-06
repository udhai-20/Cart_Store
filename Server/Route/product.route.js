const express = require("express");
const {
  getProducts,
  createProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../Controller/Product.ctrl");
const { isAuthenticatedUser } = require("../Middleware/authenticate");

const productRouter = express.Router();
//get all
productRouter.route("/products").get(isAuthenticatedUser, getProducts);
//get single
productRouter.route("/products/:id").get(getSingleProduct);
//create
productRouter.route("/create-product").post(createProducts);
//update patch
productRouter.route("/products/:id").put(updateProduct).delete(deleteProduct);
module.exports = { productRouter };
// as