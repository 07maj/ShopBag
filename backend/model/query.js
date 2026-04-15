const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const querySchema = new Schema({
  userName: { type: String, require: true },
  userNumber: { type: String, require: true },
  userEmail: { type: String, require: true },
  userQuery: { type: String, require: true },
  userQueryStatus: { type: String, default: "unread" },
});

module.exports = model("query", querySchema);
