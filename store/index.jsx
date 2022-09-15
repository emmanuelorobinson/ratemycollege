import { configureStore } from "@reduxjs/toolkit";

import loginSlice from "./login-slice";
import reviewSlice from "./review-slice";

const store = configureStore({
  reducer: { login: loginSlice.reducer, review: reviewSlice.reducer },
});

export default store;
