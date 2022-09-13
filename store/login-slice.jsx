import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  showSigninModal: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    showSignInModal(state) {
      state.showSignInModal = !state.showSignInModal;
    }
  }
});

export const loginActions = loginSlice.actions;

export default loginSlice