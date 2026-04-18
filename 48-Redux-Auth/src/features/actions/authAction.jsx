import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", credentials);
      console.log(res.data);
      
      localStorage.setItem("accessToken", res.data.accessToken)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue("login failed");
    }
  },
);
