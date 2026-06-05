function GroupMemberList({ members }) {
  return (
    <aside className="hidden w-64 shrink-0 border-l border-slate-200 bg-white p-4 xl:block">
      <h3 className="text-sm font-semibold text-slate-950">Members</h3>
      <div className="mt-4 space-y-3">
        {members.map((member) => (
          <div className="flex items-center gap-3" key={member.id}>
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#dff5f0] text-sm font-bold text-[#236a61]">
              {member.avatar}
              <span
                className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white ${
                  member.status === "online"
                    ? "bg-emerald-500"
                    : member.status === "away"
                      ? "bg-amber-400"
                      : "bg-slate-300"
                }`}
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {member.name}
              </p>
              <p className="text-xs text-slate-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default GroupMemberList;
