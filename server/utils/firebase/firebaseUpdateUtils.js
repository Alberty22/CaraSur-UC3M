const { db, auth, FieldValue } = require('../../firebaseAdmin');
const { filterObject } = require('../objectUtils');

async function deleteDocumentAndSubcollections(docRef) {
    const collections = await docRef.listCollections()
    
    for (const collection of collections) {
        const snapshot = await collection.get()
        const batch = db.batch()

        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref)
        });

        await batch.commit()
    }

    await docRef.delete()
}

// Function to copy sub collections
async function copySubcollections(docRef, newDocRef) {
    const subcollections = await docRef.listCollections()
    
    for (const subcollection of subcollections) {
        const subcollectionDocs = await subcollection.get()

        for (const doc of subcollectionDocs.docs) {
            const newSubcollectionRef = newDocRef.collection(subcollection.id).doc(doc.id)
            await newSubcollectionRef.set(doc.data())
            await copySubcollections(doc.ref, newSubcollectionRef)
        }
    }
}

// Function to replace id collection
async function copyDocumentWithCollections(docRef, newDocRef) {
    try {
        const docSnapshot = await docRef.get()
        
        if (!docSnapshot.exists) {
            throw new Error('Document does not exist')
        }

        await newDocRef.set(docSnapshot.data());

        const subcollections = await docRef.listCollections()

        for (const subcollection of subcollections) {

            const subcollectionDocs = await subcollection.get()

            for (const doc of subcollectionDocs.docs) {
                
                const newSubcollectionRef = newDocRef.collection(subcollection.id).doc(doc.id)

                await newSubcollectionRef.set(doc.data())

                await copySubcollections(doc.ref, newSubcollectionRef)
            }
        }

        deleteDocumentAndSubcollections(docRef)

    } 
    catch (error) {
        console.error('Error al copiar el documento: ', error);
    }
}

//Function to update user secrets
async function updateUserAuth(oldEmail, newEmail, newPassword) {
    try {
      
        const userRecord = await auth.getUserByEmail(oldEmail)
        const uid = userRecord.uid
  
        const updates = {}

        if (oldEmail !== newEmail) {
        updates.email = newEmail;
        }

        if (newPassword) {
        updates.password = newPassword;
        }

        if (Object.keys(updates).length > 0) {
            await auth.updateUser(uid, updates);
        }
  
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

const updateEmailInCollection = async (collection, oldEmail, newEmail) => {
    try {
        const collectionRef = db.collection(collection)
        
        const querySnapshot = await collectionRef.where('user', '==', oldEmail).get()
        
        if (querySnapshot.empty) {
            return
        }

        const updatePromises = querySnapshot.docs.map(doc => {
            return doc.ref.update({ user: newEmail })
        })

        await Promise.all(updatePromises)

    } catch (error) {
        console.error(error)
    }
}

//Function to update user information
const updateUserFirebase = async (collection, documentId, data) => {
    
    try {
        const { email, accountDetails, userDetails, userOptionalDetails, preferences, idPhoto} = data

        const docRef = db.collection(collection).doc(documentId)
        const detailsRef = db.collection(collection).doc(documentId).collection('details')

        if(userDetails) {
            await detailsRef.doc('userDetails').update(userDetails)
        }

        if (userOptionalDetails) {
            await detailsRef.doc('userOptionalDetails').update(filterObject(userOptionalDetails))
        }

        if(preferences) {
            await detailsRef.doc('preferences').update(preferences)
        }

        if(idPhoto) {
            await detailsRef.doc('idPhoto').update(idPhoto)
        }

        if(accountDetails) {
            await docRef.update({email: accountDetails.email})

            const newDocRef = db.collection(collection).doc(accountDetails.email)

            copyDocumentWithCollections(docRef,newDocRef)
            
            updateUserAuth(email, accountDetails.email, accountDetails.password)

            updateEmailInCollection('pending-loans', email, accountDetails.email)
            updateEmailInCollection('proccesed-loans', email, accountDetails.email)
        }

        return true
    } catch (error) {
        console.error("Error updating user data:", error);
        return false;
    }
}

//Function to update data
const updateDocumentWithID = async(collection, documentId, data) => {
    try {
      // Obtén una referencia al documento
      const docRef = db.collection(collection).doc(documentId);
      
      // Actualiza el documento con los datos proporcionados
      await docRef.update(filterObject(data))
      
    } 
    catch (error) {
      console.error(error)
    }
}

//Function to add or remove users from an activity
const modifyUserArray = async (documentId, action, email) => {
    const docRef = db.collection('activities').doc(documentId);
  
    try {
        if (action === 'add') {
            await docRef.update({
            users: FieldValue.arrayUnion(email)
            })
        
        } 
      
        else if (action === 'delete') {
            await docRef.update({
            users: FieldValue.arrayRemove(email)
            })
            
        } 
    }
    catch (error) {
      console.error(error);
    }
}

const updateEquipment = async (collection, documentId, fieldName, amount, action) => {
    const documentRef = db.collection(collection).doc(documentId);

    try {
      const doc = await documentRef.get();
      
      if (!doc.exists) {
        console.log('No such document');
        return;
      }

      const currentValue = doc.data()[fieldName];
      
      if (typeof currentValue !== 'number') {
        return
      }
  
      let newValue;
      if (action === 'add') {
        newValue = currentValue + amount;
      } 
      else if (action === 'subtract') {
        newValue = currentValue - amount

        if (newValue < 0) {
            return
          }
      } 
      else {
        return
      }
  
      await documentRef.update({[fieldName]: newValue})
  
    } catch (error) {
      console.error(error);
    }
  }

module.exports = {
    updateUserFirebase,
    updateDocumentWithID,
    modifyUserArray,
    updateEquipment
    
}