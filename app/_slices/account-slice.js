import { createSlice } from "@reduxjs/toolkit";

export const account = createSlice({
  name: "account",
  initialState: {
    accountType: "", // Client, Trader, or Manager
  },
  reducers: {
    updateAccountType: (state, action) => {
      state.accountType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAccountType } = account.actions;

export default account.reducer;
