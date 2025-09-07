const GetQuote = require('../models/GetQuote');
const { sendConfirmationEmail } = require('../utils/email');
const { getFilledEmailTemplate } = require('../utils/utils');

exports.submitGetQuote = async (req, res) => {
  try {
    const quote = new GetQuote(req.body);
    await quote.save();

    const mailVariables = {
      name: quote.fullName,
      email: quote.email,
      phone: quote.mobileNumber,
      pages: quote.numberOfPages,
      budget: quote.budgetRange,
      message: quote.projectDescription
    };
    const emailHtml = getFilledEmailTemplate('getQuote', mailVariables);
    const emailResult = await sendConfirmationEmail(quote.email, 'Quote Confirmation', emailHtml);

    if (emailResult.success) {
      quote.emailSent = true;
      await quote.save();
    }

    res.json({ code:0,success: true, message: 'Quote request submitted.', data: quote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code:1,success: false, message: 'Error submitting quote request.', error: error.message });
  }
};

exports.getAllQuotes = async (req, res) => {
  try {
    const filter = {};
    if (req.body.email) {
      filter.email = { $regex: req.body.email, $options: 'i' };
    }
    if (req.body.name) {
      filter.fullName = { $regex: req.body.name, $options: 'i' };
    }
    if (req.body.phone) {
      filter.mobileNumber = { $regex: req.body.phone, $options: 'i' };
    }
    const quotes = await GetQuote.find(filter);
    res.json({ success: true, data: quotes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching quote requests.', error: error.message });
  }
};
