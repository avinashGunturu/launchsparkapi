const express = require('express');
const router = express.Router();
const { submitGetQuote, getAllQuotes } = require('../controllers/getQuoteController');

router.post('/get-quote', submitGetQuote);
router.post('/get-all-quotes', getAllQuotes);

module.exports = router;
