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
router.get('/proccesed', loansController.getProccesedLoans);

// POST request for proccesed loans
router.post('/proccesed', loansController.postProccesedLoans);

// DELETE request for pending loans
router.put('/proccesed', loansController.deleteProccesedLoans);

// GET request for loans
router.get('/:email', loansController.getUserLoans);

module.exports = router;