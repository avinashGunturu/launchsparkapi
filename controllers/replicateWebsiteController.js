const ReplicateWebsite = require('../models/ReplicateWebsite');
const { sendConfirmationEmail } = require('../utils/email');
const { getFilledEmailTemplate } = require('../utils/utils');

exports.submitReplicateWebsite = async (req, res) => {
  try {
    const replicate = new ReplicateWebsite(req.body);
    await replicate.save();

    const mailVariables = {
      name: replicate.fullName,
      email: replicate.email,
      phone: replicate.mobileNumber,
      website: replicate.projectName,
      price: replicate.estimatedPrice,
      message: replicate.additionalNotes
    };
    const emailHtml = getFilledEmailTemplate('replicateWebsite', mailVariables);
    const emailResult = await sendConfirmationEmail(replicate.email, 'Website Replication Confirmation', emailHtml);

    if (emailResult.success) {
      replicate.emailSent = true;
      await replicate.save();
    }

    res.json({ code:0,success: true, message: 'Website replication request submitted.', data: replicate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code:1,success: false, message: 'Error submitting website replication request.', error: error.message });
  }
};

exports.getAllReplicateWebsite = async (req, res) => {
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
    const replicates = await ReplicateWebsite.find(filter);
    res.json({ code:0,success: true, data: replicates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code:1,success: false, message: 'Error fetching website replication requests.', error: error.message });
  }
};
