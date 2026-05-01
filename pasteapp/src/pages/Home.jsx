import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaste, deletePaste, updatePaste } from "../redux/pasteSlice";

const Home = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  function handleSubmit() {
    if (!text.trim()) return;

    if (editId) {
      dispatch(updatePaste({ id: editId, content: text }));
      setEditId(null);
    } else {
      dispatch(addPaste({
        id: Date.now(),
        content: text,
        createdAt: new Date().toLocaleString()
      }));
    }

    setText("");
  }

  function handleEdit(paste) {
    setText(paste.content);
    setEditId(paste.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCopy(text) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* ✍️ Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border p-3 rounded shadow"
        placeholder="Write your paste..."
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-3 rounded"
      >
        {editId ? "Update Paste" : "Add Paste"}
      </button>

      {/* 📋 List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Pastes</h2>

        {pastes.length === 0 && (
          <p className="text-gray-500">No pastes yet</p>
        )}

        {pastes.map((p) => (
          <div key={p.id} className="border p-4 mb-3 rounded shadow">
            
            <p className="mb-2">{p.content}</p>

            <p className="text-sm text-gray-400">
              {p.createdAt}
            </p>

            <div className="flex gap-2 mt-2">

              <button
                onClick={() => handleCopy(p.content)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Copy
              </button>

              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => dispatch(deletePaste(p.id))}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;