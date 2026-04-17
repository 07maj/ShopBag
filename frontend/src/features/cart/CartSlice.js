import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  TotalPrice: 0,
  TotalQuantity: 0,
};

export const cartSave = createAsyncThunk("cart/save", async (cartData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(cartData),
  });
  return await response.json();
});

export const fetchCart = createAsyncThunk("/cart/fetch", async (userId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, actions) => {
      const find = state.cart.findIndex((value) => {
        return value._id === actions.payload._id;
      });
      if (find != -1) {
        state.cart[find] = {
          ...state.cart[find],
          quantity: state.cart[find].quantity + 1,
        };
      } else {
        state.cart.push({ ...actions.payload, quantity: 1 });
      }
    },
    deleteCartItem: (state, actions) => {
      state.cart = state.cart.filter((value) => {
        return value._id !== actions.payload._id;
      });
    },
    IncrementQuantity: (state, actions) => {
      state.cart = state.cart.map((value) => {
        if (value._id === actions.payload._id) {
          return { ...value, quantity: value.quantity + 1 };
        }
        return value;
      });
    },
    DecrementQuantity: (state, actions) => {
      state.cart = state.cart.map((value) => {
        if (value._id === actions.payload._id) {
          return {
            ...value,
            quantity: value.quantity > 1 ? value.quantity - 1 : 1,
          };
        }
        return value;
      });
    },
    cartTotal: (state) => {
      const { totalPrice, totalQuantity } = state.cart.reduce(
        (cartTotal, cartItems) => {
          const { productPrice, quantity } = cartItems;
          const itemTotal = parseFloat(productPrice) * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        },
      );

      state.TotalPrice = totalPrice;
      state.TotalQuantity = totalQuantity;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cartSave.fulfilled, (state, actions) => {});
    builder.addCase(fetchCart.fulfilled, (state, actions) => {
      if(state.cart.length === 0){
        const { cartItems, totalPrice, totalQuantity } = actions.payload;
      state.cart = cartItems || [];
      state.TotalPrice = totalPrice || 0;
      state.TotalQuantity = totalQuantity || 0;
      }
    });
  },
});

export const {
  addToCart,
  deleteCartItem,
  IncrementQuantity,
  DecrementQuantity,
  cartTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
