import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/AxiosInstance";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/login", credentials);
      console.log(res.data);

      localStorage.setItem("accessToken", res.data.accessToken);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("login failed");
    }
  },
);
