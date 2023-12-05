// // routes/accounts.js
const express = require('express');
const router = express.Router();
const { addAccount, getAccounts, deleteAccount, updateAccount, updateBalance, withdrawFromAccount } = require('../controllers/accounts');

router.post('/add-account', addAccount);
router.get('/get-accounts', getAccounts);
router.put('/update-account/:id', updateAccount);
router.post('/update-balance/:id', updateBalance);
router.delete('/delete-account/:id', deleteAccount);
router.post('/withdraw/:id', withdrawFromAccount);

module.exports = router;