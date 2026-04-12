const express = require("express");
const About = require("../models/about");
const checkAuth = require("../middleware/auth.middleware");
const upload = require("../config/upload");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Public: fetch latest about entry (or all if needed)
router.get("/", async (req, res) => {
  try {
    const aboutEntries = await About.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "About content fetched successfully",
      about: aboutEntries,
    });
  } catch (error) {
    console.error("About GET all error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Public: fetch single entry by id
router.get("/:id", async (req, res) => {
  try {
    const about = await About.findById(req.params.id);

    if (!about) {
      return res.status(404).json({ message: "About entry not found" });
    }

    return res.status(200).json({ about });
  } catch (error) {
    console.error("About GET by id error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Protected: create new entry
router.post("/", checkAuth, upload.single("profileImage"), async (req, res) => {
  try {
    const { name, role, descriptionEn, descriptionAr, address, phone, email, cvLink } = req.body;

    if (!name || !role || !descriptionEn || !descriptionAr) {
      return res
        .status(400)
        .json({ message: "Name, role and descriptions (EN & AR) are required" });
    }

    const payload = {
      name,
      role,
      description: {
        en: descriptionEn,
        ar: descriptionAr
      },
      address,
      phone,
      email,
      cvLink
    };

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "about",
      });
      payload.profileImage = uploadResult.secure_url;
    } else if (req.body.profileImage) {
      payload.profileImage = req.body.profileImage;
    }

    const about = await About.create(payload);
    return res
      .status(201)
      .json({ message: "About entry created successfully", about });
  } catch (error) {
    console.error("About POST error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Protected: update entry
router.put(
  "/:id",
  checkAuth,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const about = await About.findById(req.params.id);

      if (!about) {
        return res.status(404).json({ message: "About entry not found" });
      }

      const updatableFields = [
        "name",
        "role",
        "address",
        "phone",
        "email",
        "cvLink",
      ];

      updatableFields.forEach((field) => {
        if (typeof req.body[field] !== "undefined") {
          about[field] = req.body[field];
        }
      });

      if (req.body.descriptionEn) about.description.en = req.body.descriptionEn;
      if (req.body.descriptionAr) about.description.ar = req.body.descriptionAr;

      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "about",
        });
        about.profileImage = uploadResult.secure_url;
      } else if (typeof req.body.profileImage !== "undefined") {
        about.profileImage = req.body.profileImage;
      }

      const updatedAbout = await about.save();
      return res.status(200).json({
        message: "About entry updated successfully",
        about: updatedAbout,
      });
    } catch (error) {
      console.error("About PUT error", error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// Protected: delete entry
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const about = await About.findById(req.params.id);

    if (!about) {
      return res.status(404).json({ message: "About entry not found" });
    }

    await about.deleteOne();
    return res
      .status(200)
      .json({ message: "About entry deleted successfully" });
  } catch (error) {
    console.error("About DELETE error", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
