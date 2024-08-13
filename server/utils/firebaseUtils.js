const { db, auth } = require('../firebaseAdmin');
const { filterObject } = require('./objectUtils');

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

// Function to replace id collection
async function copyDocumentWithCollections(docRef, newDocRef) {
    try {
        const docSnapshot = await docRef.get()
        
        if (!docSnapshot.exists) {
            throw new Error('Documnet does not exist')
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

//Function to upload users
const updloadUserFirebase = async (colection, documentId, data)  => {
    try {
        const { details, notifications, loans, ...others} = data

        const docRef = db.collection(colection).doc(documentId)

        await docRef.set(others)
        
        const notificacionesRef = docRef.collection('notificaciones')
        const detailsRef = docRef.collection('details')
        const loansRef = docRef.collection('loans')
        

        if (notifications && notifications['1']) {
            await notificacionesRef.doc("1").set(notifications['1'])
        }

        if (details) {
            const detallesPromises = Object.keys(details).map(async (key) => {
              await detailsRef.doc(key).set(details[key]);
            })
            await Promise.all(detallesPromises);
          }

        await loansRef.doc("empty").set({})

        return true
    } catch (error) {
        return false
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
        }

        return true;
    } catch (error) {
        console.error("Error updating user data:", error);
        return false;
    }
}

//Function to add data to a collection
const addDocument = async (collection, data) => {
    try {
        const collectionRef = db.collection(collection)
       
        await collectionRef.add(data)
       
      } 
      catch (error) {
        console.error(error)
      }
}

//Function to delete data from a collection
const deleteDocument = async (collection, queryData) => {
    try {
        const collectionRef = db.collection(collection);
        
        let query = collectionRef;
        for (const [key, value] of Object.entries(queryData)) {
            query = query.where(key, '==', value)
        }

        const snapshot = await query.get()
        
        if (snapshot.empty) {
            return
        }

        const batch = db.batch();
        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });

        
        await batch.commit();
        
    } 
    catch (error) {
        console.error(error)
    }
}

//Function to add data to a collection
const addDocumentWithID = async (collection, id, data) => {
    try {
        const collectionRef = db.collection(collection)
        await collectionRef.doc(id).set(data)
        
    } 
    catch (error) {
        console.error(error)
    }
}

//Function to delete data from a collection
const deleteDocumentWithID = async (collection, id) => {
    try {
        const documentRef = db.collection(collection).doc(id)

        const docSnapshot = await documentRef.get()
        if (!docSnapshot.exists) {
            return
        }

        await documentRef.delete()
        
    } 
    catch (error) {
        console.error(error)
    }
}



module.exports = {
    updloadUserFirebase,
    updateUserFirebase,
    addDocument,
    deleteDocument,
    addDocumentWithID,
    deleteDocumentWithID
}