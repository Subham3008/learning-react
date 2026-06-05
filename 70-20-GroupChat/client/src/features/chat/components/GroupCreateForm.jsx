import { useState } from "react";

function GroupCreateForm({ onCreate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    members: "",
  });

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    onCreate({
      name: form.name.trim(),
      description: form.description.trim(),
      members: form.members
        .split(",")
        .map((member) => member.trim())
        .filter(Boolean),
    });
    setForm({ name: "", description: "", members: "" });
    setIsOpen(false);
  };

  return (
    <div className="border-b border-slate-200 p-4">
      <button
        className="h-10 w-full rounded-md bg-[#2b7f74] text-sm font-semibold text-white"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        {isOpen ? "Close group form" : "Create group"}
      </button>

      {isOpen && (
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <input
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-[#2b7f74] focus:ring-4 focus:ring-[#2b7f74]/10"
            name="name"
            onChange={handleChange}
            placeholder="Group name"
            required
            value={form.name}
          />
          <input
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-[#2b7f74] focus:ring-4 focus:ring-[#2b7f74]/10"
            name="description"
            onChange={handleChange}
            placeholder="Description"
            value={form.description}
          />
          <input
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-[#2b7f74] focus:ring-4 focus:ring-[#2b7f74]/10"
            name="members"
            onChange={handleChange}
            placeholder="Members: Riya, Dev, Aman"
            value={form.members}
          />
          <button
            className="h-10 w-full rounded-md border border-[#2b7f74] bg-white text-sm font-semibold text-[#236a61]"
            type="submit"
          >
            Save group
          </button>
        </form>
      )}
    </div>
  );
}

export default GroupCreateForm;
