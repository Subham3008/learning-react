import { formatMessageTime } from "../utils/formatters.js";

function NotificationTray({ notifications, onClear, onOpen }) {
  return (
    <div className="hidden rounded-md border border-slate-200 bg-white p-4 lg:block">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-950">Notifications</h3>
        <button
          className="text-xs font-semibold text-[#236a61] disabled:text-slate-300"
          disabled={notifications.length === 0}
          onClick={onClear}
          type="button"
        >
          Clear
        </button>
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <button
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-left transition hover:border-[#2b7f74] hover:bg-[#eefbf8]"
            key={notification.id}
            onClick={() => onOpen(notification)}
            type="button"
          >
            <p className="truncate text-sm font-semibold text-slate-900">
              {notification.title}
            </p>
            <p className="mt-1 truncate text-xs text-slate-500">
              {notification.text}
            </p>
            <p className="mt-2 text-[11px] text-slate-400">
              {formatMessageTime(notification.createdAt)}
            </p>
          </button>
        ))}

        {notifications.length === 0 && (
          <p className="rounded-md bg-slate-50 px-3 py-4 text-sm text-slate-500">
            No new notifications.
          </p>
        )}
      </div>
    </div>
  );
}

export default NotificationTray;
