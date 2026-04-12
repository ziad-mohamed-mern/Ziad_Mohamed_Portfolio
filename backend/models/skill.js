const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      category: { type: String, enum: ["frontend", "backend", "tools", "other"] },
      icon: { type: String } 
    },
    { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;