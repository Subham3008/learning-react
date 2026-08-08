import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const List = ({ list, handleDelete, handleEdit }) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Todo Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-start justify-between hover:border-zinc-700 transition-all duration-300">
        {/* Left Content */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-white">{list?.name}</h3>

          <p className="text-sm text-zinc-400 max-w-xl">{list?.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(list)}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-blue-600 transition-all duration-300"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => handleDelete(list._id)}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-red-600 transition-all duration-300"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
