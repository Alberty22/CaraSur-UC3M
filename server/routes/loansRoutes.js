const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loansController');



// GET request for pending loans
router.get('/pending', loansController.getPendingLoans);

// DELETE request for pending loans
router.delete('/pending', () => {});

// GET request for proccesed loans
router.get('/proccesed', loansController.getProccesedLoans);

// POST request for proccesed loans
router.post('/proccesed', () => {});

// GET request for loans
router.get('/:email', loansController.getUserLoans);

module.exports = router;