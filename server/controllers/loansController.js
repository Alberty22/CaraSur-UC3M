const { readJsonFile, writeJsonFile, updateJsonEntries, deleteJsonEntry } = require('../utils/databaseUtils');
const { addDocument, deleteDocument, addUserLoan, deleteUserLoan } = require('../utils/firebase/firebasePostUtils');
const { getUserLoans, getAdminsEmails } = require('../utils/firebase/firebaseGetUtils')
const { updateEquipment } = require('../utils/firebase/firebaseUpdateUtils');
const { sendLoansToClient } = require('../controllers/sse/loansHandler');
const { getActualDate } = require('../utils/datesUtils');
const { updateEquipmentQuantity } = require('../utils/equipmentUtils');
const { adminActionEmail, loanEmail } = require('../utils/emailsUtils');

const path = require('path');
const equipmentPath = path.join(__dirname, '../data/equipment.json');
const pendingLoansPath = path.join(__dirname, '../data/pending-loans.json');
const processedLoansPath = path.join(__dirname, '../data/processed-loans.json');

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
    const loans = await readJsonFile(pendingLoansPath)
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

    const loans = await readJsonFile(pendingLoansPath)
    let equipment = await readJsonFile(equipmentPath)

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
      loans.push(newLoan)
      ids.push(loan.id)
      quantities.push(loan.quantity)

      await addDocument('pending-loans', newLoan)
      await updateEquipment("equipment",  loan.id.toString(), 'available', loan.quantity, 'subtract')
      
    })
    
    if(!equipment) {
      return res.status(404).json({ error: 'Error in loan' })
    }
    
    equipment = await updateEquipmentQuantity(equipment, ids, quantities, 'subtract')
    await writeJsonFile(pendingLoansPath, loans)
    await writeJsonFile(equipmentPath, equipment)

    const adminEmails = await getAdminsEmails()
    adminEmails.forEach(email => {
      adminActionEmail(email, 'Se ha solicitado un nuevo artículo, acepta el préstamo','http://localhost:5000/es/admin/loans').catch(error => {
          console.error(`Failed to send email to ${email}:`, error);
        })
    })
  
    
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

    await deleteDocument('pending-loans', loan)
    await deleteJsonEntry(pendingLoansPath, loan)

    const equipment = await readJsonFile(equipmentPath)
    const newEquipment = await updateEquipmentQuantity(equipment, [loan.product], [loan.quantity], 'add')
    await updateEquipment("equipment",  loan.product.toString(), 'available', loan.quantity, 'add')
    await writeJsonFile(equipmentPath, newEquipment)

    res.status(201).json({ success: true, message: 'Loan removed' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


// GET request handler to retrieve pending loans
exports.getProcessedLoans = async (req, res) => {
  
  try {
    const loans = await readJsonFile(processedLoansPath)
    res.json(loans);

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// POST request handler to add processed loans
exports.postProcessedLoans = async (req, res) => {
  try {
    const loan = req.body

    if (!loan) {
      return res.status(404).json({ error: 'Error in loan' })
    }

    //Update processed loans
    const loans = await readJsonFile(processedLoansPath)

    loans.push(loan)

    await addDocument('processed-loans', loan)
    await writeJsonFile(processedLoansPath, loans)

    // Delete loan from pending loans
    const modifiedLoan = { ...loan }
    modifiedLoan.returnDate = "pending"

    await deleteDocument('pending-loans', modifiedLoan)
    await deleteJsonEntry(pendingLoansPath, modifiedLoan)

    const { user:userEmail, ...userLoan} = loan

    await addUserLoan(userEmail, userLoan)
    sendLoansToClient(loan.user, 'get')

    loanEmail(userEmail, userLoan.name)

    return res.status(201).json({ success: true, message: 'Loan processed' })
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

    await deleteDocument('processed-loans', loan)
    await updateEquipment("equipment",  loan.product.toString(), 'available', loan.quantity, 'add')

    await deleteJsonEntry(processedLoansPath, loan)

    const {id, user, ...deleteLoan } = loan
    await deleteUserLoan(user, deleteLoan)

    const equipment = await readJsonFile(equipmentPath)
    const newEquipment = await updateEquipmentQuantity(equipment, [loan.product], [loan.quantity], 'add')
    await writeJsonFile(equipmentPath, newEquipment)

    sendLoansToClient(loan.user, 'get')
    res.status(201).json({ success: true, message: 'Loan removed' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}