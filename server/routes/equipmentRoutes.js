const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

// GET request for equipment
router.get('/', equipmentController.getEquipment);

// POST request to add products
router.post('/', () => {});

// GET request to update equipment
router.put('/', () => {});

module.exports = router;
