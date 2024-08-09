const { readJsonFile, writeJsonFile } = require('../utils/databaseUtils');
const path = require('path');
const activitiesPath = path.join(__dirname, '../data/activities.json');

// GET request handler
exports.getActivities = async (req, res) => {
  try {
    const activities = await readJsonFile(activitiesPath);
    res.json(activities);

  } 
  
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST request handler
exports.addActivity = async (req, res) => {
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
};
