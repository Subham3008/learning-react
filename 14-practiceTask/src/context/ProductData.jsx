import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const ProductDataContext = createContext();
const ProductData = (props) => {
  const [product, setProduct] = useState([]);

  /*API CALL*/
  const getData = async () => {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    setProduct(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ProductDataContext.Provider value={product}>
      {props.children}
    </ProductDataContext.Provider>
  );
};

export default ProductData;
