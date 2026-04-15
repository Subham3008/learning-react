import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./features/counterSlice";

const App = () => {
  const { count } = useSelector((store) => store.count);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>This is from Redux </h1>
      <h1>Count is - {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default App;
