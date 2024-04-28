import { createSlice } from "@reduxjs/toolkit";

export const bitcoinAmount = createSlice({
  name: "bitcoinAmount",
  initialState: {
    usdAmount: 0,
    feeType: "Fiat Currency",
    bitcoinAmount: 0,
  },
  reducers: {
    updateBitcoinAmount: (state, action) => {
      state.usdAmount = action.payload.usdAmount;
      state.feeType = action.payload.feeType;
      state.bitcoinAmount = action.payload.bitcoinAmount;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBitcoinAmount } = bitcoinAmount.actions;

export default bitcoinAmount.reducer;
