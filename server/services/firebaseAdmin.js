require('dotenv').config();

const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,

})

const db = admin.firestore()
const auth = admin.auth()
const FieldValue = admin.firestore.FieldValue
const bucket = admin.storage().bucket()
const fieldPath = admin.firestore.FieldPath.documentId()

module.exports = { db, auth, FieldValue, bucket, fieldPath }