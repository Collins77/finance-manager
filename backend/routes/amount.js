const express = require('express');
const { addAmount, getAmounts, deleteAmount } = require('../controllers/amount');
const router = express.Router();

router.post('/add-amount', addAmount);
router.get('/get-amounts', getAmounts);
router.delete('/delete-amount/:id', deleteAmount);

module.exports = router;