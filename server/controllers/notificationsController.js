const { addUserNotifications, deleteUserNotifications } = require('../utils/firebase/firebasePostUtils');
const { getUserNotifications } = require('../utils/firebase/firebaseGetUtils')
const { sendNotificationToAll, sendNotificationToClient } = require('./sse/notificationsHandler');

// GET request handler to retrieve notifications
exports.getUserNotifications = async (req, res) => {
    const { email } = req.params
    try {
      const notifications = await getUserNotifications(email)
      res.json(notifications)
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

    const promises = emails.map(email => addUserNotifications(email.email, message));
    try {
        await Promise.all(promises);
    } catch (error) {
        console.error('One or more notifications failed:', error);
    }
    
    if(emails.some(item => item.email === 'all')){
      sendNotificationToAll('get')
    }
    else {
      emails.forEach(item => sendNotificationToClient(item.email, 'get'));
    }
    
    return res.status(201).json({ success: true, message: 'Notifications send' })
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// PUT request handler to delete notifications
exports.deleteNotifications = async (req, res) => {
  try {
    const { email } = req.params

    if (!email ) {
      return res.status(404).json({ error: 'Error in params' })
    }

    await deleteUserNotifications(email)
    
    return res.status(201).json({ success: true, message: 'Notifications cleared' });
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}