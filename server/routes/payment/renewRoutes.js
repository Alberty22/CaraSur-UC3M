const express = require('express');
const router = express.Router();
const renewController = require('../../controllers/payment/renewController');

// POST request to add an user
router.post('/', renewController.renewUser);

module.exports = router;