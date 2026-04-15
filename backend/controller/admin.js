const productCollection = require("../model/product");
const queryCollection = require("../model/query");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminCollection = require("../model/Admin");

// Admin Reg Data Controller
const adminRegDataController = async (req, res) => {
  try {
    const { adminFname, adminCnumber, adminEmail, adminPass } = req.body;
    if (!adminFname || !adminCnumber || !adminEmail || !adminPass) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const adminEmailCheck = await adminCollection.findOne({
      adminEmail: adminEmail,
    });
    if (adminEmailCheck) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const hashPassword = await bcrypt.hash(adminPass, 10);

    const response = new adminCollection({
      adminEmail: adminEmail,
      adminContact: adminCnumber,
      adminPassword: hashPassword,
      adminUser: adminFname,
    });
    await response.save();
    res.status(200).json({ message: "Admin Registration Successfull" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// Admin Login Data Controller
const adminLoginDataController = async (req, res) => {
  try {
    const { adminLoginNumber, adminLoginEmail, adminLoginPass } = req.body;
    const userCheck = await adminCollection.findOne({
      adminEmail: adminLoginEmail,
    });
    if (!userCheck) {
      return res.status(400).json({ message: "email not found" });
    }
    const matchNumber = await adminCollection.findOne({
      adminContact: adminLoginNumber,
    });
    if (!matchNumber) {
      return res.status(400).json({ message: "invalid number" });
    }

    const matchPassword = await bcrypt.compare(
      adminLoginPass,
      userCheck.adminPassword,
    );

    if (!matchPassword) {
      return res.status(400).json({ message: "invalid password" });
    }
    const token = jwt.sign({ id: userCheck._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    return res
      .status(200)
      .json({
        message: "admin successfully login",
        adminToken: token,
        adminLoginData: userCheck,
      });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

// Product Controller
const productController = async (req, res) => {
  try {
    const Pimage = req.file.filename;
    const { pname, price, cat, status } = req.body;
    if (!pname || !price || !cat || !status) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const record = new productCollection({
      productName: pname,
      productPrice: price,
      productCategory: cat,
      productImage: Pimage,
      productStatus: status,
    });
    await record.save();
    res.status(200).json({ message: "successfully submitted" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// Get all products controller

const allProductsController = async (req, res) => {
  try {
    const record = await productCollection.find();
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
//Delete product controller
const deleteProductController = async (req, res) => {
  try {
    const productid = req.params.abc;
    await productCollection.findByIdAndDelete(productid);
    res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
// update product controller

const updateProductController = async (req, res) => {
  try {
    const id = req.params.abc;
    const response = await productCollection.findById(id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
// Updated Data Controller
const updatedDataController = async (req, res) => {
  try {
    const { Pname, Pstatus, Pprice, Pcat } = req.body;
    const productId = req.params.abc;
    await productCollection.findByIdAndUpdate(productId, {
      productName: Pname,
      productPrice: Pprice,
      productCategory: Pcat,
      productStatus: Pstatus,
    });
    res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

//  Get Query Controller
const getQueryController = async (req, res) => {
  try {
    const record = await queryCollection.find();
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(500).json({ message: "internal server errror" });
  }
};

//  Delete Query Controller

const deleteQueryController = async (req, res) => {
  try {
    const id = req.params.abc;
    await queryCollection.findByIdAndDelete(id);
    res.status(200).json({ message: "successfully delete" });
  } catch (error) {
    res.status(500).json({ message: "internal server errror" });
  }
};

// user Query Reply Controller
const userQueryReplyController = async (req, res) => {
  try {
    const id = req.params.abc;
    const record = await queryCollection.findById(id);
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(500).json({ message: "internal server errror" });
  }
};

// User Query Mail Reply Controller
const userQueryMailReplyController = async (req, res) => {
  try {
    const { to, sub, body } = req.body;
    const id = req.params.abc;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "alaziztechnologiespvtltd@gmail.com",
        pass: "sjke pgfx fchd mlcw",
      },
    });
    const info = await transporter.sendMail({
      from: '"ShopBag" <alaziztechnologiespvtltd@gmail.com>', // sender address
      to: to, // list of recipients
      subject: sub, // subject line
      text: body, // plain text body
      html: body, // HTML body
    });
    res.status(200).json({ message: "successfully reply" });
    await queryCollection.findByIdAndUpdate(id, { userQueryStatus: "read" });
  } catch (error) {
    res.status(500).json({ message: "internal server errror" });
  }
};

module.exports = {
  productController,
  allProductsController,
  deleteProductController,
  updateProductController,
  updatedDataController,
  getQueryController,
  deleteQueryController,
  userQueryReplyController,
  userQueryMailReplyController,
  adminLoginDataController,
  adminRegDataController,
};
