import { useLoaderData } from "react-router";
import ProductItem from "../components/productItem";

const Home = () => {
  let products = useLoaderData();
  console.log("Data from home:", products);

  return (
    <div className="grid grid-cols-5 gap-4">
      {products.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Home;
