function AlertMessage({ children }) {
  if (!children) {
    return null;
  }

  return (
    <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
      {children}
    </div>
  );
}

export default AlertMessage;
