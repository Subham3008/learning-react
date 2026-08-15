import { axiosIntance } from "../config/axiosInstance";

let cacheData = null;

export let getAllProducts = async () => {
  if (cacheData) {
    return cacheData;
  }

  try {
    let res = await axiosIntance.get("/products");
    cacheData = res.data.products;
    return res.data.products;
  } catch (error) {
    console.log("error in product Api -->", error);
  }
};
