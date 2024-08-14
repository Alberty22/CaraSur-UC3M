const { readJsonFile, writeJsonFile, updateJsonEntries, deleteJsonEntry } = require('../utils/databaseUtils');
const { addDocument, deleteDocument, updateEquipment, addUserLoan, deleteUserLoan } = require('../utils/firebaseUtils');
const { generateLoanId } = require('../utils/identifierUtils');
const { getActualDate } = require('../utils/datesUtils');
const { updateEquipmentQuantity } = require('../utils/equipmentUtils')
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');
const equipmentPath = path.join(__dirname, '../data/equipment.json');
const pendingLoansPath = path.join(__dirname, '../data/pending-loans.json');
const proccessedLoansPath = path.join(__dirname, '../data/proccesed-loans.json');

// GET request handler to retrieve user loans
exports.getUserLoans = async (req, res) => {
    const { email } = req.params
    try {
      const users = await readJsonFile(usersPath)
      const user = users.find(user => user.email === email)
      if (user) {
        res.json(user.loans);
      } else {
        res.status(404).json({ error: 'User not found' })
      }
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
exports.getProccesedLoans = async (req, res) => {
  
  try {
    const loans = await readJsonFile(proccessedLoansPath)
    res.json(loans);

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// POST request handler to add proccesed loans
exports.postProccesedLoans = async (req, res) => {
  try {
    const loan = req.body

    if (!loan) {
      return res.status(404).json({ error: 'Error in loan' })
    }

    //Update proccesed loans
    const loans = await readJsonFile(proccessedLoansPath)

    loans.push(loan)

    await addDocument('proccesed-loans', loan)
    await writeJsonFile(proccessedLoansPath, loans)

    // Delete loan from pending loans
    const modifiedLoan = { ...loan }
    modifiedLoan.returnDate = "pending"

    await deleteDocument('pending-loans', modifiedLoan)
    await deleteJsonEntry(pendingLoansPath, modifiedLoan)

    //Update user loans
    const { user:userEmail, ...userLoan} = loan

    const filterFn = user => user.email === userEmail
    
    const updateFn = (user) => {
      const newLoanId = generateLoanId(user)
      user.loans[newLoanId] = {
        id: newLoanId,
        ...userLoan
      }
      return user
    }

    await addUserLoan(userEmail, userLoan)
    await updateJsonEntries(usersPath, filterFn, updateFn)

    return res.status(201).json({ success: true, message: 'Loan proccesed' })
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// DELETE request handler to remove proccesed loans
exports.deleteProccesedLoans = async (req, res) => {
  try {
    
    const loan = req.body

    if (!loan) {
      return res.status(404).json({ error: 'Error in loan' })
    }

    await deleteDocument('proccesed-loans', loan)
    await updateEquipment("equipment",  loan.product.toString(), 'available', loan.quantity, 'add')
    await deleteJsonEntry(proccessedLoansPath, loan)
    

    const filterFn = user => user.email === loan.user
    
    const updateFn = (user) => {

      user.loans = Object.fromEntries(Object.entries(user.loans).filter(([key, value]) => (value.product !== loan.product) || (value.returnDate !== loan.returnDate)))
      
      return user
    }

    const {id, user, ...deleteLoan } = loan
    await deleteUserLoan(user, deleteLoan)
    await updateJsonEntries(usersPath, filterFn, updateFn)

    const equipment = await readJsonFile(equipmentPath)
    const newEquipment = await updateEquipmentQuantity(equipment, [loan.product], [loan.quantity], 'add')
    await writeJsonFile(equipmentPath, newEquipment)

    res.status(201).json({ success: true, message: 'Loan removed' })

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}