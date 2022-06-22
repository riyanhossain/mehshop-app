const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    pname: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    bestSelling: {
      type: Boolean,
      default: false,
    },
    justLanded: {
      type: Boolean,
      default: false,
    },
    topOffered: {
      type: Boolean,
      default: false,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    pImage: {
      type: String,
      required: true,
    },
    fileName : {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("product", productSchema);
