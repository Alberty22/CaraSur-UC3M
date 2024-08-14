const { readJsonFile, writeJsonFile} = require('../utils/databaseUtils');
const { updateDocumentWithID } = require('../utils/firebase/firebaseUpdateUtils');
const { sendUsersToAll } = require('./sse/usersHandler');
const path = require('path');
const adminPath = path.join(__dirname, '../data/admin.json');

// GET request handler to retrieve all users
exports.getAdmin = async (req, res) => {
    try {
      const admin = await readJsonFile(adminPath)
  
      res.json(admin)
    } 
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

// PUT request handler to update user information
exports.updateAdmin = async (req, res) => {
    
    try {
        const { email, billingAcount } = req.body
    
        if (!email && !billingAcount) {
            return res.status(404).json({ error: 'Error in params' })
        }
        
        const admin = await readJsonFile(adminPath)

        if(email) {
            admin.email = email
        }
        
        if(billingAcount) {
            admin.billingAcount = billingAcount
        }
        
        await updateDocumentWithID("admin", "admin", {email: email , billingAcount: billingAcount})
        await writeJsonFile(adminPath, admin)

        res.status(201).json({ success: true, message: 'Admin updated successfully' })
        
    } 
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

exports.postAdminRole = async (req, res) => {
  try {
      const { email, role } = req.body
  
      if (!email) {
          return res.status(404).json({ error: 'Error in params' })
      }
      
      await updateDocumentWithID("users", email, {role: role})

      sendUsersToAll('get')

      res.status(201).json({ success: true, message: 'Admin updated successfully' })
      
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
