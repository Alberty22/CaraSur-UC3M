const { bucket } = require('../services/firebaseAdmin');

const filterObject = (obj) => {

    return Object.fromEntries(
        Object.entries(obj).filter(([clave, valor]) => valor !== "" && valor !== undefined)
    )
}

const base64ToBuffer = (base64) => {
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
    return Buffer.from(base64Data, 'base64')
  }

const uploadBase64Image = async (base64, filePath) => {
    
    try {
        
        const buffer = base64ToBuffer(base64);
        const file = bucket.file(filePath);

        await file.save(buffer, { contentType: 'image/png' });

        await file.makePublic();

        const publicURL = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

        return publicURL;
    } catch (error) {
        console.error('Error al subir la imagen Base64:', error);
        throw error;
    }
}

module.exports = {
    filterObject,
    uploadBase64Image
}