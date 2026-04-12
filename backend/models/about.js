const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: {
      en: { type: String, required: true },
      ar: { type: String, required: true }
    },
    profileImage: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    cvLink: { type: String }
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);
module.exports = About;
