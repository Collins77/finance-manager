import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { server } from '../../server';

const WithdrawForm = ({ accountId, onWithdraw }) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      // Validate the input (for example, check if it's a positive number)
      if (isNaN(withdrawAmount) || parseFloat(withdrawAmount) <= 0) {
        setError('Please enter a valid positive number for withdrawal.');
        return;
      }

      // Make a request to your server to perform the withdrawal
      await axios.post(`${server}account/withdraw/${accountId}`, { amount: withdrawAmount });
      // Trigger the parent component's onWithdraw callback
      onWithdraw();
    } catch (error) {
      console.error('Error withdrawing amount:', error);
      setError('An error occurred during withdrawal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <TextField
        type="number"
        label="Withdraw Amount"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        required
        error={error !== null}
        helperText={error}
        disabled={loading}
      />
      <Button onClick={handleWithdraw} color="primary" variant="contained" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Withdraw'}
      </Button>
      {error && (
        <Typography color="error" variant="body2" mt={1}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default WithdrawForm;
