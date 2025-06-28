const mongoose = require('../db');

const EstimateSchema = new mongoose.Schema({
  projectData: {
    type: {
      name:              { type: String, required: true, trim: true },
      type:              { type: String, required: true },
      complexity:        { type: String, enum: ['low', 'medium', 'high'], required: true },
      deadline:          { type: Date },
      description:       { type: String, trim: true }
    },
    required: true
  },
  teamData: {
    type: {
      developers:       { type: Number, min: 1, required: true },
      designers:        { type: Number, min: 0, default: 0 },
      projectManagers:  { type: Number, min: 0, default: 0 },
      hourlyRates: {
        developer:      { type: Number, min: 0, required: true },
        designer:       { type: Number, min: 0, default: 0 },
        projectManager: { type: Number, min: 0, default: 0 }
      }
    },
    required: true
  },
  estimate: {
    type: {
      totalHours:       { type: Number, min: 0, required: true },
      totalCost:        { type: Number, min: 0, required: true },
      breakdown: {
        development:    { type: Number, min: 0 },
        design:         { type: Number, min: 0 },
        management:     { type: Number, min: 0 }
      }
    },
    required: true
  },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Estimate', EstimateSchema);