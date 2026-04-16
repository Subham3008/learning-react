import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Cart = () => {
  const { cartItem } = useSelector((store) => store.cart);

  if (cartItem?.length < 1) {
    return <h1 className="text-4xl font-semibold">No items here</h1>;
  }
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
      {cartItem?.map((item) => {
        return <ProductCard product={item} key={item.id} />;
      })}
    </div>
  );
};

export default Cart;
