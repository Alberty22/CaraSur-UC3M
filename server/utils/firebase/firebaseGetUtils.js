const { db } = require('../../firebaseAdmin');

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


  
module.exports = { 
    getUserNotifications,
    getUsers,
    getUserDetails,
    getRoleAndName,
    getUserLoans
};