import { createContext, useState } from "react";
import { nanoid } from "nanoid";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [sessions, setSessions] = useState(
    JSON.parse(localStorage.getItem("allSessions")) || [],
  );

  /*--Add Session--*/
  let addSession = (data) => {
    let allSessions = [...sessions, { ...data, id: nanoid() }];
    setSessions(allSessions);
    localStorage.setItem("allSessions", JSON.stringify(allSessions));
  };

  /*--Delete Session--*/
  let deleteSession = (id) => {
    let updatedSession = sessions.filter((data) => {
      return data.id !== id;
    });
    setSessions(updatedSession);
    localStorage.setItem("allSessions", JSON.stringify(updatedSession));
  };

  return (
    <MyContext.Provider
      value={{ setSessions, sessions, deleteSession, addSession }}
    >
      {children}
    </MyContext.Provider>
  );
};
