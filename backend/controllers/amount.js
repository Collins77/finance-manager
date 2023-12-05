const Amount = require('../models/AmountModel');
const Account = require("../models/AccountModel");


// Controller to add a new amount
const addAmount = async (req, res) => {
  try {
    const { amount, date } = req.body;

    // Validate if the required fields are provided
    if (!amount || !date) {
      return res.status(400).json({ error: 'Both amount and date are required.' });
    }

    // Create a new Amount object without deductions
    const newAmount = new Amount({
      amount,
      date,
    });

    await newAmount.save();

    // Fetch accounts
    const accounts = await Account.find();

    // Calculate and update account balances
    accounts.forEach(async (account) => {
      const deduction = (amount * account.percentage) / 100;

      // Update account balance
      await Account.findByIdAndUpdate(
        account._id,
        { $inc: { balance: deduction } }, // Increment balance by deduction amount
        { new: true }
      );
    });

    res.status(201).json(newAmount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete an amount by ID
const deleteAmount = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the ID is provided
    if (!id) {
      return res.status(400).json({ error: 'Amount ID is required.' });
    }

    const deletedAmount = await Amount.findByIdAndDelete(id);

    if (!deletedAmount) {
      return res.status(404).json({ error: 'Amount not found.' });
    }

    res.status(200).json(deletedAmount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAmounts = async (req, res) => {
    try {
      const amounts = await Amount.find();
      res.status(200).json(amounts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to update an amount by ID
const updateAmount = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date } = req.body;

    // Validate if the ID is provided
    if (!id) {
      return res.status(400).json({ error: 'Amount ID is required.' });
    }

    // Validate if at least one field (amount or date) is provided for update
    if (!amount && !date) {
      return res.status(400).json({ error: 'Provide at least one field to update (amount or date).' });
    }

    const updatedAmount = await Amount.findByIdAndUpdate(
      id,
      { amount, date },
      { new: true, runValidators: true }
    );

    if (!updatedAmount) {
      return res.status(404).json({ error: 'Amount not found.' });
    }

    res.status(200).json(updatedAmount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addAmount,
  getAmounts,
  deleteAmount,
  updateAmount,
};
