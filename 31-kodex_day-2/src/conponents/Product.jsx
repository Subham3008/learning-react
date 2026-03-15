import React from "react";

const Product = ({ product, removeProduct }) => {
  return (
    <div className="flex flex-col h-82 w-70 bg-gray-800 border border-white rounded-xl p-4 justify-between">
      <div className="h-[50%] bg-gray-500 rounded-xl px-3 py-1">
        <img className="h-full w-full" src={product.image} alt="image" />
      </div>
      <h1 className="text-lg font-bold">
        Category:{" "}
        <span className="font-light opacity-75 text-lg">
          {product.category}
        </span>
      </h1>
      <p className="text-lg font-bold">
        Price:{" "}
        <span className="font-light text-cyan-400 text-lg">
          ${product.price}
        </span>
      </p>
      <p className="font-light opacity-75 text-sm">{product.title}</p>
      <button
        onClick={() => {
          removeProduct(product.id);
        }}
        className="bg-red-700 cursor-pointer border border-none py-1 rounded-lg active:scale-95"
      >
        remove
      </button>
    </div>
  );
};

export default Product;
