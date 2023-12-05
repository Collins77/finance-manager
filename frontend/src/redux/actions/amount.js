import axios from "axios";
import { server } from "../../server";

// Action Types
export const GET_ALL_AMOUNTS_REQUEST = "GET_ALL_AMOUNTS_REQUEST";
export const GET_ALL_AMOUNTS_SUCCESS = "GET_ALL_AMOUNTS_SUCCESS";
export const GET_ALL_AMOUNTS_FAIL = "GET_ALL_AMOUNTS_FAIL";

// Action Creators
export const getAllAmountsRequest = () => ({
  type: GET_ALL_AMOUNTS_REQUEST,
});

export const getAllAmountsSuccess = (amounts) => ({
  type: GET_ALL_AMOUNTS_SUCCESS,
  payload: amounts,
});

export const getAllAmountsFail = (error) => ({
  type: GET_ALL_AMOUNTS_FAIL,
  payload: error,
});

// Thunk to Fetch All Amounts
export const getAllAmountsCollected = () => async (dispatch) => {
  try {
    dispatch(getAllAmountsRequest());
    const {data} = await axios.get(`${server}amount/get-amounts`);
    dispatch(getAllAmountsSuccess(data.amounts));
    console.log(data.amounts)
  } catch (error) {
    dispatch(getAllAmountsFail(error.response.data.message));
  }
};
