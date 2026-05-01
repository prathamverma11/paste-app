import { useSelector, useDispatch } from "react-redux";
import { deletePaste } from "../redux/pasteSlice";
import { useState } from "react";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const filtered = pastes.filter((p) =>
    p.content.toLowerCase().includes(search.toLowerCase())
  );

  function handleCopy(text) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="🔍 Search your pastes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-5 w-full rounded shadow-sm"
      />

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center">No pastes found</p>
      )}

      {filtered.map((p) => (
        <div
          key={p.id}
          className="border p-4 mb-4 rounded-lg shadow hover:shadow-md transition"
        >
          {/* ✅ FIX: object nahi, content render */}
          <p className="text-lg mb-2">{p.content}</p>

          {/* 📅 Timestamp */}
          {p.createdAt && (
            <p className="text-sm text-gray-400">{p.createdAt}</p>
          )}

          <div className="flex gap-3 mt-3">

            <button
              onClick={() => handleCopy(p.content)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Copy
            </button>

            <button
              onClick={() => dispatch(deletePaste(p.id))}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Paste;