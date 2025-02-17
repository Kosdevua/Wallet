import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem("entries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("income");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const filteredEntries = entries.filter(
    (entry) => filterType === "all" || entry.type === filterType
  );

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === "amount") {
      return parseFloat(a.amount) - parseFloat(b.amount);
    }
    return 0;
  });

  const columns = React.useMemo(
    () => [
      { Header: "Дата", accessor: "date" },
      { Header: "Категория", accessor: "category" },
      { Header: "Сумма", accessor: "amount" },
      { Header: "Тип", accessor: "type" },
    ],
    []
  );

  const data = React.useMemo(() => sortedEntries, [sortedEntries]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleAddEntry = () => {
    if (!date || !category || !amount) {
      toast.error("Заполните все поля!");
      return;
    }

    setEntries([
      ...entries,
      {
        date,
        category,
        amount: `${type === "income" ? "+" : "-"}${amount}`,
        type,
      },
    ]);
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl text-center mb-4">Finance Tracker</h1>
      <ToastContainer />

      <div className="flex flex-col gap-3">
        <input
          type="date"
          className="border p-2 w-full rounded-md"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          className="border p-2 w-full rounded-md"
          placeholder="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div className="flex w-full">
          <button
            className={`p-2 w-1/2 rounded-l border ${
              type === "income"
                ? "bg-gray-700 text-ivory"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => setType("income")}
          >
            Доход
          </button>
          <button
            className={`p-2 w-1/2 rounded-r border ${
              type === "expense"
                ? "bg-gray-700 text-ivory"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => setType("expense")}
          >
            Расход
          </button>
        </div>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="border p-2 w-full rounded-md appearance-none"
          placeholder="Сумма"
          value={amount}
          onChange={(e) => {
            if (e.target.value.match(/^\d*$/)) {
              setAmount(e.target.value);
            }
          }}
        />

        <button
          onClick={handleAddEntry}
          className="w-full bg-gray-700 text-ivory p-2 rounded-md border"
        >
          Добавить
        </button>
      </div>

      <div className="flex gap-2 my-4">
        <select
          className="p-2 border rounded-md"
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Всі</option>
          <option value="income">Доход</option>
          <option value="expense">Росход</option>
        </select>

        <select
          className="p-2 border rounded-md"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Сортувати по даті</option>
          <option value="amount">Сортувати за сумою</option>
        </select>
      </div>

      <table
        {...getTableProps()}
        className="min-w-full table-auto border-collapse border border-gray-300 mt-4"
      >
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="border p-2 bg-gray-200"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border p-2"
                      key={cell.column.id}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
