import { useState } from "react";

const Navbar = ({ toggle, setToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-gray-800 text-white shadow-md">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-xl font-bold text-gray-300">SHERYIANS</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-400 font-medium">
          <p className="cursor-pointer hover:text-white transition">Home</p>
          <p className="cursor-pointer hover:text-white transition">About</p>
          <p className="cursor-pointer hover:text-white transition">Services</p>
        </div>

        {/* Desktop Button */}
        <button
          onClick={() => setToggle((prev) => !prev)}
          className="hidden md:block bg-black px-5 py-2 rounded-lg hover:bg-gray-900 active:scale-[0.95] transition"
        >
          {toggle ? "SHOW USER POST" : "ADD USER POST"}
        </button>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-2xl cursor-pointer"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-4 text-gray-300">
          <p className="hover:text-white cursor-pointer">Home</p>
          <p className="hover:text-white cursor-pointer">About</p>
          <p className="hover:text-white cursor-pointer">Services</p>

          <button
            onClick={() => {
              setToggle((prev) => !prev);
              setMenuOpen(false);
            }}
            className="bg-black px-5 py-2 rounded-lg hover:bg-gray-900"
          >
            {toggle ? "SHOW USER POST" : "ADD USER POST"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
