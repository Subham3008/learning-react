import { useContext } from "react";
import SessionCard from "./SessionCard";
import { MyContext } from "../context/SessionContext";

const SessionList = () => {
  const { sessions, totalStudyDuration } = useContext(MyContext);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 py-4">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
          📚 Upcoming Sessions
        </h1>

        <div className="bg-gray-800 border px-4 py-2 rounded-xl text-sm sm:text-base">
          Total Duration:{" "}
          <span className="font-semibold">{totalStudyDuration}</span> min
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-600 mb-4"></div>

      {/* Content */}
      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400 mt-10">
          <p className="text-lg">No sessions yet</p>
          <p className="text-sm">Start by adding one from the form</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 pr-2 overflow-y-scroll no-scrollbar">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionList;
