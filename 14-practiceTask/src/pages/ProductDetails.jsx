import React, { useContext } from "react";
import { ProductDataContext } from "../context/ProductData";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const ProductDetails = useContext(ProductDataContext);
  const { id } = useParams();

  let Product = ProductDetails.find((item) => item.id === parseInt(id));
  console.log(Product);

  if (!Product || Product.length === 0) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <h1>PRODUCT DETAILS PAGE</h1>
      <img src={Product.images} alt={Product.title} />
      <h3>{Product.title}</h3>
      <p>{Product.price}</p>
    </div>
  );
};

export default ProductDetails;
