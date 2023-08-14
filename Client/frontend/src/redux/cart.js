// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch {
    // Ignore write errors
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadState() || {
    products: [],
    quantity: 1,
    total: 0,
    userid:""
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
      if (state.quantity < 0) {
        state.quantity = 0;
      }
      saveState(state); // Save the updated state to localStorage
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex !== -1) {
        const deletedProduct = state.products.splice(productIndex, 1)[0];
        state.quantity -= deletedProduct.quantity;
        state.total -= deletedProduct.price * deletedProduct.quantity;
        if (state.quantity < 0) {
          state.quantity = 0;
        }
        saveState(state); // Save the updated state to localStorage
      }
    },
  },
});

export const { addProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
