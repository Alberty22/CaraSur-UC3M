const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-ctr';
const secretKey = process.env.CRYPTO_KEY;
const iv = crypto.randomBytes(16);

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv)
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

function decrypt(hash) {
    const [iv, content] = hash.split(':');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(iv, 'hex'))
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()])
    return decrypted.toString()
}

module.exports = { 
    encrypt,
    decrypt
};