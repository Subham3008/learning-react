import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const isExist = state.cartItem.find((elem) => elem.id === id);
      if (isExist) {
        isExist.quentity += 1;
      } else {
        state.cartItem.push({ ...action.payload, quentity: 1 });
      }
    },
    quentityDecrease: (state, action) => {
      const { id } = action.payload;
      const item = state.cartItem.find((elem) => elem.id === id);
      if (item?.quentity > 1) {
        item.quentity -= 1;
      } else {
        state.cartItem = state.cartItem.filter((item) => item.id !== id);
        alert("remove from cart");
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cartItem = state.cartItem.filter((item) => item.id !== id);
    },
  },
});

export const { addToCart, removeFromCart, quentityDecrease } =
  cartSlice.actions;

export default cartSlice.reducer;
