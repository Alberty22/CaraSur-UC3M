const fs = require('fs');
const path = require('path');
const pendingLoansPath = path.join(__dirname, '../data/pending-loans.json');
const proccessedLoansPath = path.join(__dirname, '../data/proccesed-loans.json');
const activitiesPath = path.join(__dirname, '../data/activities.json');


const readJsonFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return reject(err)
      try {
        resolve(JSON.parse(data))
      } 
      catch (parseError) {
        reject(parseError)
      }
    })
  })
}


const writeJsonFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

const updateJsonEntries = async (filePath, filterFn, updateFn) => {
  try {
    // Leer el archivo JSON
    const data = await readJsonFile(filePath)

    // Actualizar todas las entradas que coincidan con el filtro
    const updatedData = data.map(item => {
      if (filterFn(item)) {
        return updateFn(item)
      }
      return item
    })

    // Escribir el archivo JSON actualizado
    await writeJsonFile(filePath, updatedData)
  } 
  catch (error) {
    console.error('Error updating JSON:', error)
  }
}

const deleteJsonEntry = async (filePath, entryToDelete) => {
  try {
    // Leer el archivo JSON
    const data = await readJsonFile(filePath)

    // Filtrar las entradas, eliminando la que coincida con `entryToDelete`
    const filteredData = data.filter(item => JSON.stringify(item) !== JSON.stringify(entryToDelete))

    // Escribir el archivo JSON actualizado (sin la entrada eliminada)
    await writeJsonFile(filePath, filteredData)
  } 
  catch (error) {
    console.error('Error in delete JSON:', error)
  }
}

const updateUserRef = async (email, newEmail) => {
  try {
   
    const pendingLoans = await readJsonFile(pendingLoansPath)
    const proccesedLoans = await readJsonFile(proccessedLoansPath)
    const activities = await readJsonFile(activitiesPath)
    
    const newPendingLoans = pendingLoans.map(item => {
      if (item.user === email) {
          item.user = newEmail
      }
      return item
    })

    const newProccesedLoans = proccesedLoans.map(item => {
      if (item.user === email) {
          item.user = newEmail
      }
      return item
    })

      const newActivities = activities.map(item => {
        if (item?.users && item?.users.includes(email)) {
          item.users = item.users.map(user => (user === email ? newEmail : user))
        }
        return item
      })

      await writeJsonFile(pendingLoansPath, newPendingLoans)
      await writeJsonFile(proccessedLoansPath, newProccesedLoans)
      await writeJsonFile(activitiesPath, newActivities)
    
  } 
  catch (error) {
    console.error('Error updating JSON:', error)
  }
}

module.exports = {
  readJsonFile,
  writeJsonFile,
  updateJsonEntries,
  deleteJsonEntry,
  updateUserRef
}
