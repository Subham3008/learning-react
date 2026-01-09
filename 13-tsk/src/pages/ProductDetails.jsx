import React, { useContext } from "react";
import { ProductDataContext } from "../context/ProductData";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const product = useContext(ProductDataContext);
  const { productId } = useParams();

  const selectedProduct = product.find(
    (prod) => prod.id == productId
  );

  if (!selectedProduct || selectedProduct.length === 0) {
    return <h2>Loading...</h2>;
  }

  const navigate = useNavigate();

  return (
    <div className="show-product">
      <div>
        <button className="backBtn" onClick={() => navigate("/")}>Back to Home</button>
      </div>
      <div className="specific-product">
        <img src={selectedProduct.image} alt={selectedProduct.title} />
        <h4> {selectedProduct.title}</h4>
        <p className="price">Price:${selectedProduct.price}</p>
        <p>Category:{selectedProduct.category}</p>
        <p className="description">{selectedProduct.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
