import { useNavigate } from "react-router";

const ProductItem = ({ product }) => {
  const {
    id,
    title,
    price,
    discountPercentage,
    rating,
    brand,
    category,
    thumbnail,
    availabilityStatus,
    description,
  } = product;

  const finalPrice = (price - (price * discountPercentage) / 100).toFixed(2);

  const navigate = useNavigate();

  return (
    <div className="max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
      <div onClick={() => navigate(`product/details/${id}`)} className="relative">
        <img src={thumbnail} alt={title} className="h-72 w-full object-cover" />

        <span className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
          {availabilityStatus}
        </span>

        <span className="absolute right-4 top-4 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
          -{discountPercentage}%
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            {brand}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {category}
          </span>
        </div>

        <h2 className="mt-3 line-clamp-2 text-lg font-semibold text-gray-900">
          {title}
        </h2>

        <div className="mt-2 flex items-center gap-2">
          <svg
            className="h-4 w-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.174 3.607a1 1 0 00.95.69h3.797c.969 0 1.371 1.24.588 1.81l-3.07 2.23a1 1 0 00-.364 1.118l1.174 3.607c.3.921-.755 1.688-1.538 1.118l-3.07-2.23a1 1 0 00-1.176 0l-3.07 2.23c-.783.57-1.838-.197-1.538-1.118l1.174-3.607a1 1 0 00-.364-1.118l-3.07-2.23c-.783-.57-.38-1.81.588-1.81h3.797a1 1 0 00.95-.69l1.174-3.607z" />
          </svg>
          <span className="text-sm font-semibold text-gray-900">{rating}</span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-gray-600">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">${finalPrice}</p>
            <p className="text-sm text-gray-400 line-through">${price}</p>
          </div>

          <button className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
