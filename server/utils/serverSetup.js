const fs = require('fs');
const path = require('path');
const { db } = require('../services/firebaseAdmin');

const dataDir = path.join(__dirname, '../data');

const setup  = async () => {
    const colections = [
      'activities',
      'pending-activities',
      'pending-loans',
      'processed-loans',
      'equipment'
    ]
  
    try {
        await clearDataDirectory()
        for (const colection of colections) {
            const data = await obtainData(colection)
            const filteredData = data.filter(doc => doc.id !== 'empty')
            saveJson(colection, filteredData)
        }
        console.log('Setup done correcly')
    } catch (error) {
        console.error('Error in setup:', error)
    }
}

const clearDataDirectory = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir(dataDir, (err, files) => {
            if (err) {
                return reject(err);
            }
            const deletePromises = files.map(file => 
                fs.promises.unlink(path.join(dataDir, file))
            )
            Promise.all(deletePromises)
                .then(() => resolve())
                .catch(reject);
        })
    })
}
  
const obtainData = async (coleccion) => {
    const snapshot = await db.collection(coleccion).get()
    const data = []
    
    snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() })
    })
  
    return data
  }
  
const saveJson = (colection, data) => {
    const route = path.join(__dirname, `../data/${colection}.json`)
    fs.writeFileSync(route, JSON.stringify(data, null, 2))
}
  
module.exports = {
    setup
}