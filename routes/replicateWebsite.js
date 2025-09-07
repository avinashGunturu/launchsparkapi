const express = require('express');
const router = express.Router();
const { submitReplicateWebsite, getAllReplicateWebsite } = require('../controllers/replicateWebsiteController');

router.post('/replicate-website', submitReplicateWebsite);
router.post('/get-all-replicate-website', getAllReplicateWebsite);

module.exports = router;
