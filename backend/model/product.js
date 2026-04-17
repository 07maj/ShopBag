const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const productSchema = new Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productCategory: { type: String, required: true },
  productStatus: { type: String, required: true },
  productImage: { type: String, required: true },
});

module.exports = model("product", productSchema);
