// YourMainComponent.js
import React, { useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import Dropdown from './dropdown';
import WithdrawalsTable from './WithdrawalsTable';

const Withdrawals = () => {
  const { accounts } = useGlobalContext();
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleAccountSelect = (accountId) => {
    setSelectedAccount(accountId);
  };

  return (
    <div>
      <Dropdown accounts={accounts} onSelect={handleAccountSelect} />
      {selectedAccount && <WithdrawalsTable withdrawals={selectedAccount.withdrawals} />}
    </div>
  );
};

export default Withdrawals;
