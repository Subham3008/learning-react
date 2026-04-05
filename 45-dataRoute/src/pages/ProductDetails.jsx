import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = useParams();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setSingleProduct(res.data);
    } catch (error) {
      console.log("Api fetched error form single product -->", error);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleProduct();
    }
  }, [id]);

  if (!singleProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="rounded-2xl bg-white px-6 py-4 shadow-md text-gray-600">
          Loading product details...
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    brand,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    availabilityStatus,
    images,
    thumbnail,
    shippingInformation,
    warrantyInformation,
    returnPolicy,
    sku,
    dimensions,
    weight,
    tags,
    minimumOrderQuantity,
  } = singleProduct;

  const finalPrice = (price - (price * discountPercentage) / 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white shadow-xl ring-1 ring-gray-200 overflow-hidden">
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-pink-50 to-purple-50 p-6">
              <span className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow">
                {availabilityStatus}
              </span>

              <span className="absolute right-4 top-4 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white shadow">
                {category}
              </span>

              <img
                src={thumbnail || images?.[0]}
                alt={title}
                className="mx-auto h-80 w-full max-w-md object-contain drop-shadow-2xl md:h-125"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {images?.slice(0, 3).map((img, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white p-2"
                >
                  <img
                    src={img}
                    alt={`${title}-${index}`}
                    className="h-20 w-full rounded-lg object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {brand}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {sku}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {minimumOrderQuantity} min order
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {title}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.174 3.607a1 1 0 00.95.69h3.797c.969 0 1.371 1.24.588 1.81l-3.07 2.23a1 1 0 00-.364 1.118l1.174 3.607c.3.921-.755 1.688-1.538 1.118l-3.07-2.23a1 1 0 00-1.176 0l-3.07 2.23c-.783.57-1.838-.197-1.538-1.118l1.174-3.607a1 1 0 00-.364-1.118l-3.07-2.23c-.783-.57-.38-1.81.588-1.81h3.797a1 1 0 00.95-.69l1.174-3.607z" />
                </svg>
                <span className="ml-1 text-sm font-semibold text-gray-900">
                  {rating}
                </span>
              </div>
              <span className="text-sm text-gray-500">• {stock} in stock</span>
            </div>

            <p className="mt-5 leading-7 text-gray-600">{description}</p>

            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${finalPrice}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ${price}
                </span>
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                  -{discountPercentage}%
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
                  Add to Cart
                </button>
                <button className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Shipping
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {shippingInformation}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Warranty
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {warrantyInformation}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Return Policy
                </h3>
                <p className="mt-1 text-sm text-gray-600">{returnPolicy}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Weight</h3>
                <p className="mt-1 text-sm text-gray-600">{weight}g</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                More Details
              </h3>
              <div className="mt-4 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                <p>
                  <span className="font-medium text-gray-900">Tags:</span>{" "}
                  {tags?.join(", ")}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Dimensions:</span>{" "}
                  {dimensions?.width} x {dimensions?.height} x{" "}
                  {dimensions?.depth}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
