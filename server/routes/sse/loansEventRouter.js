const express = require('express');
const router = express.Router();
const loansHandler = require('../../controllers/sse/loansHandler');

router.get('/:email', loansHandler.loansEventsHandler)

module.exports = router;