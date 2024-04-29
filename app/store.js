import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./_slices/transaction-slice";
import userReducer from "./_slices/user-slice";
import viewTransactionSlice from "./_slices/view-transaction-slice";
import accountReducer from "./_slices/account-slice";
import currentSelectedUserReducer from "./_slices/current-selected-user-slice";
import currentlyTradingUserSlice from "./_slices/currently-trading-user-slice";

export default configureStore({
  reducer: {
    user: userReducer,
    account: accountReducer,
    transaction: transactionReducer,
    viewTransaction: viewTransactionSlice,
    currentSelectedUser: currentSelectedUserReducer,
    currentlyTradingUser: currentlyTradingUserSlice,
  },
});
