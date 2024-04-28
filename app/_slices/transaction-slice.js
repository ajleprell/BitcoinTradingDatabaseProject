import { createSlice } from "@reduxjs/toolkit";

export const bitcoinAmount = createSlice({
  name: "bitcoinAmount",
  initialState: {
    bitcoinAmount: 0,
  },
  reducers: {
    updateBitcoinAmount: (state, action) => {
      state.bitcoinAmount = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBitcoinAmount } = bitcoinAmount.actions;

export default bitcoinAmount.reducer;
