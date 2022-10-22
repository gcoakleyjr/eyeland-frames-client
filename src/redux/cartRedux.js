import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        emptyCart: (state) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0
        },
        increaseProduct: (state, action) => {
            state.products[action.payload.index].quantity += 1
            state.total += action.payload.price
        },
        decreaseProduct: (state, action) => {
            state.products[action.payload.index].quantity -= 1
            state.total -= action.payload.price
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload._id)
            state.total -= action.payload.price * action.payload.quantity;
            state.quantity -= 1;
        }
    },
});

export const { addProduct, emptyCart, increaseProduct, decreaseProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;