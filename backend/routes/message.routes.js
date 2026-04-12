const express = require("express");
const Message = require("../models/message");
const checkAuth = require("../middleware/auth.middleware");

const router = express.Router();

// Public: create a new message (contact form)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await Message.create({ name, email, message });
    return res
      .status(201)
      .json({ message: "Message sent successfully", data: newMessage });
  } catch (error) {
    console.error("Message POST error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Protected: get all messages
router.get("/", checkAuth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "Messages fetched successfully", messages });
  } catch (error) {
    console.error("Message GET all error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Protected: mark message as read/unread
router.patch("/:id/read", checkAuth, async (req, res) => {
  try {
    const { read = true } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    return res
      .status(200)
      .json({ message: "Message status updated", data: message });
  } catch (error) {
    console.error("Message PATCH read error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Protected: delete message
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    await message.deleteOne();
    return res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Message DELETE error", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
