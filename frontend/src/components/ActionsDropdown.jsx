import React, { useState, useEffect } from 'react';
import { MenuItem, Menu, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { useUpdateAccountContext } from 'path-to-your-update-account-context'; // Update the path based on your actual file structure
import UpdateForm from './UpdateForm';
import WithdrawForm from './WithdrawForm';

const ActionsDropdown = ({ accountId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openWithdrawForm, setOpenWithdrawForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWithdraw = () => {
    setOpenWithdrawForm(true);
    handleClose();
  };

  const handleUpdateAccount = () => {
    setOpenUpdateForm(true);
    handleClose();
  };

  const handleCloseWithdrawForm = () => {
    setOpenWithdrawForm(false);
  };

  const handleCloseUpdateForm = () => {
    setOpenUpdateForm(false);
  };

  return (
    <div>
      <IconButton
        aria-label="actions"
        aria-controls="actions-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleWithdraw}>Withdraw</MenuItem>
        <MenuItem onClick={handleUpdateAccount}>Update Account</MenuItem>
      </Menu>

      <Dialog open={openWithdrawForm} onClose={handleCloseWithdrawForm}>
        <DialogTitle>Withdraw Form</DialogTitle>
        <DialogContent>
          <WithdrawForm accountId={accountId} onClose={handleCloseWithdrawForm} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithdrawForm} color="primary">
            Cancel
          </Button>
          {/* No need for a separate button in WithdrawForm component, handleWithdraw will perform the action */}
        </DialogActions>
      </Dialog>

      {/* Update Form Dialog */}
      <Dialog open={openUpdateForm} onClose={handleCloseUpdateForm}>
        <DialogTitle>Update Form</DialogTitle>
        <DialogContent>
          {/* Pass the accountDetails to your UpdateForm component */}
          <UpdateForm accountId={accountId} onClose={handleCloseUpdateForm} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionsDropdown;
