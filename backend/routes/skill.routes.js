const express = require("express");
const Skill = require("../models/skill");
const cloudinary = require("../config/cloudinary");
const upload = require("../config/upload");
const checkAuth = require("../middleware/auth.middleware");

const router = express.Router();

// Public: get all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "Skills fetched successfully", skills });
  } catch (error) {
    console.error("Skill GET all error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Public: get skill by id
router.get("/:id", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    return res.status(200).json({ skill });
  } catch (error) {
    console.error("Skill GET by id error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Protected: create new skill
router.post("/", checkAuth, upload.single("icon"), async (req, res) => {
  const { name, category } = req.body;

  try {
    if (!name || !category) {
      return res.status(400).json({ message: "Name and category required" });
    }

    let iconUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "skills",
      });
      iconUrl = result.secure_url;
    }

    const skill = await Skill.create({
      name,
      category,
      icon: iconUrl,
    });

    return res
      .status(201)
      .json({ message: "Skill created successfully", skill });
  } catch (error) {
    console.error("Skill POST error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Protected: update skill
router.put(
  "/:id",
  checkAuth,
  upload.single("icon"),
  async (req, res) => {
    try {
      const skill = await Skill.findById(req.params.id);

      if (!skill) {
        return res.status(404).json({ message: "Skill not found" });
      }

      const updatableFields = ["name", "category"];
      updatableFields.forEach((field) => {
        if (typeof req.body[field] !== "undefined") {
          skill[field] = req.body[field];
        }
      });

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "skills",
        });
        skill.icon = result.secure_url;
      } else if (typeof req.body.icon !== "undefined") {
        skill.icon = req.body.icon;
      }

      const updatedSkill = await skill.save();
      return res.status(200).json({
        message: "Skill updated successfully",
        skill: updatedSkill,
      });
    } catch (error) {
      console.error("Skill PUT error", error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// Protected: delete skill
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    await skill.deleteOne();
    return res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Skill DELETE error", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;