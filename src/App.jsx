import React, { useState } from "react";
import { useTable } from "react-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  // const [toast, setToast] = useState("");

  const columns = React.useMemo(
    () => [
      {
        Header: "Дата",
        accessor: "date",
      },
      {
        Header: "Категория",
        accessor: "category",
      },
      {
        Header: "Доход",
        accessor: "income",
      },
      {
        Header: "Расход",
        accessor: "expense",
      },
    ],
    []
  );

  const data = React.useMemo(() => entries, [entries]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Функція додавання запису з валідацією
  const handleAddEntry = () => {
    if (!date || !category || (!income && !expense)) {
      toast.error(
        "Заповніть всі поля! Доход або расход повинен мати значення."
      );
      return;
    }

    setEntries([...entries, { date, category, income, expense }]);
    toast.success("Запис успішно додано!");
    handleClearEntry();
  };

  // Функція очищення полів вводу
  const handleClearEntry = () => {
    // if (date || category || income || expense) {
    //   toast.info("Поля очіщенні");
    // }

    setIncome("");
    setExpense("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="container mx-auto p-4">
      {/* Контейнер для повідомлень */}
      <ToastContainer bg="red" position="top-left" autoClose={3000} />

      <h1 className="text-3xl text-center mb-4">Finance Tracker</h1>

      <ul className="max-w-60 mb-4 flex flex-col gap-0.5 space-y-2">
        <li>
          <input
            type="date"
            className="border p-2 w-full outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </li>
        <li>
          <input
            type="text"
            className="border p-2 w-full outline-none"
            placeholder="Категория"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </li>
        <li>
          <input
            type="number"
            className="border p-2 w-full outline-none"
            placeholder="Доход"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </li>
        <li>
          <input
            type="number"
            className="border p-2 w-full outline-none"
            placeholder="Расход"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
          />
        </li>
        <li>
          <button
            onClick={handleAddEntry}
            className="bg-zinc-700 text-white px-6 py-2 w-full rounded"
          >
            Добавить
          </button>
        </li>
        <li>
          <button
            onClick={handleClearEntry}
            className="bg-rose-700 text-white px-6 py-2 w-full rounded"
          >
            Очистить
          </button>
        </li>
      </ul>

      <table
        {...getTableProps()}
        className="min-w-full table-auto border-collapse border border-gray-300"
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
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="border p-2"
                    key={cell.column.id}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
