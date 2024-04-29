import { createSlice } from "@reduxjs/toolkit";

export const viewTransactionSlice = createSlice({
  name: "viewTransaction",
  initialState: {
    date: "",
    bitcoinAmount: "",
    usdAmount: "",
    name: "",
    commissionType: "",
    traderName: "",
  },
  reducers: {
    setTransaction: (state, action) => {
      state.date = action.payload.date;
      state.bitcoinAmount = action.payload.bitcoinAmount;
      state.usdAmount = action.payload.usdAmount;
      state.name = action.payload.name;
      state.commissionType = action.payload.commissionType;
      state.traderName = action.payload.traderName;
    },
  },
});

export const { setTransaction } = viewTransactionSlice.actions;

export default viewTransactionSlice.reducer;
