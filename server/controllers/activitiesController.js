const { readJsonFile, writeJsonFile, deleteJsonEntry, updateJsonEntries } = require('../utils/databaseUtils');
const { addDocumentWithID, deleteDocumentWithID } = require('../utils/firebase/firebasePostUtils');
const { modifyUserArray } = require('../utils/firebase/firebaseUpdateUtils');
const { generateActivityId } = require('../utils/identifierUtils');
const { getAdminsEmails } = require('../utils/firebase/firebaseGetUtils');
const { adminActionEmail } = require('../utils/emailsUtils');

const path = require('path');
const activitiesPath = path.join(__dirname, '../data/activities.json');
const pendingActivitiesPath = path.join(__dirname, '../data/pending-activites.json');

// GET request handler
exports.getActivities = async (req, res) => {
  try {
    const activities = await readJsonFile(activitiesPath);
    res.json(activities)

  } 
  
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET request handler
exports.getStockActivities = async (req, res) => {
  try {
    const activities = await readJsonFile(activitiesPath);
    res.json(activities.slice(0, 11));

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET request handler
exports.getPendingActivities = async (req, res) => {
  try {
    const activities = await readJsonFile(pendingActivitiesPath);
    res.json(activities);

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// POST request handler 
exports.addActivity = async (req, res) => {
  
  try {
    const {activity, drive} = req.body

    if (!activity || !drive) {
      return res.status(404).json({ error: 'Error in activity' })
    }

    const activities = await readJsonFile(activitiesPath)

    const newActivity = { ...activity, users: [] }
    newActivity.id = parseInt(generateActivityId(activities))
    newActivity.drive = drive

    activities.push(newActivity)

    await deleteDocumentWithID('pending-activities', activity.id.toString())
    await addDocumentWithID('activities', newActivity.id.toString(), newActivity)

    await deleteJsonEntry(pendingActivitiesPath, activity)
    await writeJsonFile(activitiesPath, activities)

    res.status(201).json({ success: true, message: 'Activity Accepted' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// PUT request handler add or remove user in an activity
exports.updateUsersActivity = async (req, res) => {
  try {
    const { email , activityId, action} = req.body
    if (!email || !activityId || !action) {
      return res.status(404).json({ error: 'Error in params' })
    }

    const filterFn = activity => activity.id === activityId
    
    const updateFn = (activity) => {

      if (action === 'add') {
        if (!activity.users.includes(email)) {
          activity.users.push(email)
        }
        return activity
      }
      else if (action === 'delete') {
        activity.users = activity.users.filter(emailItem => emailItem !== email)
        return activity
      }
      else {
        return activity
      }
    }
    
    await modifyUserArray(activityId.toString(), action, email)
    await updateJsonEntries(activitiesPath, filterFn, updateFn)

    res.status(201).json({ success: true, message: 'Activity user Added' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// POST request handler to suggest a new activity
exports.addPendingActivity = async (req, res) => {
  try {
    const activity = req.body
    if (!activity) {
      return res.status(404).json({ error: 'Error product' })
    }

    const activities = await readJsonFile(pendingActivitiesPath)
    
    const newActivity= {
      "id": parseInt(generateActivityId(activities)),
      ...activity
    }

    activities.push(newActivity)

    await addDocumentWithID('pending-activities', newActivity.id.toString(), newActivity)
    await writeJsonFile(pendingActivitiesPath, activities)

    const adminEmails = await getAdminsEmails()
    adminEmails.forEach(email => {
      adminActionEmail(email, 'Se ha propuesto una nueva actividad','http://localhost:5000/es/admin/activities').catch(error => {
          console.error(`Failed to send email to ${email}:`, error);
        })
    })

    res.status(201).json({ success: true, message: 'Activity Added' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


// DELETE request handler to remove proccesed loans
exports.deleteActivity = async (req, res) => {
  try {
    
    const activity = req.body

    if (!activity) {
      return res.status(404).json({ error: 'Error in activity' })
    }

    await deleteDocumentWithID('pending-activities', activity.id.toString())
    await deleteJsonEntry(pendingActivitiesPath, activity)

    res.status(201).json({ success: true, message: 'Activity removed' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}