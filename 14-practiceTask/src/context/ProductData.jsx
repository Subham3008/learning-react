import { createContext, useEffect } from "react";
import { useState } from "react";
import { getData } from "../api/api";

export const ProductDataContext = createContext();
const ProductData = (props) => {
  const [product, setProduct] = useState([]);

  /*API CALL*/
  const setData = async () => {
    setProduct(await getData());
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <ProductDataContext.Provider value={product}>
      {props.children}
    </ProductDataContext.Provider>
  );
};

export default ProductData;
