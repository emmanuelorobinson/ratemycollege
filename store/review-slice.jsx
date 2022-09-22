import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showReview: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    showReviewModal(state) {
      state.showReview = !state.showReview;
    }
  }
});

export const reviewActions = reviewSlice.actions;

export default reviewSlice