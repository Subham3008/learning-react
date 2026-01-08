import React from "react";
import { useContext } from "react";
import { ProductDataContext } from "./context/ProductData";

const App = () => {
  const AllProduct = useContext(ProductDataContext);
  // console.log(AllProduct)

  return (
    <div className="all-products">
      {AllProduct.map((product, idx) => {
        return (
          <a href="" key={idx}>
            <div className="product">
              <img src={product.image} alt={product.title} />
              <h4> {product.title}</h4>
              <p>Price:{product.price}$</p>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default App;
