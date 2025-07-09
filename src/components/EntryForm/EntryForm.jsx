function EntryForm({
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
}) {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="date"
        className="border p-2 w-full rounded-md"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        className="border p-2 w-full rounded-md"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Оберіть категорію</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="flex w-full">
        <button
          className={`p-2 w-1/2 rounded-l border ${
            type === "expense"
              ? "bg-gray-700  text-zinc-300 border-0"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => setType("expense")}
        >
          Витрати
        </button>
        <button
          className={`p-2 w-1/2 rounded-r border ${
            type === "income"
              ? "bg-gray-700 text-zinc-300 border-0"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => setType("income")}
        >
          Дохід
        </button>
      </div>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="border p-2 w-full rounded-md appearance-none"
        placeholder="Сума"
        value={amount}
        onChange={(e) => {
          if (e.target.value.match(/^\d*$/)) {
            setAmount(e.target.value);
          }
        }}
      />

      <button
        onClick={handleAddEntry}
        className={`w-full ${
          isEditing ? "bg-green-500" : "bg-gray-700"
        } text-zinc-300 p-4 rounded-xs`}
      >
        {isEditing ? "Оновити" : "Додати"}
      </button>
    </div>
  );
}

export default EntryForm;
