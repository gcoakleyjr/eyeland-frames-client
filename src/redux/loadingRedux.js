import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        isLoading: false
    },
    reducers: {
        startLoad: (state) => {
            state.isLoading = true
        },
        endLoad: (state) => {
            state.isLoading = false
        }
    },
});

export const { startLoad, endLoad } = loadingSlice.actions;
export default loadingSlice.reducer;