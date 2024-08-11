const { readJsonFile, writeJsonFile } = require('../utils/databaseUtils');
const path = require('path');
const equipmentPath = path.join(__dirname, '../data/equipment.json');


// GET request handler to retrieve pending loans
exports.getEquipment = async (req, res) => {
  
    try {
      const loans = await readJsonFile(equipmentPath)
      res.json(loans);
  
    } 
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }