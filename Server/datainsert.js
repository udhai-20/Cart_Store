const proddata = require("./DummyData/data.json");
const { ProductModel } = require("./Model/product.Model");
const db = require("./index");
const dotenv = require("dotenv");
dotenv.config();
db();
const sendProduct = async () => {
  try {
    await ProductModel.deleteMany();
    console.log("all products deleted");
    await ProductModel.insertMany(proddata);
    console.log("all products added");
  } catch (err) {
    console.log("error deleting/adding");
  }
  process.exit();
};

sendProduct();
