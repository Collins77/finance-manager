import React, { useContext, useEffect, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5000/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [amounts, setAmounts] = useState([])
    const [accounts, setAccounts] = useState([])
    const [totalIncome, setTotalIncome] = useState(null);
    const [error, setError] = useState(null)
    const [previousTotalAmount, setPreviousTotalAmount] = useState(0);
    const [totalWithdrawn, setTotalWithdrawn] = useState(0);
    const [withdrawals, setWithdrawals] = useState([]);

    //calculate incomes
    const addAmount = async (amount) => {
        try {
            await axios.post(`${BASE_URL}amount/add-amount`, amount);
         
      
          // Fetch accounts
          const accountsResponse = await axios.get(`${BASE_URL}account/get-accounts`);
          const accounts = accountsResponse.data;
      
          // Calculate and update account balances
          accounts.forEach(async (account) => {
            const deduction = (amount.amount * account.percentage) / 100;
      
            // Update account balance
            await axios.post(`${BASE_URL}account/update-balance/${account._id}`, {
              deduction,
            });
          });
      
          getAmounts();
          getAccounts();
        } catch (err) {
          setError(err.response.data.message);
        }
      };
      

    const getAmounts = async () => {
        const response = await axios.get(`${BASE_URL}amount/get-amounts`)
        setAmounts(response.data)
        updatePreviousTotalAmount();
    }

    const deleteAmount = async (id) => {
        await axios.delete(`${BASE_URL}amount/delete-amount/${id}`)
        getAmounts()
    }

    const totalAmount = () => {
        let totalAmount = 0;
        amounts.forEach((amount) =>{
            totalAmount = totalAmount + amount.amount
        })

        return totalAmount.toLocaleString();
    }

  
  const [totalAmountThisMonth, setTotalAmountThisMonth] = useState({
    month: '',
    totalAmount: 0,
  });
  
  // Effect to update the total amount whenever new amounts are added
  useEffect(() => {
    // Calculate the total amount for the current month
    const calculateTotalAmountThisMonth = () => {
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      const currentYear = new Date().getFullYear();
  
      const filteredAmounts = amounts.filter((amount) => {
        const date = new Date(amount.createdAt);
        return date.getMonth() + 1 === new Date().getMonth() + 1 && date.getFullYear() === currentYear;
      });
  
      const totalAmount = filteredAmounts.reduce((acc, amount) => acc + amount.amount, 0);
  
      setTotalAmountThisMonth({
        month: currentMonth,
        totalAmount: totalAmount,
      });
    };
  
    // Call the function to calculate the total amount for the current month
    calculateTotalAmountThisMonth();
  }, [amounts]);
  

    const getTotalIncome = async () => {
        try {
          const response = await axios.get(`${BASE_URL}amount/get-total-income`);
          setTotalIncome(response.data.totalAmount);
        } catch (err) {
          setError(err.response.data.message);
        }
      };

    // calculate incomes
    const addAccount = async (account) => {
        await axios.post(`${BASE_URL}account/add-account`, account)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getAccounts()
    }

    const getAccounts = async () => {
        const response = await axios.get(`${BASE_URL}account/get-accounts`)
        setAccounts(response.data)
    }

    const deleteAccount = async (id) => {
        await axios.delete(`${BASE_URL}account/delete-account/${id}`)
        getAccounts()
    }


    const getTotalAccountBalance = () => {
        let totalAccountBalance = 0;
        accounts.forEach((account) => {
          totalAccountBalance += account.balance;
        });
        return totalAccountBalance.toLocaleString();
    };
    
    const getPercentageIncreaseTotalAmount = () => {
        const currentTotalAmount = totalAmount();
        const percentageIncrease =
          previousTotalAmount === 0
            ? 0
            : ((currentTotalAmount - previousTotalAmount) / previousTotalAmount) * 100;
    
        return percentageIncrease.toFixed(2); // Limit to two decimal places
      };
    
      const updatePreviousTotalAmount = () => {
        // Update previous total amount with the current total amount
        setPreviousTotalAmount(totalAmount());
      };

      const updateAccount = async (accountId, updatedAccountData) => {
        try {
          await axios.put(`${BASE_URL}account/update-account/${accountId}`, updatedAccountData);
          getAccounts(); 
        } catch (err) {
          setError(err.response.data.message);
        }
      };
    

    const transactionHistory = () => {
        const history = [...amounts, ...accounts]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }
    const withdrawFromAccount = async (accountId, withdrawalAmount) => {
        try {
          // Update account balance
          await axios.post(`${BASE_URL}account/withdraw/${accountId}`, {
            withdrawalAmount,
          });

          setTotalWithdrawn((prevTotal) => prevTotal + withdrawalAmount);
    
          getAccounts();
        } catch (err) {
          setError(err.response.data.message);
        }
      };
      


    return (
        <GlobalContext.Provider value={{
            addAmount,
            getAmounts,
            amounts,
            deleteAmount,
            getPercentageIncreaseTotalAmount,
            totalAmount,
            getTotalIncome,
            accounts,
            updateAccount,
            totalIncome,
            totalAmountThisMonth,
            // getWithdrawalsByAccount,
            addAccount,
            getAccounts,
            deleteAccount,
            totalWithdrawn,
            withdrawFromAccount,
            getTotalAccountBalance,
            transactionHistory,
            updatePreviousTotalAmount,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}