const { db, fieldPath } = require('../../services/firebaseAdmin');

//Function to upload users
const updloadUserFirebase = async (colection, documentId, data)  => {
    try {
        const { details, notifications, loans, ...others} = data

        const docRef = db.collection(colection).doc(documentId)

        await docRef.set(others)
        
        const notificacionesRef = docRef.collection('notifications')
        const detailsRef = docRef.collection('details')
        const loansRef = docRef.collection('loans')
        

        if (notifications && notifications['1']) {
            await notificacionesRef.doc("1").set(notifications['1'])
        }

        if (details) {
            const detallesPromises = Object.keys(details).map(async (key) => {
              await detailsRef.doc(key).set(details[key]);
            })
            await Promise.all(detallesPromises)
          }

        await loansRef.doc("empty").set({})

        return true
    } catch (error) {
        return false
    }
  }


//Function to add data to a collection
const addUserLoan = async (email, data) => {
    try {
        const collectionRef = db.collection('users').doc(email).collection('loans')
       
        await collectionRef.add(data)
       
      } 
      catch (error) {
        console.error(error)
      }
}

//Function to delete data from a collection
const deleteUserLoan = async (email, queryData) => {
    try {
        const collectionRef = db.collection('users').doc(email).collection('loans')
        
        let query = collectionRef
        for (const [key, value] of Object.entries(queryData)) {
            query = query.where(key, '==', value)
        }

        const snapshot = await query.get()
        
        if (snapshot.empty) {
            return
        }

        const batch = db.batch()
        snapshot.forEach(doc => {
            batch.delete(doc.ref)
        });

        
        await batch.commit()
        
    } 
    catch (error) {
        console.error(error)
    }
}

//Function to add notifications
const addUserNotifications = async (email, data) => {
    try {
        if (email === 'all') {
            const usersSnapshot = await db.collection('users').get();

            const promises = usersSnapshot.docs.map(async (userDoc) => {
                const collectionRef = userDoc.ref.collection('notifications')
                const docRef = await collectionRef.add({ text: data })
                const docId = docRef.id
                await docRef.update({ id: docId })
            })

            await Promise.all(promises)
        } else {
            const collectionRef = db.collection('users').doc(email).collection('notifications')
            const docRef = await collectionRef.add({ text: data })
            const docId = docRef.id;
            await docRef.update({ id: docId })
        }
    } 
    catch (error) {
        console.error(error)
    }
}

//Function to delete notifications
const deleteUserNotifications = async (email) => {
    try {
        const collectionRef = db.collection('users').doc(email).collection('notifications')
       
        const snapshot = await collectionRef.get()
        const batch = db.batch();

        snapshot.forEach(doc => {
            batch.delete(doc.ref)
        })

        await batch.commit()
 
        await collectionRef.doc('empty').set({})
       
      } 
      catch (error) {
        console.error(error)
      }
}

//Function to add data to a collection
const addDocument = async (collection, data) => {
    try {
        const collectionRef = db.collection(collection);
       
        const docRef = await collectionRef.add(data);

        return docRef.id;
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
            query = query.where(key, '==', value);
        }

        const snapshot = await query.get();
        
        if (snapshot.empty) {
            return;
        }

        const batch = db.batch()
        snapshot.forEach(doc => {
            batch.delete(doc.ref)
        });

        
        await batch.commit()
        
    } 
    catch (error) {
        console.error(error)
    }
}


//Function to delete data from a collection
const deleteDocumentWithID = async (collection, documentId) => {
    try {
        const documentRef = db.collection(collection).doc(documentId)

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
    addUserLoan,
    deleteUserLoan,
    addUserNotifications,
    deleteUserNotifications,
    addDocument,
    deleteDocument,
    deleteDocumentWithID,
    
}