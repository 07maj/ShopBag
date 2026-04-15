import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../src/features/cart/CartSlice";

export const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});
