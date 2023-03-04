const { request } = require("express");
const { ProductModel } = require("../Model/product.Model");
const { ErrorHandler } = require("../utils/errorhandler");
const { asynMiddleware } = require("../Middleware/catchAsyncError");
const { APIFeatures } = require("../utils/apiFeature");
//get all products
const getProducts = asynMiddleware(async (req, res, next) => {
  const resPerPage = 2;
  const apiFeature = new APIFeatures(ProductModel.find(), req.query)
    .search()
    .filter()
    .paginate(resPerPage);
  // console.log("   apiFeature:", apiFeature);
  const product = await apiFeature.query;
  // console.log("apiFeature", product);
  res.status(200).json({
    sucess: true,
    count: product.length,
    product,
  });
});
//create products
const createProducts = asynMiddleware(async (req, res) => {
  const product = await ProductModel.create(req.body);
  res.status(201).json({
    sucess: true,
    product,
  });
});
//get single product
const getSingleProduct = asynMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  console.log("product:", product);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(201).json({
    sucess: true,
    product,
  });
});
//update product
const updateProduct = async (req, res) => {
  try {
    let updatedData;
    const { id } = req.params;
    console.log(req.body);
    let product = await ProductModel.findById(id);
    console.log(product);
    if (!product) {
      res.status(404).json({
        sucess: false,
        message: "Id Not Found",
      });
    }
    if (product) {
      updatedData = await ProductModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        sucess: true,
        updatedData,
      });
    }
  } catch (e) {
    res.status(500).json({
      sucess: false,
      message: e.message,
    });
  }
};
//delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    let product = await ProductModel.findById(id);
    console.log(product);
    if (!product) {
      res.status(404).json({
        sucess: false,
        message: "Id Not Found",
      });
    }
    let deletedData = await ProductModel.findByIdAndDelete(id);

    res.status(200).json({
      sucess: true,
      message: "product deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      sucess: false,
      message: e.message,
    });
  }
};
module.exports = {
  getProducts,
  createProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
