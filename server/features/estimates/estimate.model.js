// Estimate model
const { Schema, model } = require('mongoose');

// TODO: flesh out fields
const estimateSchema = new Schema({}, { timestamps: true });

module.exports = model('Estimate', estimateSchema);