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
    bitcoin: 0,
  },
  reducers: {
    createUser: (state, action) => {
      console.log("State:", state);
      console.log("Action:", action);

      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
      state.cellPhoneNumber = action.payload.cellPhoneNumber;
      state.email = action.payload.email;
      state.streetAddress = action.payload.streetAddress;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.zipCode = action.payload.zipCode;
    },
  },
});

export const { createUser } = userSlice.actions;

export default userSlice.reducer;
