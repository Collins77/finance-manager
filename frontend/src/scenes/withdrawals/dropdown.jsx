// Dropdown.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Dropdown = ({ accounts, onSelect }) => {
  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id="account-dropdown-label">Select Account</InputLabel>
      <Select labelId="account-dropdown-label" onChange={handleChange}>
        {accounts.map((account) => (
          <MenuItem key={account._id} value={account._id}>
            {account.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
