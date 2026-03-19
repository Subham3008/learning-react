import React, { useState } from "react";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import Post from "./components/Post";

const App = () => {
  const [toggle, setToggle] = useState(true);
  const [postArr, setPostArr] = useState([]);
  const [editPost, setEditPost] = useState(null);

  /*remove post function-- */

  const handleDelete = (index) => {
    const updatedArr = postArr.filter((elem, idx) => {
      return idx !== index;
    });
    setPostArr(updatedArr);
  };

  /*--Update Post-- */

  const updatePost = (data) => {
    const updatedArr = postArr.map((elem, idx) => {
      if (idx === editPost) {
        return data;
      }
      return elem;
    });

    setPostArr(updatedArr);
    setEditPost(null);
    setToggle(false);
  };

  return (
    <div className="h-screen bg-gray-600 ">
      <Navbar setToggle={setToggle} toggle={toggle} />

      {toggle ? (
        <UserForm
          setPostArr={setPostArr}
          updatePost={updatePost}
          editPost={editPost}
          postArr={postArr}
        />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 p-6 bg-gray-600 ">
          {postArr.map((elem, idx) => {
            return (
              <Post
                key={idx}
                post={elem}
                handleDelete={() => handleDelete(idx)}
                handleEdit={() => {
                  setEditPost(idx);
                  setToggle(true);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
