const { readJsonFile, writeJsonFile, updateJsonEntries, updateUserRef } = require('../utils/databaseUtils');
const { updloadUserFirebase, updateUserFirebase } = require('../utils/firebaseUtils');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');
const { auth } = require('../firebaseAdmin');



// GET request handler to retrieve all users
exports.getUsers = async (req, res) => {
  try {
    const users = await readJsonFile(usersPath)
    
    const simplifiedUsers = users.map(user => {
      const { email, role, ...others } = user
      return {
        email: email,
        role: role
      }
    })

    res.json(simplifiedUsers)
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// GET request handler to retrieve user details based on email
exports.getUserDetails = async (req, res) => {
  const { email } = req.params
  try {
    const users = await readJsonFile(usersPath)
    const user = users.find(user => user.email === email)
    if (user) {
      const { idPhoto, ...filteredDetails } = user.details
      res.json({
        "accountDetails": {email: user.email, password: '*******'},
        ...filteredDetails
      });
    } else {
      res.status(404).json({ error: 'User not found' })
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
    const users = await readJsonFile(usersPath)

    const newUser = {
      email: user.email,
      role: user.role,
      details: user.details,
      notifications: {"1": {"id": "1","text": "Bienvenido a club CaraSur"}},
      loans:  {}
    };

    const userRecord = await auth.createUser({
      email: user.email,
      password: user.password,
    })

    const status = await updloadUserFirebase("users", newUser.email, newUser)
    if(!status) {
      return res.status(404).json({ error: 'Error uploading data' })
    }

    users.push(newUser)

    await writeJsonFile(usersPath, users)

    res.status(201).json({ success: true, message: 'User added successfully' })
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

    const users = await readJsonFile(usersPath)
    const user = users.find(user => user.email === email)

    if (user) {
      const { role, details } = user
      return res.json({ success: true, message: { role: role, name:details.userDetails.name }})
    } 
    else {
      return res.status(404).json({ error: 'User not found' })
    }

    
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

    const users = await readJsonFile(usersPath)
    const user = users.find(user => user.email === email)

    if (user) {
      const filterFn = user => user.email === email
    
      const updateFn = (user) => {
        if(accountDetails) {
          if(accountDetails?.email !== user.email) {
            updateUserRef(email, accountDetails.email)
            user.email = accountDetails.email
          }
          
        }
        if(userDetails) {
          user.details.userDetails = userDetails
        }
        if(userOptionalDetails) {
            for (let key in userOptionalDetails) {
                if (userOptionalDetails[key] !== "") {
                  user.details.userOptionalDetails[key] = userOptionalDetails[key]
                }
            }
        }
        if(preferences) {
          user.details.preferences = preferences
        }
        if (idPhoto) {
          user.details.idPhoto = idPhoto
        }
        return user
      }

      await updateUserFirebase("users", email, req.body)

      await updateJsonEntries(usersPath, filterFn, updateFn)

      res.status(201).json({ success: true, message: 'User updated successfully' })
      
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}