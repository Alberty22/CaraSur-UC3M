const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// GET request for admin
router.get('/', adminController.getAdmin);

// PUT request to update information
router.put('/', adminController.updateAdmin);

router.post('/', adminController.postAdminRole)

module.exports = router;