function PrimaryButton({ children, ...props }) {
  return (
    <button
      className="flex h-11 w-full items-center justify-center rounded-md bg-[#2b7f74] px-4 text-sm font-semibold text-white transition hover:bg-[#236a61] disabled:cursor-not-allowed disabled:opacity-70"
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
