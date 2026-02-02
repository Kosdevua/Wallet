import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/styles/App.css";
import EntryForm from "./components/EntryForm/EntryForm.jsx";
import Filters from "./components/Filters/Filters.jsx";
import EntryTable from "./components/EntryTable/EntryTable.jsx";
import Balance from "./components/Balance/Balance.jsx";
import DatePickerModal from "./components/ModalDate/ModalDate.jsx";
import { confirmToast } from "../src/utils/confirmToast.jsx";

function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("entries");
    return saved ? JSON.parse(saved) : [];
  });

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
    setIsEditing(true);
    setEditingId(id);
  };

  // const handleDelete = (id) => {
  //   if (window.confirm("Ви впевнені, що хочете видалити цей запис?")) {
  //     setEntries(entries.filter((e) => e.id !== id));
  //     toast.success("Транзакцію видалено успішно!");
  //   }
  // };

  const handleDelete = (id) => {
    confirmToast({
      message: "Ви впевнені, що хочете видалити цей запис?",
      confirmText: "Видалити",
      onConfirm: () => {
        setEntries((prev) => prev.filter((e) => e.id !== id));
        toast.success("Транзакцію видалено успішно!");
      },
    });
  };

  const handleAddEntry = (values) => {
    const { date, category, amount, type, description } = values;

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
      description,
    };

    const updated = isEditing
      ? entries.map((e) => (e.id === editingId ? newEntry : e))
      : [...entries, newEntry];

    setEntries(updated);
    setIsEditing(false);
    setEditingId(null);

    toast.success(
      isEditing ? "Транзакцію оновлено!" : "Транзакцію додано успішно!"
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl text-center mt-4 mb-6">Wallet</h1>
      <ToastContainer />
      <DatePickerModal />
      <EntryForm
        isEditing={isEditing}
        categories={categories}
        initialValues={{
          date: "",
          category: "",
          type: "expense",
          amount: "",
          description: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleAddEntry(values);
          ``;
          resetForm();
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
