import React, { useContext } from "react";
import { ProductDataContext } from "../context/ProductData";
import { Link } from "react-router-dom";

const Products = () => {
  const AllProduct = useContext(ProductDataContext);
  console.log(AllProduct);
  return (
    <div>
      <h1>PRODUCTS PAGE</h1>
      {AllProduct.map((item, idx) => {
        return (
          <Link key={idx} to={`/product/${item.id}`}>
            <div>
              <img src={item.images} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Products;
