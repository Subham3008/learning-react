import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProductDataContext from "./context/ProductData.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductDataContext>
      <App />
    </ProductDataContext>
  </BrowserRouter>
);
