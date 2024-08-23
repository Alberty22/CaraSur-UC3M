const { addDocument, deleteDocument, addUserLoan, deleteUserLoan } = require('../utils/firebase/firebasePostUtils');
const { getUserLoans, getAdminsEmails, getCollectionData } = require('../utils/firebase/firebaseGetUtils')
const { updateEquipment } = require('../utils/firebase/firebaseUpdateUtils');
const { sendLoansToClient } = require('../controllers/sse/loansHandler');
const { getActualDate } = require('../utils/datesUtils');
const { adminActionEmail, loanEmail } = require('../utils/emailsUtils');
const { deleteCacheList } = require('../services/redisService');


// GET request handler to retrieve user loans
exports.getUserLoans = async (req, res) => {
    const { email } = req.params
    try {
      const loans = await getUserLoans(email)
     
      res.status(201).json(loans)
      
    } 
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

// GET request handler to retrieve pending loans
exports.getPendingLoans = async (req, res) => {
  
  try {
    const loans = await getCollectionData('pending-loans');
    res.json(loans);

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// POST request handler to add pending loans
exports.postPendingLoans = async (req, res) => {

  try {
    const { email, loansReq } = req.body

    if (!email || !loansReq ) {
      return res.status(404).json({ error: 'Error in loan' })
    }

    const ids = []
    const quantities = []

    loansReq.forEach(async (loan) => {
      const newLoan = {
        "product": loan.id,
        "name": loan.object,
        "user": email,
        "quantity": loan.quantity,
        "image": loan.photo,
        "loanDate": getActualDate(),
        "returnDate": "pending"
      }
      ids.push(loan.id)
      quantities.push(loan.quantity);

      await addDocument('pending-loans', newLoan);
      await updateEquipment("equipment",  loan.id.toString(), 'available', loan.quantity, 'subtract');
      
    })
    
    const adminEmails = await getAdminsEmails()
    adminEmails.forEach(email => {
      adminActionEmail(email, 'Se ha solicitado un nuevo artículo, acepta el préstamo','http://localhost:5000/es/admin/loans').catch(error => {
          console.error(`Failed to send email to ${email}:`, error);
        })
    })
  
    await deleteCacheList('equipment');

    res.status(201).json({ success: true, message: 'Loan send' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// DELETE request handler to remove pending loans
exports.deletePendingLoans = async (req, res) => {
  try {
    
    const loan = req.body

    if (!loan) {
      return res.status(404).json({ error: 'Error in loan' })
    }

    const { id, ...resumeLoan } = loan
    await deleteDocument('pending-loans', resumeLoan)

    await updateEquipment("equipment",  loan.product.toString(), 'available', loan.quantity, 'add')
    
    await deleteCacheList('equipment');
    res.status(201).json({ success: true, message: 'Loan removed' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


// GET request handler to retrieve pending loans
exports.getProcessedLoans = async (req, res) => {
  
  try {
    const loans = await getCollectionData('processed-loans');
    res.json(loans);

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// POST request handler to add processed loans
exports.postProcessedLoans = async (req, res) => {
  try {
    const loan = req.body;

    if (!loan) {
      return res.status(404).json({ error: 'Error in loan' });
    }

    const { id, ...resumeLoan } = loan;
    await addDocument('processed-loans', resumeLoan);

    // Delete loan from pending loans
    const modifiedLoan = resumeLoan;
    modifiedLoan.returnDate = "pending";

    await deleteDocument('pending-loans', resumeLoan);

    const { user:userEmail, ...userLoan} = loan;

    await addUserLoan(userEmail, userLoan);
    
    sendLoansToClient(loan.user, 'get');

    loanEmail(userEmail, userLoan.name);

    return res.status(201).json({ success: true, message: 'Loan processed' });
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// DELETE request handler to remove processed loans
exports.deleteProcessedLoans = async (req, res) => {
  try {
    
    const loan = req.body

    if (!loan) {
      return res.status(404).json({ error: 'Error in loan' })
    }

    const { id, ...resumeLoan } = loan
    
    await deleteDocument('processed-loans', resumeLoan)
    await updateEquipment("equipment",  loan.product.toString(), 'available', loan.quantity, 'add')

    const {user, ...deleteLoan } = resumeLoan
    await deleteUserLoan(user, deleteLoan)

    sendLoansToClient(loan.user, 'get');
    await deleteCacheList('equipment');
    res.status(201).json({ success: true, message: 'Loan removed' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}