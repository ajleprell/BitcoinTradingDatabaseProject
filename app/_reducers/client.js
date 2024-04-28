export const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  cellPhoneNumber: "",
  email: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  password: "",
};

export const clientInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        ...action.payload,
      };
    case "SET":
      return action.payload;
    default:
      return state;
  }
};
