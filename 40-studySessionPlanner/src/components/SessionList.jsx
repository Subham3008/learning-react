import { useContext } from "react";
import SessionCard from "./SessionCard";
import { MyContext } from "../context/SessionContext";

const SessionList = () => {
  let { sessions, deleteSession } = useContext(MyContext);

  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="font-bold text-xl sticky top-0 bg-gray-900 py-4">UPCOMING SESSIONS</h1>
      <div className="flex flex-col gap-4">
        {sessions.map((session) => {
          return (
            <SessionCard
              key={session.id}
              session={session}
              deleteSession={deleteSession}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SessionList;
