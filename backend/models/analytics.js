const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    visits: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);
module.exports = Analytics;
