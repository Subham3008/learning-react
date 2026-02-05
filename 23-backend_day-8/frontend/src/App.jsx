import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  function fetchData() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
      console.log(res.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main>
        <div className="notes">
          {notes.map((note) => {
            return (
              <div className="note" key={note._id}>
                <h1>{note.title}</h1>
                <p>{note.description}</p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default App;
