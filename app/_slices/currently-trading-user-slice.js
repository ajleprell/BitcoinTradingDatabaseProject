import { createSlice } from "@reduxjs/toolkit";

export const currentlyTradingUserSlice = createSlice({
  name: "tradingUserSlice",
  initialState: {
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    cellPhoneNumber: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    accountType: "SILVER",
    traderInfo: {
      id: "",
      title: "",
    },
    bitcoin: 9999,
    usd: 9999,
  },
  reducers: {
    updateTradingUser: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
      state.cellPhoneNumber = action.payload.cellPhoneNumber;
      state.email = action.payload.email;
      state.streetAddress = action.payload.streetAddress;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.zipCode = action.payload.zipCode;
      state.traderInfo = action.payload.traderInfo;
      state.bitcoin = action.payload.bitcoin;
      state.usd = action.payload.usd;
    },
    updateTradingBalance: (state, action) => {
      state.bitcoin = action.payload.bitcoin;
      state.usd = action.payload.usd;
    },
  },
});

export const { updateTradingUser, updateTradingBalance } =
  currentlyTradingUserSlice.actions;

export default currentlyTradingUserSlice.reducer;
