// WithdrawalsTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const WithdrawalsTable = ({ withdrawals }) => {
  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            {/* Add more columns as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {withdrawals.map((withdrawal) => (
            <TableRow key={withdrawal._id}>
              <TableCell>{withdrawal.timestamp}</TableCell>
              <TableCell>{withdrawal.amount}</TableCell>
              {/* Add more cells for additional information */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WithdrawalsTable;
