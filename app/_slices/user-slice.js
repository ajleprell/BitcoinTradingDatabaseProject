import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
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
    createUser: (state, action) => {
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
    updateBalance: (state, action) => {
      state.bitcoin = action.payload.bitcoin;
    },
  },
});

export const { createUser, updateBalance } = userSlice.actions;

export default userSlice.reducer;
