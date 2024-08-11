const { readJsonFile, writeJsonFile } = require('../utils/databaseUtils');
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
  const activity = req.body
  try {

    if (!activity) {
      return res.status(404).json({ error: 'Error product' })
    }

    const activities = await readJsonFile(pendingActivitiesPath)


    await writeJsonFile(pendingActivitiesPath, activity)

    res.status(201).json({ success: true, message: 'Product Added' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// POST request handler
exports.addPendingActivity = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const activities = await readJsonFile(activitiesPath);
    const newActivity = { id: activities.length + 1, name };
    activities.push(newActivity);
    await writeJsonFile(activitiesPath, activities);
    res.status(201).json(newActivity);

  } 
  
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
