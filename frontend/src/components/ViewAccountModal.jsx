import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useGlobalContext } from '../context/globalContext';

const ViewAccountModal = ({ accountId, onClose }) => {
  const [accountDetails, setAccountDetails] = useState({
    title: '',
    bank: '',
    percentage: '',
    balance: '',
    withdrawals: [],
  });
  const { accounts } = useGlobalContext();
//   const { getWithdrawalsByAccount } = useGlobalContext();

  // Fetch withdrawals for the specific account
//   const withdrawals = getWithdrawalsByAccount(accountId);

//   const [recentWithdrawals, setRecentWithdrawals] = useState([
//     { amount: 200, date: '2023-04-15' },
//     { amount: 150, date: '2023-04-10' },
//     // Add more withdrawal entries as needed
//   ]);

  const bankIcon = <AccountBalanceIcon fontSize="large" color="primary" />;

  const [initialValuesFetched, setInitialValuesFetched] = useState(false);

  useEffect(() => {
    // Avoid continuous re-fetching
    if (!initialValuesFetched) {
      const accountToUpdate = accounts.find(account => account._id === accountId);
      setAccountDetails(accountToUpdate);
      setInitialValuesFetched(true);
    }
  }, [accounts, accountId, initialValuesFetched])
//   useEffect(() => {
//     // Fetch actual account details based on accountId
//     // Example:
//     // fetchAccountDetails(accountId).then(data => setAccountDetails(data));
//   }, [accountId]);

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Avatar>{bankIcon}</Avatar>
          <Typography sx={{ ml: 2 }} variant="h3">
            {accountDetails.bank}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="space-between" gap="10" >
          {/* Bank Details */}
          <Box>
            <Typography variant="h5">
              <strong>Title:</strong> {accountDetails.title}
            </Typography>
            <Typography variant="body1">
              <strong>Percentage:</strong> {accountDetails.percentage}%
            </Typography>
            <Typography variant="body1">
              <strong>Balance:</strong> {accountDetails.balance}
            </Typography>
          </Box>

          {/* Recent Withdrawals */}
          <Box>
            <Typography variant="h6">Recent Withdrawals</Typography>
            <List>
              {accountDetails.withdrawals.map((withdrawal, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <AttachMoneyIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Withdrawal: KES ${withdrawal.amount}`}
                    secondary={`Date: ${new Date(withdrawal.timestamp).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewAccountModal;
