const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');

// GET request for activities
router.get('/', activitiesController.getActivities)

// POST request to add an activity
router.post('/', activitiesController.addActivity)

// PUT request to add an activity
router.put('/', activitiesController.updateUsersActivity)

// GET request for stock activities
router.get('/stock', activitiesController.getStockActivities)

// GET request for pending activities
router.get('/pending', activitiesController.getPendingActivities)

// POST request to suggest an activity
router.post('/pending', activitiesController.addPendingActivity)

// PUT request decline an acitvity
router.put('/pending', activitiesController.deleteActivity)

module.exports = router;
