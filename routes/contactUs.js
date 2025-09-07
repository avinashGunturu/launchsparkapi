const express = require('express');
const router = express.Router();
const { submitContactUs, getAllContactUs } = require('../controllers/contactUsController');

router.post('/contact-us', submitContactUs);
router.post('/get-all-contact-us', getAllContactUs);

module.exports = router;
