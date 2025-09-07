const mongoose = require('mongoose');

const ReplicateWebsiteSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  estimatedPrice: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  additionalNotes: { type: String },
  emailSent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ReplicateWebsite', ReplicateWebsiteSchema);
