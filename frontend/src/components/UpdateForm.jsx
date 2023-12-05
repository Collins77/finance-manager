import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useGlobalContext } from '../context/globalContext';

const UpdateForm = ({ accountId, onClose }) => {
  const { accounts, updateAccount } = useGlobalContext();
  const [formData, setFormData] = useState({
    title: '',
    bank: '',
    percentage: '',
    balance: '',
  });
  const [initialValuesFetched, setInitialValuesFetched] = useState(false);

  useEffect(() => {
    // Avoid continuous re-fetching
    if (!initialValuesFetched) {
      const accountToUpdate = accounts.find(account => account._id === accountId);
      setFormData(accountToUpdate);
      setInitialValuesFetched(true);
    }
  }, [accounts, accountId, initialValuesFetched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  

  const handleSubmit = async () => {
    await updateAccount(accountId, formData);
    onClose();
  };

  return (
    <form>
      <TextField
        label="Title"
        name="title"
        value={formData.title || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Bank"
        name="bank"
        value={formData.bank || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Percentage"
        name="percentage"
        value={formData.percentage || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Balance"
        name="balance"
        value={formData.balance || ''}
        onChange={handleChange}
        fullWidth
        disabled
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Update Account
      </Button>
    </form>
  );
};

export default UpdateForm;
