import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
  name: "ui",
  initialState: {
    cartVisibility: false,
    notification: null,
  },
  reducers: {
    toggleCart(state) {
      state.cartVisibility = !state.cartVisibility;
      console.log(state.cartVisibility);
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        msg: action.payload.msg,
      };
    },
  },
});
export const uiActions = UiSlice.actions;

export default UiSlice;
