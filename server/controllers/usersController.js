const { readJsonFile, writeJsonFile } = require('../utils/databaseUtils');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');

// GET request handler to retrieve all users
exports.getUsers = async (req, res) => {
  try {
    const users = await readJsonFile(usersPath);
    res.json(users);
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST request handler to add a new user
exports.addUser = async (req, res) => {
  try {
    // Log the body of the request (user data)
    console.log('Received user data:', req.body);

    const user = req.body;
    const users = await readJsonFile(usersPath);

    users.push(user);

    await writeJsonFile(usersPath, users);

    res.status(201).json({ success: true, message: 'User added successfully' });
  } 
  catch (error) {
    console.error('Error adding user:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
