import axios from "axios";

export let axiosIntance = axios.create({
  baseURL: "https://dummyjson.com",
});
