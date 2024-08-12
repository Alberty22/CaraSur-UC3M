const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// GET request for users
router.get('/', usersController.getUsers);

// POST request to add an user
router.post('/signup', usersController.addUser);

// POST request to check user
router.post('/login', () => {});

// GET request for user information
router.get('/information/:email', usersController.getUserDetails);

// PUT request to update information
router.put('/information', usersController.updateUser);

module.exports = router;