const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loansController');



// GET request for pending loans
router.get('/pending', loansController.getPendingLoans);

// POST request for pending loans
router.post('/pending', loansController.postPendingLoans);

// DELETE request for pending loans
router.put('/pending', loansController.deletePendingLoans);

// GET request for proccesed loans
router.get('/processed', loansController.getProcessedLoans);

// POST request for proccesed loans
router.post('/processed', loansController.postProcessedLoans);

// DELETE request for pending loans
router.put('/processed', loansController.deleteProcessedLoans);

// GET request for loans
router.get('/:email', loansController.getUserLoans);

module.exports = router;