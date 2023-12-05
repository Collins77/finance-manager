const Account = require("../models/AccountModel");


// Controller to add a new account
const addAccount = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete an account by ID
const deleteAccount = async (req, res) => {
  const accountId = req.params.id;
  try {
    const deletedAccount = await Account.findByIdAndDelete(accountId);
    if (!deletedAccount) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(deletedAccount);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to update an account by ID
const updateAccount = async (req, res) => {
  const accountId = req.params.id;
  try {
    const updatedAccount = await Account.findByIdAndUpdate(accountId, req.body, { new: true });
    if (!updatedAccount) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(updatedAccount);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all accounts
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateBalance = async (req, res) => {
    try {
      const { id } = req.params;
      const { deduction } = req.body;
  
      // Find the account by ID
      const account = await Account.findById(id);
  
      if (!account) {
        return res.status(404).json({ error: 'Account not found.' });
      }
  
      // Update the account balance
      account.balance += deduction;
  
      // Save the updated account
      await account.save();
  
      res.status(200).json(account);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const withdrawFromAccount = async (req, res) => {
    try {
      const { id } = req.params;
      const { withdrawalAmount } = req.body;
  
      // Validate if the ID and withdrawal amount are provided
      if (!id || !withdrawalAmount) {
        return res.status(400).json({
          error: 'Account ID and withdrawal amount are required.',
        });
      }
  
      const account = await Account.findById(id);
  
      if (!account) {
        return res.status(404).json({ error: 'Account not found.' });
      }
  
      // Validate if there's enough balance for withdrawal
      if (account.balance < withdrawalAmount) {
        return res.status(400).json({ error: 'Insufficient balance.' });
      }
  
      // Update the account balance
      account.balance -= withdrawalAmount;
  
      // Save the updated account
      await account.save();
  
      res.status(200).json(account);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

module.exports = {
  addAccount,
  deleteAccount,
  updateAccount,
  getAccounts,
  updateBalance,
  withdrawFromAccount,
};
