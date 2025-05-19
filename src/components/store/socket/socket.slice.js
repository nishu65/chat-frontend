import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connected: false, // ✅ Only store connection status
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
    },
});

// ✅ Export actions
export const { setConnected } = socketSlice.actions;

// ✅ Export reducer
export default socketSlice.reducer;
