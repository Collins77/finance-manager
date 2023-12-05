import { configureStore } from "@reduxjs/toolkit";
import { amountReducer } from "./reducers/amount";

const store = configureStore({
  reducer: {
    amount: amountReducer
  },
});

export default store;