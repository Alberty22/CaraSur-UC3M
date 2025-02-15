const { db, fieldPath } = require('../../services/firebaseAdmin');

const getUserNotifications = async (email) => {
    try {
      const userDocRef = db.collection('users').doc(email)
      const userDoc = await userDocRef.get()
  
      if (!userDoc.exists) {
        return []
      }
  
      const notificationsCollectionRef = userDocRef.collection('notifications')
      const notificationsSnapshot = await notificationsCollectionRef.get()
  
      if (notificationsSnapshot.empty) {
        return []
      }
  
      const notifications = notificationsSnapshot.docs
      .filter(doc => doc.id !== 'empty')
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
  
      return notifications
    } 
    catch (error) {
      console.error(error)
      throw error
    }
}

const getUsers = async () => {
    try {
        const usersSnapshot = await db.collection('users').get()
    
        if (usersSnapshot.empty) {
          return []
        }
    
        const usersList = [];
        usersSnapshot.forEach(doc => {
          const data = doc.data();
          usersList.push({
            email: data.email,
            role: data.role,
          })
        })
    
        return usersList
      } 
      catch (error) {
        console.error(error)
        throw error
      }
}

const getUserDetails = async (email) => {
    try {
      const userDocRef = db.collection('users').doc(email)
      const userDoc = await userDocRef.get()
  
      if (!userDoc.exists) {
        return
      }
  
      const detailsCollectionRef = userDocRef.collection('details')
      const detailsSnapshot = await detailsCollectionRef.get()
  
      if (detailsSnapshot.empty) {
        return
      }
  
      const details = detailsSnapshot.docs
      .map(doc => ({
        [doc.id]: doc.data()
      }))
  
      return details
    } 
    catch (error) {
      console.error(error);
      throw error
    }
}

const getRoleAndName = async (email) => {
    try {
        const userDocRef = db.collection('users').doc(email)
        const userDocSnap = await userDocRef.get()
    
        if (!userDocSnap.exists) {
          throw new Error('User not found')
        }
    
        const userData = userDocSnap.data()
        const role = userData.role
    
        const userDetailsDocRef = userDocRef.collection('details').doc('userDetails')
        const userDetailsDocSnap = await userDetailsDocRef.get()
    
        if (!userDetailsDocSnap.exists) {
          throw new Error('User details not found')
        }
    
        const userDetailsData = userDetailsDocSnap.data()
        const name = userDetailsData.name
    
        return { role, name }
    
      } 
      catch (error) {
        console.error('Error getting user data:', error)
        throw error
      }
}

const getUserLoans = async (email) => {
    try {
      const userDocRef = db.collection('users').doc(email)
      const userDoc = await userDocRef.get()
  
      if (!userDoc.exists) {
        return []
      }
  
      const loansCollectionRef = userDocRef.collection('loans')
      const loansSnapshot = await loansCollectionRef.get()
  
      if (loansSnapshot.empty) {
        return []
      }
  
      const loans = loansSnapshot.docs
      .filter(doc => doc.id !== 'empty')
      .map(doc => ({
        ...doc.data()
      }))
  
      return loans
    } 
    catch (error) {
      console.error(error)
      throw error
    }
}

const getData = async(colection, documentId) =>{
  try {
    const documentRef = db.collection(colection).doc(documentId);
    const documentSnap = await documentRef.get();

    if (!documentSnap.exists) {
      return
    }

    return documentSnap.data();
  } 
  catch (error) {
    console.error('Error al obtener el documento:', error);
    throw new Error('Error al obtener el documento');
  }
}

const getAdminsEmails = async () => {
  try {
      const adminsSnapshot = await db.collection('users')
          .where('role', '==', 'admin')
          .get();
  
      if (adminsSnapshot.empty) {
          return []
      }
  
      const emailsList = [];
      adminsSnapshot.forEach(doc => {
          const data = doc.data();
          if (data.email) {
              emailsList.push(data.email);
          }
      })
  
      return emailsList
  } 
  catch (error) {
      console.error('Error fetching admin emails:', error)
      throw error
  }
}

const obtainData = async (coleccion) => {
  const snapshot = await db.collection(coleccion).get()
  const data = []
  
  snapshot.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() })
  })

  return data
}

const getCollectionData  = async (colection) => {
  
  try {
      const data = await obtainData(colection)
      const filteredData = data.filter(doc => doc.id !== 'empty')
      return filteredData
  }
  catch (error) {
      return 
  }
}

const getStockActivities = async () =>{
  try {
    const collectionRef = db.collection('activities');
    
    const ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

    const snapshot = await collectionRef
        .where(fieldPath, 'in', ids)
        .get();

    const documentsList = [];
    
    if (snapshot.empty) {
        return;
    }

    snapshot.forEach(doc => {
      documentsList.push({ id: doc.id, ...doc.data() });
    });

  return documentsList;

} catch (error) {
    console.error('Error obteniendo los documentos:', error);
    return [];
}
}






  
module.exports = { 
    getUserNotifications,
    getUsers,
    getUserDetails,
    getRoleAndName,
    getUserLoans,
    getData,
    getAdminsEmails,
    getCollectionData,
    getStockActivities
};