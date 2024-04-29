import { createSlice } from "@reduxjs/toolkit";

export const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState: {
    id: 0,
    name: "",
    accountType: "SILVER",
    traderInfo: {
      id: "",
      title: "",
    },
    bitcoin: 9999,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.accountType = action.payload.accountType;
      state.traderInfo = action.payload.traderInfo;
      state.bitcoin = action.payload.bitcoin;
    },
  },
});

export const { setSelectedUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
