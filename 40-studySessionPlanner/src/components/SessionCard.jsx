import { useContext } from "react";
import { MyContext } from "../context/SessionContext";

const SessionCard = ({ session }) => {
  const { deleteSession, toggleComplete} =
    useContext(MyContext);
  /*--Priority bg Color-- */
  const priorityColor = (priority) => {
    if (priority === "High") return "bg-red-600";
    if (priority === "Medium") return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <div className="flex justify-between bg-gray-700 border rounded-xl px-4 py-2">
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-xl">Topic Name: {session.topicName}</h1>
        <p className="text-green-200">Subject: {session.subject}</p>
        <h3>Duration: {session.studyDuration} minutes</h3>

        {/* complete button */}
        <button
          onClick={() => toggleComplete(session.id)}
          className="bg-green-600 px-2 py-1 rounded text-xs self-start cursor-pointer"
        >
          {session.completed ? "Undo" : "Complete"}
        </button>
      </div>
      <div className="flex flex-col gap-2 items-center justify-between">
        <h2
          className={`${priorityColor(session.priority)} px-4 py-0.5 rounded-2xl border`}
        >
          {session.priority}
        </h2>
        <h3>{session.date}</h3>

        {/* Delete button */}
        <button
          onClick={() => {
            deleteSession(session.id);
          }}
          className="bg-red-700 px-2 py-0.5 rounded-sm cursor-pointer active:scale-[0.95]"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
