import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./cartSlice";
import UiSlice from "./uiSlice";

export const Store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    ui: UiSlice.reducer,
  },
});

// export default Store;
