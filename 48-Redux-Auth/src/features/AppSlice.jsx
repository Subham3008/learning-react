import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./actions/authAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticate: false,
    isLoading: true,
  },
  reducers: {
    removeUser: (state) => {
      ((state.user = null),
        (state.isAuthenticate = false),
        (state.isLoading = false));
    },
  },
  //builder points "auyh/login" inside authAction
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        ((state.user = action.payload),
          (state.isAuthenticate = true),
          (state.isLoading = false));
      })
      .addCase(loginUser.rejected, (state) => {
        ((state.user = null),
          (state.isAuthenticate = false),
          (state.isLoading = false));
      });
  },
});

export const { removeUser } = authSlice.actions;

export default authSlice.reducer;
