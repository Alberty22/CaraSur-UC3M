const fs = require('fs');
const path = require('path');

// Leer JSON desde un archivo
const readJsonFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return reject(err)
      try {
        resolve(JSON.parse(data))
      } catch (parseError) {
        reject(parseError)
      }
    })
  })
}

// Escribir JSON en un archivo
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
  } catch (error) {
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
  } catch (error) {
    console.error('Error al eliminar la entrada en el archivo JSON:', error)
  }
};

module.exports = {
  readJsonFile,
  writeJsonFile,
  updateJsonEntries,
  deleteJsonEntry
};
