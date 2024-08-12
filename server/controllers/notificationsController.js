const { readJsonFile, writeJsonFile, updateJsonEntries } = require('../utils/databaseUtils');
const { generateNotificationId } = require('../utils/identifierUtils');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');

// GET request handler to retrieve notifications
exports.getUserNotifications = async (req, res) => {
    const { email } = req.params
    try {
      const users = await readJsonFile(usersPath)
      const user = users.find(user => user.email === email)
      if (user) {
        res.json(user.notifications);
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } 
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

// POST request handler to send notifications
exports.postNotifications = async (req, res) => {
  const { emails, message } = req.body
  
  try {
    if (!emails || !message) {
      return res.status(404).json({ error: 'Error in params' })
    }

    const emailsList = emails.map(email => email.email)
    let filterFn
    
    if (emailsList.includes("all")) {
      filterFn = () => true
    } 
    else  {
      filterFn = user => emailsList.includes(user.email)
    }
    
    const updateFn = (user) => {
      const newNotificationId = generateNotificationId(user)
      user.notifications[newNotificationId] = {
        id: newNotificationId,
        text: message
      }
      return user
    }

    await updateJsonEntries(usersPath, filterFn, updateFn);

    return res.status(201).json({ success: true, message: 'Notifications send' })
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.deleteNotifications = async (req, res) => {
  try {
    const { email } = req.params
    const users = await readJsonFile(usersPath)

    if (!email || !(users.find(user => user.email === email))) {
      return res.status(404).json({ error: 'Error in params' })
    }

    const filterFn = user => user.email === email
  
    const updateFn = (user) => {
      user.notifications = {}
      return user
    }

    await updateJsonEntries(usersPath, filterFn, updateFn)

    return res.status(201).json({ success: true, message: 'Notifications cleared' });
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}