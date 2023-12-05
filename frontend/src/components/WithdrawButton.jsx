import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import EjectIcon from '@mui/icons-material/Eject';

const WithdrawButton = ({ accountId }) => {
  return (
    // <Button component={Link} to={`/withdraw/${accountId}`} color="primary" variant="contained">
    //     <AtmIcon fontSize='medium' color='error' />
    // </Button>
    <Button component={Link} to={`/withdraw/${accountId}`} variant="contained" color='error' startIcon={<EjectIcon />}>
        Withdraw
  </Button>
  );
};

export default WithdrawButton;
