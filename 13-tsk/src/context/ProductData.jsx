import { createContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export const ProductDataContext = createContext();

const ProductData = (props) => {
  const [AllProduct, setAllProduct] = useState([]);
  const getData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setAllProduct(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ProductDataContext.Provider value={AllProduct}>{props.children}</ProductDataContext.Provider>
  );
};

export default ProductData;
