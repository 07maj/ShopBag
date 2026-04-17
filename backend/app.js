const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const apiRoutes = require("./routes/api");
const connectDb = require("./config/db");
const cors = require("cors");
connectDb();

app.use(express.static("public"));
const allowedOrigins = [
  "http://localhost:5173",
  "https://shopbag.vercel.app"
];

const allowedOrigins = [
  "https://shopbag.vercel.app"
];
app.use(express.json());
app.use("/api", apiRoutes);
let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`running on a port ${port}`);
});
