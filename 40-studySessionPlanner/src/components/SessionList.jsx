import { useContext } from "react";
import SessionCard from "./SessionCard";
import { MyContext } from "../context/SessionContext";

const SessionList = () => {
  let { sessions, totalStudyDuration } = useContext(MyContext);

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex items-center justify-between sticky top-0 bg-gray-900 ">
        <h1 className="font-bold text-xl py-4">UPCOMING SESSIONS</h1>
        <h1 className="border bg-gray-700 px-2 py-1 rounded-xl">
          Total study duration: {totalStudyDuration} minutes
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        {sessions.map((session) => {
          return <SessionCard key={session.id} session={session} />;
        })}
      </div>
    </div>
  );
};

export default SessionList;
