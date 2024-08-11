const { readJsonFile, writeJsonFile } = require('../utils/databaseUtils');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');
const pendingLoansPath = path.join(__dirname, '../data/pending-loans.json');
const proccessedLoansPath = path.join(__dirname, '../data/proccesed-loans.json');

// GET request handler to retrieve user loans
exports.getUserLoans = async (req, res) => {
    const { email } = req.params
    try {
      const users = await readJsonFile(usersPath)
      const user = users.find(user => user.email === email)
      if (user) {
        res.json(user.loans);
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } 
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

// GET request handler to retrieve pending loans
exports.getPendingLoans = async (req, res) => {
  
  try {
    const loans = await readJsonFile(pendingLoansPath)
    res.json(loans);

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// GET request handler to retrieve pending loans
exports.getProccesedLoans = async (req, res) => {
  
  try {
    const loans = await readJsonFile(proccessedLoansPath)
    res.json(loans);

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}