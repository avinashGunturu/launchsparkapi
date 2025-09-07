const ContactUs = require('../models/ContactUs');
const { sendConfirmationEmail } = require('../utils/email');
const { getFilledEmailTemplate } = require('../utils/utils');

exports.submitContactUs = async (req, res) => {
  try {
    const contact = new ContactUs(req.body);
    await contact.save();

    const mailVariables = {
      name: contact.fullName,
      email: contact.email,
      phone: contact.mobileNumber,
      service: contact.serviceOfInterest,
      message: contact.projectDescription,
      launchPadPackage:contact.launchPadPackage
    };

    const emailHtml = getFilledEmailTemplate('contactUs', mailVariables);
    const emailResult = await sendConfirmationEmail(contact.email, 'Contact Confirmation', emailHtml);

    if (emailResult.success) {
      contact.emailSent = true;
      await contact.save();
    }

    res.json({ code:0,success: true, message: 'Contact request submitted.', data: contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code:1,success: false, message: 'Error submitting contact request.', error: error.message });
  }
};

exports.getAllContactUs = async (req, res) => {
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
    const contacts = await ContactUs.find(filter);
    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching contact requests.', error: error.message });
  }
};
