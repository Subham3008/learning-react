import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ProductData from "./context/ProductData.jsx";

createRoot(document.getElementById("root")).render(
  <ProductData>
    <App />
  </ProductData>
);
