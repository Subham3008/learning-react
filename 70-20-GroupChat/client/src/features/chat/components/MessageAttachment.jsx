function MessageAttachment({ attachment, isMine }) {
  if (!attachment) {
    return null;
  }

  if (attachment.type.startsWith("image/")) {
    return (
      <img
        alt={attachment.name}
        className="mb-3 max-h-64 w-full rounded-md object-cover"
        src={attachment.url}
      />
    );
  }

  return (
    <a
      className={`mb-3 flex items-center gap-3 rounded-md border px-3 py-2 text-sm ${
        isMine
          ? "border-white/30 bg-white/10 text-white"
          : "border-slate-200 bg-slate-50 text-slate-800"
      }`}
      href={attachment.url}
      rel="noreferrer"
      target="_blank"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/20 text-xs font-bold">
        FILE
      </span>
      <span className="min-w-0 truncate">{attachment.name}</span>
    </a>
  );
}

export default MessageAttachment;
