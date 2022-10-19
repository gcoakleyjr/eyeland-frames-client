import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        loggedIn: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload
            state.loggedIn = true
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true
        },
        logout: (state) => {
            state.currentUser = null;
            state.loggedIn = false
        },
        registerStart: (state) => {
            state.isFetching = true
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload
            state.loggedIn = true
        },
        registerFailure: (state) => {
            state.isFetching = false;
            state.error = true
        },
    },
});

export const { loginFailure, loginStart, loginSuccess, logout, registerFailure, registerStart, registerSuccess } = userSlice.actions;
export default userSlice.reducer;