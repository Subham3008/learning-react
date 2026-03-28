const SessionCard = ({ session, deleteSession }) => {
  const priorityColor = (priority) => {
    if (session.priority === "High") return "bg-red-600";
    if (session.priority === "Medium") return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <div className="flex justify-between bg-gray-700 border rounded-xl px-4 py-2">
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-xl">Topic Name: {session.topicName}</h1>
        <p className="text-green-200">Subject: {session.subject}</p>
        <h3>Duration: {session.studyDuration} minutes</h3>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h2
          className={`${priorityColor(session.priority)} px-2 py-0.5 rounded-2xl border`}
        >
          {session.priority}
        </h2>
        <h3>{session.date}</h3>
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
