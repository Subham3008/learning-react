import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { AxiosInstance } from "../config/AxiosInstance";
import { useSelector } from "react-redux";
const Shop = () => {
  const [products, setProducts] = useState([]);
  // const { cartItem } = useSelector((store) => store.cart);
  useEffect(() => {
    (async () => {
      try {
        let res = await AxiosInstance.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log("Product APi error -->", error);
      }
    })();
  }, []);
  return (
    <div className="grid lg:grid-cols-5 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {products.map((data) => {
        // let cartItemQuentity = cartItem.find((elem) => elem.id === data.id);
        return (
          <ProductCard
            product={data}
            key={data.id}
            // quentity={cartItemQuentity?.quentity}
          />
        );
      })}
    </div>
  );
};

export default Shop;
