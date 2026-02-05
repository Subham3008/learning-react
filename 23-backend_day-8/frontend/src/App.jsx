import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  function fetchData() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
      // console.log(res.data);
    });
  }

  /*-submitHandler */
  function submitHandler(e) {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    e.target.reset();

    axios
      .post("http://localhost:3000/api/notes", {
        title: title,
        description: description,
      })
      .then((res) => {
        console.log(res.data);
        fetchData();
      });
  }

  /*-deleteHandler */
  function deleteHandler(deleteId) {
    axios.delete(`http://localhost:3000/api/notes/${deleteId}`).then((res) => {
      console.log(res.data);
      fetchData();
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main>
        <form className="note-form" onSubmit={submitHandler}>
          <input name="title" type="text" placeholder="Enter Title" />
          <input
            name="description"
            type="text"
            placeholder="Enter Description"
          />
          <button>Create note</button>
        </form>
        <div className="notes">
          {notes.map((note) => {
            return (
              <div className="note" key={note._id}>
                <h1>{note.title}</h1>
                <p>{note.description}</p>
                <button
                  onClick={() => {
                    deleteHandler(note._id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default App;
