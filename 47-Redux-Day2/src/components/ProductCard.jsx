import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  quentityDecrease,
  removeFromCart,
} from "../features/cartSlice";
import { useLocation } from "react-router";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { cartItem } = useSelector((store) => store.cart);
  const item = cartItem.find((elem) => elem.id === product.id);
  const quentity = item?.quentity || 0;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group flex flex-col justify-between">
      {/* Image */}
      <div className="w-full h-52 overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product?.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {product?.description}
        </p>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-indigo-600">
            ₹{product?.price}
          </span>

          <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
            ⭐ {product?.rating?.rate || 4.5}
          </span>
        </div>

        {/* Button */}
        {pathname === "/cart" ? (
          <div className="flex flex-col">
            <p className="text-black">Quentity-{quentity}</p>
            <button
              onClick={() => dispatch(removeFromCart(product))}
              className="mt-3 bg-red-600 text-white py-2 rounded-xl hover:bg-red-400 transition"
            >
              Remove from Cart
            </button>
          </div>
        ) : quentity ? (
          <div className="flex justify-between mt-3 items-center">
            <button
              onClick={() => dispatch(quentityDecrease(product))}
              className="bg-red-500 text-white py-1 rounded-xl hover:bg-red-700 transition px-4 text-xl font-bold"
            >
              -
            </button>
            <p className="text-2xl font-semibold">{quentity}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-green-500 text-white py-1 rounded-xl hover:bg-green-700 transition px-4 text-xl font-bold"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              dispatch(addToCart(product));
              alert("Item added to cart");
            }}
            className="mt-3 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
