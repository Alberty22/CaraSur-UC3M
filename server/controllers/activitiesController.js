const { addDocument, deleteDocumentWithID } = require('../utils/firebase/firebasePostUtils');
const { getCollectionData, getStockActivities } = require('../utils/firebase/firebaseGetUtils');
const { modifyUserArray } = require('../utils/firebase/firebaseUpdateUtils');
const { getAdminsEmails } = require('../utils/firebase/firebaseGetUtils');
const { adminActionEmail } = require('../utils/emailsUtils');
const { getOrCacheData, deleteCacheList } = require('../services/redisService');

// GET request handler
exports.getActivities = async (req, res) => {
  try {
    const activities = await getOrCacheData('activities', getCollectionData);

    res.json(activities)

  } 
  
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET request handler
exports.getStockActivities = async (req, res) => {
  try {
    const activities = await getStockActivities();
    res.json(activities.slice(0, 11));

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET request handler
exports.getPendingActivities = async (req, res) => {
  try {
    const activities = await getCollectionData('pending-activities');
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
    const { id, ...simpleActivity } = activity

    const newActivity = { ...simpleActivity, users: [] }
    newActivity.drive = drive

    await deleteDocumentWithID('pending-activities', id.toString())
    await addDocument('activities', newActivity)

    await deleteCacheList('activities')

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
    
    await modifyUserArray(activityId.toString(), action, email)

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

    await addDocument('pending-activities', activity)

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


// DELETE request handler to remove activity
exports.deleteActivity = async (req, res) => {
  try {
    
    const activity = req.body

    if (!activity) {
      return res.status(404).json({ error: 'Error in activity' })
    }

    await deleteDocumentWithID('pending-activities', activity.id.toString())

    res.status(201).json({ success: true, message: 'Activity removed' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}