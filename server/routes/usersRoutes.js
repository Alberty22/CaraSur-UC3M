const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// GET request for users
router.get('/', usersController.getUsers);

// POST request to add an user
router.post('/signup', usersController.addUser);


module.exports = router;