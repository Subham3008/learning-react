function FormInput({ label, id, ...props }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        id={id}
        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#2b7f74] focus:ring-4 focus:ring-[#2b7f74]/10"
        {...props}
      />
    </label>
  );
}

export default FormInput;
