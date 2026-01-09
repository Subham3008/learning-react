import React from "react";
import { useContext } from "react";
import { ProductDataContext } from "../context/ProductData";
import { Link } from "react-router-dom";

const Products = () => {
  const AllProduct = useContext(ProductDataContext);
  return (
    <div className="all-products">
      {AllProduct.map((product, idx) => {
        return (
          <Link key={idx} className="product" to={`/product/${product.id}`}>
            <div>
              <img src={product.image} alt={product.title} />
              <h4> {product.title}</h4>
              <p>Price:${product.price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Products;
