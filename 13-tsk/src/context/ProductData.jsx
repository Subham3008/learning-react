import { createContext } from "react";
import { useEffect, useState } from "react";
import { getData } from "../api/productApi";

export const ProductDataContext = createContext();

const ProductData = (props) => {
  const [AllProduct, setAllProduct] = useState([]);

  const setData = async () => {
    setAllProduct(await getData());
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <ProductDataContext.Provider value={AllProduct}>
      {props.children}
    </ProductDataContext.Provider>
  );
};

export default ProductData;
