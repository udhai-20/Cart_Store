const { request } = require("express");
const { ProductModel } = require("../Model/product.Model");
//get all products
const getProducts = async (req, res) => {
  try {
    const product = await ProductModel.find();
    res.status(200).json({
      sucess: true,
      count: product.length,
      product,
    });
  } catch (e) {
    req.status(404).json({
      sucess: false,
      message: e.message,
    });
  }
};
//create products
const createProducts = async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json({
      sucess: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      menubar: err.message,
    });
  }
};
//get single product
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      res.status(404).json({
        sucess: false,
        message: "Id Not Found",
      });
    }
    res.status(201).json({
      sucess: true,
      product,
    });
  } catch (e) {
    res.status(404).json({
      sucess: false,
      message: e.message,
    });
    // res.status(500).send(e);
  }
};
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
    // res.status(500).json({
    //   sucess: false,
    //   message: e.message,
    // });
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