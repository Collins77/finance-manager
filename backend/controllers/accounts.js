const Account = require("../models/AccountModel");


// Controller to add a new account
// const addAccount = async (req, res) => {
//   try {
//     const newAccount = await Account.create(req.body);
//     res.status(201).json(newAccount);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
const addAccount = async (req, res) => {
  try {
    // Get the total percentage of existing accounts
    const totalPercentage = await Account.aggregate([
      {
        $group: {
          _id: null,
          totalPercentage: { $sum: '$percentage' },
        },
      },
    ]);

    // Check if adding the new account would exceed 100%
    const newPercentage = req.body.percentage;
    if (totalPercentage.length > 0 && totalPercentage[0].totalPercentage + newPercentage > 100) {
      return res.status(400).json({ error: 'Adding this account would exceed 100% total percentage.' });
    }

    // Attempt to create a new account using the data from the request body
    const newAccount = await Account.create(req.body);

    // If the account creation is successful, respond with the created account data and a status code of 201 (Created)
    res.status(201).json(newAccount);
  } catch (error) {
    // If an error occurs during the account creation process, respond with a 500 status code and an error message
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
      
      account.withdrawals.push({
        amount: withdrawalAmount,
        timestamp: new Date(),
      });
  
      // Save the updated account
      await account.save();
  
      res.status(200).json(account);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getWithdrawalsForAccount = async (req, res) => {
    const accountId = req.params.id;
  
    try {
      // Find the account by ID
      const account = await Account.findById(accountId);
  
      if (!account) {
        return res.status(404).json({ error: 'Account not found.' });
      }
  
      // Retrieve the withdrawal history for the account
      const withdrawals = account.withdrawals || [];
  
      res.status(200).json(withdrawals);
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
  getWithdrawalsForAccount,
};
