import React, { useState } from "react";
import { useTable } from "react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("income");

  const columns = React.useMemo(
    () => [
      { Header: "Дата", accessor: "date" },
      { Header: "Категория", accessor: "category" },
      { Header: "Сумма", accessor: "amount" },
      { Header: "Тип", accessor: "type" },
    ],
    []
  );

  const data = React.useMemo(() => entries, [entries]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleAddEntry = () => {
    if (!date || !category || !amount) {
      toast.error("Заповніть всі поля!");
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

  const handleClearEntry = () => {
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl text-center mb-4">Finance Tracker</h1>
      <ToastContainer />

      <div className="max-w-80 flex flex-col gap-3">
        <input
          type="date"
          className="border p-2 w-full "
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          className="border p-2 w-full "
          placeholder="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div className="flex w-full">
          <button
            className={`p-2 w-1/2  border ${
              type === "income"
                ? "bg-gray-700 text-zinc-200 text-ivory border-none"
                : "bg-gray-300  text-black border-none"
            }`}
            onClick={() => setType("income")}
          >
            Доход
          </button>
          <button
            className={`p-2 w-1/2 border ${
              type === "expense"
                ? "bg-gray-700 text-indigo-200 border-none  text-zinc-200"
                : "bg-gray-300 text-black border-none "
            }`}
            onClick={() => setType("expense")}
          >
            Расход
          </button>
        </div>

        {/* <div className="flex ">
          <button
            className={` p-2 flex-1 border ${
              type === "income" ? "bg-gray-700 " : "bg-gray-300 "
            }`}
            onClick={() => setType("income")}
          >
            Доход
          </button>
          <button
            className={` p-2 flex-1 border ${
              type === "expense" ? "bg-gray-700   " : "bg-gray-300 "
            }`}
            onClick={() => setType("витрати")}
          >
            Расход
          </button>
        </div> */}

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="border p-2 w-full  appearance-none"
          placeholder="Сумма"
          value={amount}
          onChange={(e) => {
            if (e.target.value.match(/^\d*$/)) {
              setAmount(e.target.value);
            }
          }}
        />

        <div className="button-wrapper ">
          <button
            onClick={handleAddEntry}
            className="w-full bg-gray-700 text-zinc-900 p-2  border-none"
          >
            Добавить
          </button>

          <button
            onClick={handleClearEntry}
            className="w-full bg-gray-400 text-zinc-800 p-2  border-none "
          >
            Очистить
          </button>
        </div>
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
