const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("connection success");
  } catch (error) {
    console.log("connection failed", error.message);
  }
};

module.exports = connectDb;
