const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');

// GET request for activities
router.get('/', activitiesController.getActivities);

// POST request to add an activity
router.post('/', activitiesController.addActivity);

module.exports = router;
