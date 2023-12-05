import axios from "axios";
import { server } from "../../server";

// add account
export const addAccount = (title, bank, percentage, balance) => async (dispatch) => {
  try {
    dispatch({
      type: "addAccountRequest",
    });

    const { data } = await axios.post(`${server}/account/add-account`, {
      title,
      bank,
      percentage,
      balance,
    });

    dispatch({
      type: "addAccountSuccess",
      payload: data.account,
    });
  } catch (error) {
    dispatch({
      type: "addAccountFail",
      payload: error.response.data.message,
    });
  }
};

// get all accounts
export const getAllAccounts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllAccountsRequest",
    });

    const { data } = await axios.get(`${server}/account/get-all-accounts`);

    dispatch({
      type: "getAllAccountsSuccess",
      payload: data.accounts,
    });
  } catch (error) {
    dispatch({
      type: "getAllAccountsFail",
      payload: error.response.data.message,
    });
  }
};

// delete account
export const deleteAccount = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteAccountRequest",
    });

    const { data } = await axios.delete(`${server}/account/delete-account/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteAccountSuccess",
      payload: data.deletedAccountId,
    });
  } catch (error) {
    dispatch({
      type: "deleteAccountFail",
      payload: error.response.data.message,
    });
  }
};