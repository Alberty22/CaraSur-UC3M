const { getUserDetails, getUsers, getRoleAndName } = require('../utils/firebase/firebaseGetUtils');
const { updloadUserFirebase } = require('../utils/firebase/firebasePostUtils');
const { updateUserFirebase } = require('../utils/firebase/firebaseUpdateUtils');
const { sendUsersToAll } = require('./sse/usersHandler');
const { notificationClients } = require('./sse/notificationsHandler');
const { loansClients } = require('./sse/loansHandler');
const { sendWelcomeEmail } = require('../utils/emailsUtils');
const { createCheckout } = require('../services/paymentService')

const { auth } = require('../services/firebaseAdmin');



// GET request handler to retrieve all users
exports.getUsers = async (req, res) => {
  try {
    const simplifiedUsers = await getUsers()
    res.status(201).json(simplifiedUsers)
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// GET request handler to retrieve user details based on email
exports.getUserDetails = async (req, res) => {
  const { email } = req.params
  try {

    const data = await getUserDetails(email)
    const details = data.reduce((acc, item) => {
      const key = Object.keys(item)[0];
      acc[key] = item[key];
      return acc;
    }, {})

    if(details) {
      res.json({
        "accountDetails": {email: email, password: '*******'},
        ...details
      })
    }
    else {
      res.json({})
    }
    
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// POST request handler to add a new user
exports.addUser = async (req, res) => {
  try {
    const user = req.body

    const newUser = {
      email: user.email,
      role: user.role,
      details: user.details,
      notifications: {"1": {"id": "1","text": "Bienvenido a club CaraSur"}},
      loans:  {}
    }

    const url = await createCheckout({email: user.email, password: user.password, newUser:newUser})
    if(!url) {
      return res.status(404).json({ error: 'Error at checkout' })
    }
    
    res.status(201).json({ success: true, message: url })
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.loginUser = async (req, res) => {
  const { email, token} = req.body
  try {
    const decodedToken = await auth.verifyIdToken(token)
    const uid = decodedToken.uid

    
    const { role, name } = await getRoleAndName(email)
    res.status(201).json({ success: true, message: { role: role, name:name }})
  } 
  catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: 'Invalid token' });
  }
}


// PUT request handler to update user information
exports.updateUser = async (req, res) => {
  try {
    const { email, accountDetails, userDetails, userOptionalDetails, preferences, idPhoto } = req.body

    if ((!accountDetails && !userDetails && !userOptionalDetails && !preferences && !idPhoto) || !email) {
      return res.status(404).json({ error: 'Error in params' })
    }

    await updateUserFirebase("users", email, req.body)

    if(accountDetails) {
      notificationClients.forEach((client, index) => {
        if (client.id === email) {
          notificationClients[index].id = accountDetails.email
        }
      })
      loansClients.forEach((client, index) => {
        if (client.id === email) {
          loansClients[index].id = accountDetails.email
        }
      })
      
    }
    sendUsersToAll('get')

    res.status(201).json({ success: true, message: 'User updated successfully' })
      
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}