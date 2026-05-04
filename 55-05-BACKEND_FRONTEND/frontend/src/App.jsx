import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const initialState = {
    name: "",
    description: "",
    category: "MEN",
    amount: "",
    currency: "INR",
    stock: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      //sed data to server
      let res = await axios.post("http://localhost:3000/products", formData);
      //form reset
      setFormData(initialState);
    } catch (err) {
      console.log("Error in post Api", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Product Creation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1">Product Name</label>
            <input
              type="text"
              value={formData.name}
              placeholder="Enter product name"
              className="w-full p-2 rounded bg-gray-700 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Description</label>
            <input
              type="text"
              value={formData.description}
              placeholder="Enter description"
              className="w-full p-2 rounded bg-gray-700 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1">Category</label>
            <select
              value={formData.category}
              className="w-full p-2 rounded bg-gray-700 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option value="MEN">MEN</option>
              <option value="WOMEN">WOMEN</option>
              <option value="KIDS">KIDS</option>
            </select>
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1">Amount</label>
              <input
                type="number"
                value={formData.amount}
                placeholder="Amount"
                className="w-full p-2 rounded bg-gray-700 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, amount: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block mb-1">Currency</label>
              <select
                value={formData.currency}
                className="w-full p-2 rounded bg-gray-700 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-1">Stock</label>
            <input
              type="number"
              value={formData.stock}
              placeholder="Stock quantity"
              className="w-full p-2 rounded bg-gray-700 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, stock: Number(e.target.value) })
              }
            />
          </div>

          {/* Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition p-2 rounded font-semibold">
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
