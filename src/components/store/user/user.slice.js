import { createSlice } from "@reduxjs/toolkit";
import {
  loginuserthunk,
  registeruserthunk,
  logoutuserthunk,
  getotherusersthunk,
  getuserthunk,
} from "./user.thunk";

// Read token from localStorage on app start
const token = localStorage.getItem("token");

const initialState = {
  isAuthenticated: !!token,
  token: token || null,
  userprofile: null,
  buttonloading: false,
  screenloading: false,
  otheruser: [],
  selecteduser: JSON.parse(localStorage.getItem("selecteduser")),
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setselecteduser: (state, action) => {
      localStorage.setItem("selecteduser", JSON.stringify(action.payload));
      state.selecteduser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login user
    builder.addCase(loginuserthunk.pending, (state) => {
      state.buttonloading = true;
    });
    builder.addCase(loginuserthunk.fulfilled, (state, action) => {
      state.buttonloading = false;
      state.userprofile = action.payload.user; // adjust according to your API
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(loginuserthunk.rejected, (state, action) => {
      state.buttonloading = false;
      state.error = action.error.message;
    });

    // Register user
    builder.addCase(registeruserthunk.pending, (state) => {
      state.buttonloading = true;
    });
    builder.addCase(registeruserthunk.fulfilled, (state, action) => {
      state.buttonloading = false;
      state.userprofile = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(registeruserthunk.rejected, (state) => {
      state.buttonloading = false;
    });

    // Logout user
    builder.addCase(logoutuserthunk.pending, (state) => {
      state.buttonloading = true;
    });
    builder.addCase(logoutuserthunk.fulfilled, (state) => {
      state.buttonloading = false;
      state.isAuthenticated = false;
      state.userprofile = null;
      state.otheruser = [];
      state.selecteduser = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("selecteduser");
    });
    builder.addCase(logoutuserthunk.rejected, (state) => {
      state.buttonloading = false;
    });

    // Get user profile (after page refresh or to update user info)
    builder.addCase(getuserthunk.pending, (state) => {
      state.screenloading = true;
    });
    builder.addCase(getuserthunk.fulfilled, (state, action) => {
      state.screenloading = false;
      state.isAuthenticated = true;
      state.userprofile = action.payload.responseData;
    });
    builder.addCase(getuserthunk.rejected, (state, action) => {
      state.screenloading = false;
      state.error = action.error.message;
    });

    // Get other users
    builder.addCase(getotherusersthunk.pending, (state) => {
      state.screenloading = true;
    });
    builder.addCase(getotherusersthunk.fulfilled, (state, action) => {
      state.screenloading = false;
      state.otheruser = action.payload.responseData;
    });
    builder.addCase(getotherusersthunk.rejected, (state) => {
      state.screenloading = false;
    });
  },
});

export const { setselecteduser } = userSlice.actions;

export const selectUserProfile = (state) => state.user.userprofile;

export default userSlice.reducer;
