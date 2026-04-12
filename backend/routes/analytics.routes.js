const express = require("express");
const Analytics = require("../models/analytics");
const checkAuth = require("../middleware/auth.middleware");

const router = express.Router();

const getOrCreateAnalytics = async () => {
  let analytics = await Analytics.findOne();
  if (!analytics) {
    analytics = await Analytics.create({});
  }
  return analytics;
};

// Protected: fetch analytics overview
router.get("/", checkAuth, async (req, res) => {
  try {
    const analytics = await getOrCreateAnalytics();
    return res.status(200).json({ analytics });
  } catch (error) {
    console.error("Analytics GET error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Public: increment visits
router.post("/track", async (req, res) => {
  try {
    const analytics = await Analytics.findOneAndUpdate(
      {},
      { $inc: { visits: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res
      .status(200)
      .json({ message: "Visit tracked successfully", analytics });
  } catch (error) {
    console.error("Analytics track error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Protected: manually update visits count
router.put("/visits", checkAuth, async (req, res) => {
  try {
    const { visits } = req.body;

    if (typeof visits !== "number" || visits < 0) {
      return res.status(400).json({ message: "Invalid visits value" });
    }

    const analytics = await Analytics.findOneAndUpdate(
      {},
      { visits },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res
      .status(200)
      .json({ message: "Visits updated successfully", analytics });
  } catch (error) {
    console.error("Analytics PUT visits error", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
