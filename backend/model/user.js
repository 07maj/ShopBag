const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  userNumber: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, unique: true },
  userPass: { type: String, required: true },
});

module.exports = model("user", userSchema);
