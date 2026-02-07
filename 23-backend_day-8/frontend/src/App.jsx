import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [noteId, setNoteId] = useState(null);

  /*-Fetched data backend to frontend */
  function fetchData() {
    axios
      .get("https://learning-react-1-6wsq.onrender.com/api/notes")
      .then((res) => {
        setNotes(res.data.notes);
        // console.log(res.data);
      });
  }

  /*-submitHandler */
  function submitHandler(e) {
    e.preventDefault();

    if (isEditing) {
      axios
        .patch(
          `https://learning-react-1-6wsq.onrender.com/api/notes/${noteId}`,
          {
            description,
          },
        )
        .then(() => {
          fetchData();
          setIsEditing(false);
          setNoteId(null);
          setTitle("");
          setDescription("");
        });
    } else {
      axios
        .post("https://learning-react-1-6wsq.onrender.com/api/notes", {
          title,
          description,
        })
        .then(() => {
          fetchData();
          setTitle("");
          setDescription("");
        });
    }
  }

  /*-deleteHandler */
  function deleteHandler(deleteId) {
    axios
      .delete(
        `https://learning-react-1-6wsq.onrender.com/api/notes/${deleteId}`,
      )
      .then((res) => {
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
          <input
            name="title"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            name="description"
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button id="addBtn">Add note</button>
        </form>
        <div className="notes">
          {notes.map((note) => {
            return (
              <div className="note" key={note._id}>
                <h1>{note.title}</h1>
                <p>{note.description}</p>
                <div className="btn-container">
                  <button
                    id="updateBtn"
                    onClick={() => {
                      setTitle(note.title);
                      setDescription(note.description);
                      setIsEditing(true);
                      setNoteId(note._id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    id="deleteBtn"
                    onClick={() => {
                      deleteHandler(note._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default App;
