import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex items-center justify-center h-screen p-4 bg-gray-300">
      {toggle ? (
        <Login setToggle={setToggle} />
      ) : (
        <Register setToggle={setToggle} />
      )}
    </div>
  );
};

export default App;
