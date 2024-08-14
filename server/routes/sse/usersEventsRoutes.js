const express = require('express');
const router = express.Router();
const usersHandler = require('../../controllers/sse/usersHandler');

router.get('/', usersHandler.usersEventsHandler)

module.exports = router;