const express = require("express");
const { connect } = require("./config/db");
const proddata = require("./DummyData/data.json");
const { ProductModel } = require("./Model/product.Model");

const { productRouter } = require("./Route/product.route");
const { errorMiddleware } = require("./Middleware/error");
require("dotenv").config();

const app = express();

//port
const port = process.env.PORT || 5001;
//serverphases
const serverphases = process.env.NODE_ENV;
//middleware
app.use(express.json());

//weserver pport
//get products
app.get("", (req, res) => {
  res.send("welcome");
});
app.use("/api/v1/", productRouter);

//error middleware

app.use(errorMiddleware);
app.listen(port, async () => {
  try {
    await connect;
    // ProductModel.deleteMany();
    // console.log("all products deleted");
    // ProductModel.insertMany(proddata);
    // console.log("all products added");
    console.log(
      `listerning to the port http://localhost:${port} mongodb connected ${serverphases} Phase`
    );
  } catch (err) {
    console.log("Error listening");
  }
});
