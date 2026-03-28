import { createContext, useState } from "react";
import { nanoid } from "nanoid";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [sessions, setSessions] = useState(
    JSON.parse(localStorage.getItem("allSessions")) || [],
  );

  /*--Add Session--*/
  let addSession = (data) => {
    let allSessions = [
      ...sessions,
      { ...data, id: nanoid(), completed: false },
    ];
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

  /*--Completed features-- */
  let toggleComplete = (id) => {
    let updatedSession = sessions.map((session) => {
      if (session.id === id) {
        return { ...session, completed: !session.completed };
      }
      return session;
    });
    setSessions(updatedSession);
    localStorage.setItem("allSessions", JSON.stringify(updatedSession));
  };

  /*--Total study duration-- */
  const totalStudyDuration = sessions
    .filter((session) => !session.completed)
    .reduce((acc, curr) => {
      return acc + Number(curr.studyDuration);
    }, 0);

  return (
    <MyContext.Provider
      value={{
        setSessions,
        sessions,
        deleteSession,
        addSession,
        toggleComplete,
        totalStudyDuration,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
