const crypto = require('crypto')

// Función para cifrar un JSON
function encryptJson(jsonObject, key) {
    const jsonString = JSON.stringify(jsonObject)
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
    let encrypted = cipher.update(jsonString, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    const authTag = cipher.getAuthTag().toString('hex')

    return {
        iv: iv.toString('hex'),        
        encryptedData: encrypted,      
        authTag: authTag               
    }
}

// Función para descifrar un JSON
function decryptJson(encryptedData, key, iv, authTag) {
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'))
    decipher.setAuthTag(Buffer.from(authTag, 'hex'))

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return JSON.parse(decrypted)
}

// Generar una clave segura de 256 bits (32 bytes)
function generateKey() {
    return crypto.randomBytes(32)
}

module.exports = {
    encryptJson,
    decryptJson,
    generateKey
}
