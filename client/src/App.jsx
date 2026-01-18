import { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  });

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!input.trim()) return;

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    }

    setInput("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-700 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-7xl shadow-6xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
          My Todo List
        </h1>

        <div className="flex gap-2 mb-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="✍️ Add a new task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />

          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-lg text-white font-medium transition ${editId ? "bg-gray-800" : "bg-black"
              }`}
          >
            {editId ? "🔁 Update" : "➕ Add"}
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl shadow-sm"
            >
              <span
                onClick={() => toggleComplete(todo.id)}
                className={`flex-1 cursor-pointer text-gray-800 ${todo.completed ? "line-through text-gray-400" : ""
                  }`}
              >
                {todo.completed ? "✅ " : "⬜ "}
                {todo.text}
              </span>

              <div className="flex gap-3 ml-3">
                <button
                  onClick={() => handleEdit(todo)}
                  className="text-gray-700 hover:underline text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            🌙 No tasks yet. Add your first one ✨
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
