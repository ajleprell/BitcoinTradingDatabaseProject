import { createSlice } from "@reduxjs/toolkit";

export const currentlyTradingUserSlice = createSlice({
  name: "tradingUserSlice",
  initialState: {
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
  },
  reducers: {
    updateTradingUser: (state, action) => {
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
    },
  },
});

export const { updateTradingUser } = currentlyTradingUserSlice.actions;

export default currentlyTradingUserSlice.reducer;