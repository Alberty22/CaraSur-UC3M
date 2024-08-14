require('dotenv').config();

const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'tfg-carasur.appspot.com',
})

const db = admin.firestore()
const auth = admin.auth()
const FieldValue = admin.firestore.FieldValue
const bucket = admin.storage().bucket()

module.exports = { db, auth, FieldValue, bucket }