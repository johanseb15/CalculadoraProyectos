const mongoose = require('../db');
const EstimateSchema = new mongoose.Schema({
  projectData: Object,
  teamData: Object,
  estimate: Object,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Estimate', EstimateSchema);const Estimate = require('./models/Estimate');
// ...
const newEstimate = new Estimate({ projectData, teamData, estimate });
await newEstimate.save();