import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/styles/App.css";
import EntryForm from "./components/EntryForm/EntryForm.jsx";
import Filters from "./components/Filters/Filters.jsx";
import EntryTable from "./components/EntryTable/EntryTable.jsx";
import Balance from "./components/Balance/Balance.jsx";

function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("entries");
    return saved ? JSON.parse(saved) : [];
  });

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("income");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const categories = ["Продукти", "Розваги", "Транспорт", "Здоров'я", "Інше"];

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const filtered = entries.filter(
    (e) => filterType === "all" || e.type === filterType
  );

  const sorted = [...filtered].sort((a, b) =>
    sortBy === "date"
      ? new Date(a.date) - new Date(b.date)
      : a.amount - b.amount
  );

  const handleEdit = (id) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    setDate(entry.date);
    setCategory(entry.category);
    setAmount(entry.amount.toString());
    setType(entry.type);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей запис?")) {
      setEntries(entries.filter((e) => e.id !== id));
      toast.success("Транзакцію видалено успішно!");
    }
  };

  const handleAddEntry = () => {
    if (!date || !category || !amount) {
      toast.error("Заповніть усі поля!");
      return;
    }

    const newEntry = {
      id: editingId || Date.now(),
      date,
      category,
      amount: parseFloat(amount),
      type,
    };

    const updated = isEditing
      ? entries.map((e) => (e.id === editingId ? newEntry : e))
      : [...entries, newEntry];

    setEntries(updated);
    setAmount("");
    setCategory("");
    setDate("");
    setIsEditing(false);
    setEditingId(null);

    toast.success(
      isEditing ? "Транзакцію оновлено!" : "Транзакцію додано успішно!"
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl text-center mt-4 mb-6">Фінансовий трекер</h1>
      <ToastContainer />

      <EntryForm
        {...{
          amount,
          setAmount,
          category,
          setCategory,
          date,
          setDate,
          type,
          setType,
          categories,
          isEditing,
          handleAddEntry,
        }}
      />

      <Balance entries={entries} />

      <Filters {...{ filterType, setFilterType, sortBy, setSortBy }} />

      <EntryTable
        entries={sorted}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
