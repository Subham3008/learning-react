import axios from "axios";

const BASE_URL = "http://localhost:5000/api/video";

export const getVideoInfo = (url) => {
  return axios.get(`${BASE_URL}/info`, {
    params: { url }
  });
};
