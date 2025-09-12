// ================== IMPORTS ==================
const { v4 } = require("uuid");
const pm = require("../models/prodmodel");
require('dotenv').config()
const cloudinary = require("../cloudinary");
const streamifier = require("streamifier");
const multer = require("multer");

// ================== MULTER SETUP ==================
const upload = multer({ storage: multer.memoryStorage() });


// ================== HELPER ==================
const uploadToCloudinary = (fileBuffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// ================== CONTROLLERS ==================

// Add product with image upload
let addprod = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ err: "No image uploaded" });

    let crtPrice = Number(req.body.price.replace(/,/g, "")); // cleanup commas
    const result = await uploadToCloudinary(req.file.buffer);

    let data = new pm({
      ...req.body,
      _id: v4(),
      pimg: result.secure_url,
      price: crtPrice,
      public_id: result.public_id,
    });

    await data.save();
    res.json({ msg: "Product added", product: data });
  } catch (err) {
    console.error("Error in addprod:", err);
    res.status(500).json({ err: "Error in adding product" });
  }
};

// Get all products
let prod = async (req, res) => {
  try {
    let data = await pm.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ err: "Error in fetching products" });
  }
};

// Get product by ID + average rating
let getbyid = async (req, res) => {
  try {
    let data = await pm.findById(req.params.pid);

    let obj = await pm.aggregate([
      { $unwind: { path: "$comm" } },
      {
        $group: {
          _id: "$_id",
          avgrt: { $avg: "$comm.rt" },
          count: { $sum: 1 },
        },
      },
    ]);

    if (obj) console.log(obj);
    else console.log("no ratings");

    res.json(data);
  } catch (err) {
    console.error("Error in getbyid:", err);
    res.status(500).json({ err: "Error fetching product by ID" });
  }
};

// Add comment/review
let addcomm = async (req, res) => {
  try {
    await pm.findByIdAndUpdate(
      { _id: req.body.pid },
      { $push: { comm: req.body } }
    );
    res.json({ msg: "Comment added" });
  } catch (err) {
    console.error("Error in addcomm:", err);
    res.status(500).json({ err: "Error adding comment" });
  }
};

// Update product details
let upd = async (req, res) => {
  try {
    await pm.findByIdAndUpdate({ _id: req.body._id }, req.body);
    res.json({ msg: "Product details updated" });
  } catch (err) {
    console.error("Error in upd:", err);
    res.status(500).json({ err: "Error updating product" });
  }
};

// Get products by retailer ID
let getbyretid = async (req, res) => {
  try {
    let data = await pm.find({ rid: req.params.rid });
    res.json(data);
  } catch (err) {
    console.error("Error in getbyretid:", err);
    res.status(500).json({ err: "Error fetching retailer products" });
  }
};

// Search products by name (case insensitive)
let regsearch = async (req, res) => {
  try {
    const regex = new RegExp(req.params.st, "i");
    let obj = await pm.find({ name: { $regex: regex } });
    res.json(obj);
  } catch (err) {
    console.error("Error in regsearch:", err);
    res.status(500).json({ err: "Error in searching products" });
  }
};

// Delete product (with image from Cloudinary)
let delprod = async (req, res) => {
  try {
    let product = await pm.findById(req.params.pid);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (product.public_id) {
      await cloudinary.uploader.destroy(product.public_id);
    }

    await pm.findByIdAndDelete(req.params.pid);
    res.json({ msg: "Product deleted" });
  } catch (err) {
    console.error("Error in delprod:", err);
    res.status(500).json({ err: "Error deleting product" });
  }
};

// Update product image
let updimg = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No new image uploaded" });

    let product = await pm.findById(req.body._id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (product.public_id) {
      await cloudinary.uploader.destroy(product.public_id);
    }

    const result = await uploadToCloudinary(req.file.buffer);

    product.pimg = result.secure_url;
    product.public_id = result.public_id;
    await product.save();

    res.json({ msg: "Product image updated", product });
  } catch (err) {
    console.error("Error in updimg:", err);
    res.status(500).json({ err: "Error updating image" });
  }
};

// ================== EXPORTS ==================
module.exports = {
  upload,
  addprod,
  prod,
  getbyid,
  addcomm,
  upd,
  delprod,
  getbyretid,
  updimg,
  regsearch,
};


