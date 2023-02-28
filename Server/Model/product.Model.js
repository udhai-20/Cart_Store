const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
    maxLength: [100, "Product name must be 100 charcter"],
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter product category"],
    enum: {
      values: [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Cloths/Shoes",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please enter product category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product  Stock"],
    maxLength: [20, "product stock cannot exceeds 20"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        require: true,
      },
    },
  ],
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = { ProductModel };
