import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  async function getData() {
    const response = await axios.get("https://randomuser.me/api/");
    setUser(response.data);
    console.log(response.data);
    
  }

  useEffect(() => {
    getData();
  }, [name]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default App;
