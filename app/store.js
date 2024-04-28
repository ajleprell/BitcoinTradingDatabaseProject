import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./_slices/transaction-slice";
import userReducer from "./_slices/user-slice";

export default configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
  },
});
