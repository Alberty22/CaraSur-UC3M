const express = require('express');
const router = express.Router();
const notificationsHandler = require('../../controllers/sse/notificationsHandler');

router.get('/:email', notificationsHandler.notificationEventsHandler)

module.exports = router;