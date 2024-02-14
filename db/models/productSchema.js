const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    img: {
      type: Array,
      required: true,
    },
    colors: {
      type: Array,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
