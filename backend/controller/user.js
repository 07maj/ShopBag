const userCollection = require("../model/user");
const bcrypt = require("bcrypt");
const productCollection = require("../model/product");
const userQueryCollection = require("../model/query");
const orderCollection = require("../model/order");
const cartCollection = require("../model/cart");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Registration data controller
const regDataController = async (req, res) => {
  try {
    const { fname, cnumber, email, pass } = req.body;
    if (!fname || !email || !cnumber || !pass) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const emailExist = await userCollection.findOne({ userEmail: email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const hashPassword = await bcrypt.hash(pass, 10);

    const record = new userCollection({
      userName: fname,
      userNumber: cnumber,
      userEmail: email,
      userPass: hashPassword,
    });
    await record.save();
    res.status(200).json({ message: "data submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// Login data controller
const loginDataController = async (req, res) => {
  try {
    const { loginNumber, loginEmail, loginPass } = req.body;
    const userCheck = await userCollection.findOne({ userEmail: loginEmail });
    if (!userCheck) {
      return res.status(400).json({ message: "email not found" });
    }
    const matchNumber = await userCollection.findOne({
      userNumber: loginNumber,
    });
    if (!matchNumber) {
      return res.status(400).json({ message: "invalid number" });
    }

    const matchPassword = await bcrypt.compare(loginPass, userCheck.userPass);

    if (!matchPassword) {
      return res.status(400).json({ message: "invalid password" });
    }
    const token = jwt.sign({ id: userCheck._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    return res
      .status(200)
      .json({ message: "successfully login", token: token, data: userCheck });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// Product data controller
const productDataController = async (req, res) => {
  try {
    const category = req.query.category;
    let filter = { productStatus: "In-Stock" };
    if (category && category.toLowerCase() !== "all") {
      filter.productCategory = { $regex: `^${category}$`, $options: "i" };
    }
    const record = await productCollection.find(filter);
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// user Query Controller
const userQueryController = async (req, res) => {
  try {
    const { userEmail, userName, userQuery, userNumber } = req.body;
    const record = await new userQueryCollection({
      userName: userName,
      userNumber: userNumber,
      userEmail: userEmail,
      userQuery: userQuery,
    });
    await record.save();
    res.status(200).json({ message: "Query submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// Razorpay Setup
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// Cart Order Controller

const cartOrderController = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    const options = {
      amount: amount * 100,
      currency,
      receipt,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
// Verify Order Controller
const verifyOrderController = async (req, res) => {
  try {
    const {
      razorpay_orderid,
      razorpay_paymentid,
      razorpay_signature,
      amount,
      userId,
    } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.KEY_SECRET);
    hmac.update(razorpay_orderid + "|" + razorpay_paymentid);
    const generate_signature = hmac.digest("hex");
    if (generate_signature === razorpay_signature) {
      const record = new orderCollection({
        userId: userId,
        orderId: razorpay_orderid,
        paymentId: razorpay_paymentid,
        signature: razorpay_signature,
        amount: amount,
        status: "Paid",
      });
      await record.save();

      res.status(200).json({ success: true, message: "Payment Successfull" });
    } else {
      res.status(400).json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// Save Cart Data Controller
const saveCartDataController = async (req, res) => {
  try {
    const { userId, totalPrice, totalQuantity, cartItems } = req.body;
    let cart = await cartCollection.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (cart) {
      ((cart.cartItems = cartItems),
        (cart.totalPrice = totalPrice),
        (cart.totalQuantity = totalQuantity));
      await cart.save();
    } else {
      cart = new cartCollection({
        userId: new mongoose.Types.ObjectId(userId),
        cartItems: cartItems,
        totalPrice: totalPrice,
        totalQuantity: totalQuantity,
      });
    }
    await cart.save();
    res.status(200).json({ message: "Saved to Cart" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// Fetch Cart Controller
const fetchCartController = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await cartCollection.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!response) {
      return res.status(200).json({
        cartItems: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// search controller

const searchController = async (req, res) => {
  try {
    const keyword = req.query.q;
    const result = await productCollection.find({
      productName: { $regex: keyword, $options: "i" },
      productStatus: "In-Stock",
    });

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  regDataController,
  loginDataController,
  productDataController,
  userQueryController,
  saveCartDataController,
  searchController,
  fetchCartController,
  cartOrderController,
  verifyOrderController,
};
