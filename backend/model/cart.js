const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", require: true },
  cartItems: [],
  totalPrice: Number,
  totalQuantity: Number,
});

module.exports = model("cart", cartSchema);
