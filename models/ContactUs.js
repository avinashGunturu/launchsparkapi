const mongoose = require('mongoose');

const ContactUsSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  serviceOfInterest: { type: String, required: true },
  launchPadPackage: { type: String },
  projectDescription: { type: String, required: true },
  emailSent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ContactUs', ContactUsSchema);
