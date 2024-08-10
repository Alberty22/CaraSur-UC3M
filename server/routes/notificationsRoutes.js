const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');

// GET request for notifications
router.get('/:email', notificationsController.getUserNotifications);

router.delete('/:email', () => {});

router.post('/', () => {});

module.exports = router;