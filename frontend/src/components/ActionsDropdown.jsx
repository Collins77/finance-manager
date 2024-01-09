import React, { useState } from 'react';
import { MenuItem, Menu, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UpdateForm from './UpdateForm';
import WithdrawForm from './WithdrawForm';
import ViewAccountModal from './ViewAccountModal';

const ActionsDropdown = ({ accountId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openWithdrawForm, setOpenWithdrawForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [openViewAccountModal, setOpenViewAccountModal] = useState(false);


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

  const handleViewAccount = () => {
    setOpenViewAccountModal(true);
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

  const handleCloseViewAccountModal = () => {
    setOpenViewAccountModal(false);
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
        <MenuItem onClick={handleViewAccount}>Account Details</MenuItem>
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

      <Dialog open={openViewAccountModal} onClose={handleCloseViewAccountModal}>
        <DialogTitle>Account Details</DialogTitle>
        <DialogContent>
          {/* Pass the accountId and any other necessary props to your ViewAccountModal component */}
          <ViewAccountModal accountId={accountId} onClose={handleCloseViewAccountModal} />
        </DialogContent>
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
