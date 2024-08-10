const { readJsonFile, writeJsonFile } = require('../utils/databaseUtils');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');

// GET request handler to retrieve user details based on email
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