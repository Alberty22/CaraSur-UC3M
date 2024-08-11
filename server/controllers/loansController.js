const { readJsonFile, writeJsonFile, updateJsonEntries, deleteJsonEntry } = require('../utils/databaseUtils');
const { generateLoanId } = require('../utils/identifierUtils');
const { getActualDate } = require('../utils/datesUtils.js');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');
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

// POST request handler to retrieve pending loans
exports.postPendingLoans = async (req, res) => {
  const { email, loansReq } = req.body

  try {

    if (!email || !loansReq ) {
      return res.status(404).json({ error: 'Error in loan' })
    }

    const loans = await readJsonFile(pendingLoansPath)

    loansReq.forEach((loan) => {
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
    })

    await writeJsonFile(pendingLoansPath, loans)

    res.status(201).json({ success: true, message: 'Loan send' })

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

exports.postProccesedLoans = async (req, res) => {
  const loan = req.body
  
  try {
    if (!loan) {
      return res.status(404).json({ error: 'Error in loan' })
    }

    //Update proccesed loans
    const loans = await readJsonFile(proccessedLoansPath)

    loans.push(loan)

    await writeJsonFile(proccessedLoansPath, loans)

    // Delete loan from pending loans
    const modifiedLoan = { ...loan }
    modifiedLoan.returnDate = "pending"

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

    await updateJsonEntries(usersPath, filterFn, updateFn);

    return res.status(201).json({ success: true, message: 'Loan proccesed' });
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}