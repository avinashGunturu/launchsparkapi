const mongoose = require('mongoose');

const GetQuoteSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  numberOfPages: { type: String, required: true },
  budgetRange: { type: String, required: true },
  projectDescription: { type: String, required: true },
  emailSent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('GetQuote', GetQuoteSchema);
