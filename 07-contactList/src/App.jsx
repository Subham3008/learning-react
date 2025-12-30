import { useState } from "react";
import Form from "./components/Form";
import Card from "./components/Card";

const App = () => {
  const [allUser, setAllUser] = useState([]);

  const deleteHandler = (idx) => {
    const copyUser = [...allUser];
    copyUser.splice(idx, 1);
    setAllUser(copyUser);
  };

  return (
    <div className="p-4 h-screen w-screen flex ">
      <div className="bg-fuchsia-300 h-full w-[30%] rounded-bl-3xl rounded-tl-3xl flex items-center justify-center">
        <Form allUser={allUser} setAllUser={setAllUser} />
      </div>
      <div className="bg-fuchsia-300 h-full w-[70%] rounded-br-3xl rounded-tr-3xl flex flex-wrap gap-2 p-3">
        {allUser.map(function (e, idx) {
          return (
            <Card
              key={idx}
              idx={idx}
              elem={e}
              deleteHandler={deleteHandler}
              // name={e.name}
              // role={e.role}
              // description={e.description}
              // image={e.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
