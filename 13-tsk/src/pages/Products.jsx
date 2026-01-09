import { useContext } from "react";
import { ProductDataContext } from "../context/ProductData";
import { Link } from "react-router-dom";

const Products = () => {
  const AllProduct = useContext(ProductDataContext);
  let renderData = "";
  if (AllProduct.length > 0) {
    renderData = AllProduct.map((product, idx) => {
      return (
        <Link key={idx} className="product" to={`/product/${product.id}`}>
          <div>
            <img src={product.image} alt={product.title} />
            <h4> {product.title}</h4>
            <p className="price">Price:${product.price}</p>
          </div>
        </Link>
      );
    });
  }
  return <div className="all-products">{renderData}</div>;
};

export default Products;
