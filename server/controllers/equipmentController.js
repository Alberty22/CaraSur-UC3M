const { readJsonFile, writeJsonFile } = require('../utils/databaseUtils');
const { generateProductId } = require('../utils/identifierUtils');
const { addDocumentWithID } = require('../utils/firebase/firebasePostUtils');
const { uploadBase64Image } = require('../utils/objectUtils')
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

exports.postEquipment = async (req, res) => {
  const product = req.body
  try {

    if (!product) {
      return res.status(404).json({ error: 'Error product' })
    }

    const equipment = await readJsonFile(equipmentPath)

    const newProduct = {
      "id": parseInt(generateProductId(equipment)),
      "comments": "",
      "description": product.description || null,
      "size": product.size || null,
      "object": product.object || null,
      "quantity": parseInt(product.quantity) || null,
      "category": product.category || null,
      "length": product.length || null,
      "model": product.model || null,
      "condition": product.condition || null,
      "photo": product.photo || null,
      "available": parseInt(product.available) || null
    }
    
    if (product.photo) {
      const filePath = `equipment/${newProduct.id}.png`;
      try {
        const photoURL = await uploadBase64Image(product.photo.base64, filePath)
        newProduct.photo = photoURL
      } 
      catch (error) {
        console.error(error)
        newProduct.photo = "https://firebasestorage.googleapis.com/v0/b/tfg-carasur.appspot.com/o/equipment%2FStock-product.webp?alt=media&token=e557dcc8-3ee0-410c-8542-357ae3d543a0"
      }
    } else {
      newProduct.photo = "https://firebasestorage.googleapis.com/v0/b/tfg-carasur.appspot.com/o/equipment%2FStock-product.webp?alt=media&token=e557dcc8-3ee0-410c-8542-357ae3d543a0"
    }
    
    equipment.push(newProduct)

    await addDocumentWithID('equipment', newProduct.id.toString(), newProduct)
    await writeJsonFile(equipmentPath, equipment)

    res.status(201).json({ success: true, message: 'Product Added' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}