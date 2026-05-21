import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [multiFile, setMultiFile] = useState([]);

  let handleSendFile = async () => {
    try {
      let formData = new FormData(); //FormData() is a browser object used to send form fields + files to the server.
      formData.append("image", file);

      let res = await axios.post(
        "http://localhost:3000/api/file/upload",
        formData,
      );

      console.log(res);
    } catch (err) {
      console.log("error form clinet", err);
    }
  };

  let handleSendMultipleFiles = async () => {
    try {
      let formData = new FormData();

      for (let files of multiFile) {
        formData.append("images", files);
      }

      let res = await axios.post(
        "http://localhost:3000/api/file/multi-upload",
        formData,
      );

      console.log(res);
    } catch (err) {
      console.log("error form clinet", err);
    }
  };

  return (
    <div>
      <div>
        <h1>Upload your file</h1>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleSendFile}>upload</button>
      </div>
      <div>
        <h1>Upload Multiple files</h1>
        <input
          type="file"
          multiple
          onChange={(e) => setMultiFile([...e.target.files])}
        />
        <button onClick={handleSendMultipleFiles}>upload</button>
      </div>
    </div>
  );
};

export default App;
