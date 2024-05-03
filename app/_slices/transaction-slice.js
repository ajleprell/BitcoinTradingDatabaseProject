import { createSlice } from "@reduxjs/toolkit";

export const bitcoinAmount = createSlice({
  name: "bitcoinAmount",
  initialState: {
    usdAmountBefore: 0,
    bitcoinAmountBefore: 0,
    usdAmountAfter: 0,
    bitcoinAmountAfter: 0,
    commissionAmount: 0,
    bitcoinChange: 0,
    usdChange: 0,
    transactionType: "",
    commissionType: "",
  },
  reducers: {
    updateBitcoinAmount: (state, action) => {
      state.usdAmountBefore = action.payload.usdAmountBefore;
      state.bitcoinAmountBefore = action.payload.bitcoinAmountBefore;
      state.bitcoinChange = action.payload.bitcoinChange;
      state.usdChange = action.payload.usdChange;
      state.usdAmountAfter = action.payload.usdAmountAfter;
      state.bitcoinAmountAfter = action.payload.bitcoinAmountAfter;
      state.commissionAmount = action.payload.commissionAmount;
      state.transactionType = action.payload.transactionType;
      state.commissionType = action.payload.commissionType;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBitcoinAmount } = bitcoinAmount.actions;

export default bitcoinAmount.reducer;
