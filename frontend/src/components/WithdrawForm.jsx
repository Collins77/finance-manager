// WithdrawForm.jsx
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useGlobalContext } from '../context/globalContext';

const WithdrawForm = ({ accountId, onClose }) => {
  const { withdrawFromAccount } = useGlobalContext();
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  const handleChange = (e) => {
    setWithdrawalAmount(e.target.value);
  };

  const handleWithdraw = async () => {
    // Add validation logic if needed
    await withdrawFromAccount(accountId, parseFloat(withdrawalAmount));
    onClose();
  };

  return (
    <form>
      <TextField
        label="Withdrawal Amount"
        type="number"
        value={withdrawalAmount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleWithdraw}>
        Withdraw
      </Button>
    </form>
  );
};

export default WithdrawForm;
