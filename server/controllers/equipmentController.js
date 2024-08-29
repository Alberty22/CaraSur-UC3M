require('dotenv').config();

const { addDocument } = require('../utils/firebase/firebasePostUtils');
const { updateDocumentWithID } = require('../utils/firebase/firebaseUpdateUtils');
const { getCollectionData } = require('../utils/firebase/firebaseGetUtils');
const { uploadBase64Image } = require('../utils/objectUtils');
const { getOrCacheData, deleteCacheList } = require('../services/redisService');

// GET request handler to retrieve equipment
exports.getEquipment = async (req, res) => {
  
    try {
      const equipment = await getOrCacheData('equipment', getCollectionData);
      res.status(201).json(equipment);
  
    } 
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// POST request handler to add new products
exports.postEquipment = async (req, res) => {
  const product = req.body;
  try {

    if (!product) {
      return res.status(404).json({ error: 'Error in params' });
    }

    const newProduct = {
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

    const id = await addDocument('equipment', newProduct);

    if (product.photo) {
      const filePath = `equipment/${id}.png`;
      try {
        const photoURL = await uploadBase64Image(product.photo.base64, filePath);
        newProduct.photo = photoURL;
      } 
      catch (error) {
        console.error(error)
        newProduct.photo = process.env.STOCK_PHOTO;
      }
    } else {
      newProduct.photo = process.env.STOCK_PHOTO;
    }

    await updateDocumentWithID('equipment', id, {"id": id, "photo": newProduct.photo})

    await deleteCacheList('equipment')

    res.status(201).json({ success: true, message: 'Product Added' })

  } 
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}