import React, { useEffect, useRef, useState } from "react";
import List from "./components/List";
import axios from "axios";

const App = () => {
  const listRef = useRef({});
  const [listsData, setListsData] = useState([]);
  const [editListId, setEditListId] = useState(null);

  //get data from server
  const getData = async () => {
    try {
      let lists = await axios.get("http://localhost:3000/api/lists");
      setListsData(lists.data.allList);
    } catch (err) {
      console.log("List Api failed", err);
    }
  };
  console.log(listsData);

  useEffect(() => {
    getData();
  }, []);

  //send data to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    let obj = {
      name: listRef.current.name.value,
      description: listRef.current.description.value,
    };

    try {
      if (editListId) {
        await axios.put(
          `http://localhost:3000/api/lists/update/${editListId}`,
          obj,
        );
        setEditListId(null);
      } else {
        let res = await axios.post(
          "http://localhost:3000/api/lists/create",
          obj,
        );
      }

      e.target.reset();
      await getData();
    } catch (err) {
      console.log("Failed to send data to server", err);
    }
  };

  //delete list
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/lists/delete/${id}`);
      await getData();
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  //edit & update list
  const handleEdit = (todo) => {
    setEditListId(todo._id);
    listRef.current.name.value = todo.name;
    listRef.current.description.value = todo.description;
  };

  return (
    <div className="h-screen w-full bg-zinc-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[90vh] bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-col gap-5">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold">Todo App</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage your daily tasks</p>
        </div>

        {/* Form Section */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              ref={(e) => (listRef.current.name = e)}
              type="text"
              placeholder="Enter todo name"
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 placeholder:text-zinc-500"
            />

            <textarea
              ref={(e) => (listRef.current.description = e)}
              rows="4"
              placeholder="Enter todo description"
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none resize-none focus:border-blue-500 placeholder:text-zinc-500"
            ></textarea>

            <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-3 rounded-xl font-semibold">
              {editListId ? "Save Changes" : "Add Todo"}
            </button>
          </form>
        </div>

        <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Todos</h2>
            <span className="text-sm text-zinc-400">All Tasks</span>
          </div>

          <div className="flex flex-col gap-3">
            {listsData.map((elem) => {
              return (
                <List
                  key={elem._id}
                  list={elem}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
