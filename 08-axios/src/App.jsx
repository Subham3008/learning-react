import React from "react";
import axios from "axios";
import { useState } from "react";
import Card from "./components/Card";

const App = () => {
  const [user, setAllUser] = useState([]);
  async function getData() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setAllUser(response.data);
  }
  return (
    <>
      <div>
        <button onClick={getData}>Get Data</button>
      </div>
      <div className="show-user">
        {user.map((elem, idx) => {
          return (
            <div key={idx}>
              <Card elem={elem} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
