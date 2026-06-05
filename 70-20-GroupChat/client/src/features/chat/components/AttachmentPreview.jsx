function AttachmentPreview({ attachment, onRemove }) {
  if (!attachment) {
    return null;
  }

  return (
    <div className="border-t border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-3">
        <div className="flex min-w-0 items-center gap-3">
          {attachment.type.startsWith("image/") ? (
            <img
              alt={attachment.name}
              className="h-12 w-12 rounded-md object-cover"
              src={attachment.url}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#dff5f0] text-sm font-bold text-[#236a61]">
              FILE
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {attachment.name}
            </p>
            <p className="text-xs text-slate-500">
              {(attachment.size / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>

        <button
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
          onClick={onRemove}
          type="button"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default AttachmentPreview;
