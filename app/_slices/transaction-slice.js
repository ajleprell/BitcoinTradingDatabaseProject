import { createSlice } from "@reduxjs/toolkit";

export const bitcoinAmount = createSlice({
  name: "bitcoinAmount",
  initialState: {
    usdAmount: 0,
    bitcoinAmount: 0,
    commissionAmount: 0,
    transactionType: "",
    commissionType: "",
  },
  reducers: {
    updateBitcoinAmount: (state, action) => {
      state.usdAmount = action.payload.usdAmount;
      state.bitcoinAmount = action.payload.bitcoinAmount;
      state.commissionAmount = action.payload.commissionAmount;
      state.transactionType = action.payload.transactionType;
      state.commissionType = action.payload.commissionType;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBitcoinAmount } = bitcoinAmount.actions;

export default bitcoinAmount.reducer;
