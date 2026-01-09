import React, { useContext } from "react";
import { ProductDataContext } from "../context/ProductData";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const product = useContext(ProductDataContext);
  const { productId } = useParams();

  const selectedProduct = product.find(
    (prod) => prod.id === parseInt(productId)
  );

  if (!selectedProduct || selectedProduct.length === 0) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="show-product">
      <div className="specific-product">
        <img src={selectedProduct.image} alt={selectedProduct.title} />
        <h4> {selectedProduct.title}</h4>
        <p>Price:${selectedProduct.price}</p>
        <p>Category:{selectedProduct.category}</p>
        <p>{selectedProduct.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
