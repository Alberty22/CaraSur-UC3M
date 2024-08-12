const { readJsonFile, writeJsonFile, deleteJsonEntry } = require('../utils/databaseUtils');
const { generateActivityId } = require('../utils/identifierUtils')
const path = require('path');
const activitiesPath = path.join(__dirname, '../data/activities.json');
const pendingActivitiesPath = path.join(__dirname, '../data/pending-activites.json');

// GET request handler
exports.getActivities = async (req, res) => {
  try {
    const activities = await readJsonFile(activitiesPath);
    res.json(activities);

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

    const newActivity = { ...activity }
    newActivity.id = parseInt(generateActivityId(activities))
    newActivity.drive = drive

    activities.push(newActivity)

    await deleteJsonEntry(pendingActivitiesPath, activity)

    await writeJsonFile(activitiesPath, activities)

    res.status(201).json({ success: true, message: 'Activity Accepted' })

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

    await writeJsonFile(pendingActivitiesPath, activities)

    res.status(201).json({ success: true, message: 'Activity Added' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
