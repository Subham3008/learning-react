import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AppSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
