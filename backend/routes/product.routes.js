const express = require("express");
const Product = require("../models/product");
const checkAuth = require("../middleware/auth.middleware");
const upload = require("../config/upload");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

const parseTechStack = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter(Boolean);
    }
  } catch (_) {
    // value was not JSON, fall through
  }
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
};

// Public: get all products (optional featured filter)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (typeof req.query.featured !== "undefined") {
      filter.featured = req.query.featured === "true";
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error("Product GET all error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Public: get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error("Product GET by id error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Protected: create product
router.post("/", checkAuth, upload.fields([{ name: "image", maxCount: 1 }, { name: "additionalImages", maxCount: 5 }]), async (req, res) => {
  try {
    const { title, descriptionEn, descriptionAr, tech, github, demo, featured } = req.body;

    if (!title || !descriptionEn || !descriptionAr) {
      return res
        .status(400)
        .json({ message: "Title and descriptions (EN & AR) are required" });
    }

    const payload = {
      title,
      description: {
        en: descriptionEn,
        ar: descriptionAr
      },
      github,
      demo,
      featured: typeof featured === "string" ? featured === "true" : !!featured,
      tech: parseTechStack(tech),
      images: []
    };

    // Handle Main Image
    if (req.files && req.files["image"]) {
      const uploadResult = await cloudinary.uploader.upload(req.files["image"][0].path, {
        folder: "products",
      });
      payload.image = uploadResult.secure_url;
    } else if (req.body.image) {
      payload.image = req.body.image;
    }

    // Handle Additional Images
    if (req.files && req.files["additionalImages"]) {
      const uploadPromises = req.files["additionalImages"].map(file =>
        cloudinary.uploader.upload(file.path, { folder: "products" })
      );
      const results = await Promise.all(uploadPromises);
      payload.images = results.map(result => result.secure_url);
    }

    if (!payload.image) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const product = await Product.create(payload);
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Product POST error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Protected: update product
router.put(
  "/:id",
  checkAuth,
  upload.fields([{ name: "image", maxCount: 1 }, { name: "additionalImages", maxCount: 5 }]),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updatableFields = ["title", "github", "demo"];

      updatableFields.forEach((field) => {
        if (typeof req.body[field] !== "undefined") {
          product[field] = req.body[field];
        }
      });

      if (req.body.descriptionEn) product.description.en = req.body.descriptionEn;
      if (req.body.descriptionAr) product.description.ar = req.body.descriptionAr;

      if (typeof req.body.featured !== "undefined") {
        product.featured =
          typeof req.body.featured === "string"
            ? req.body.featured === "true"
            : !!req.body.featured;
      }

      if (typeof req.body.tech !== "undefined") {
        product.tech = parseTechStack(req.body.tech);
      }

      // Handle Main Image Update
      if (req.files && req.files["image"]) {
        const uploadResult = await cloudinary.uploader.upload(req.files["image"][0].path, {
          folder: "products",
        });
        product.image = uploadResult.secure_url;
      } else if (typeof req.body.image !== "undefined") {
        product.image = req.body.image;
      }

      // Handle Additional Images Update (Append or Replace logic - here we append)
      if (req.files && req.files["additionalImages"]) {
        const uploadPromises = req.files["additionalImages"].map(file =>
          cloudinary.uploader.upload(file.path, { folder: "products" })
        );
        const results = await Promise.all(uploadPromises);
        const newImages = results.map(result => result.secure_url);
        product.images = [...(product.images || []), ...newImages];
      }

      const updatedProduct = await product.save();
      return res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Product PUT error", error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// Protected: delete product
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    return res
      .status(200)
      .json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Product DELETE error", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
