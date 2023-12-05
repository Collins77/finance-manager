import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  amounts: [],
  error: null,
};

export const amountReducer = createReducer(initialState, {
  GET_ALL_AMOUNTS_REQUEST: (state) => {
    state.isLoading = true;
  },
  GET_ALL_AMOUNTS_SUCCESS: (state, action) => {
    state.isLoading = false;
    state.amounts = action.payload;
    state.error = null;
  },
  GET_ALL_AMOUNTS_FAIL: (state, action) => {
    state.isLoading = false;
    state.amounts = [];
    state.error = action.payload;
  },
});
