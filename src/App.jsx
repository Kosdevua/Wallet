import React, { useState } from "react";
import { useTable } from "react-table";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

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

  const handleAddEntry = () => {
    setEntries([...entries, { date, category, income, expense }]);
    setIncome("");
    setExpense("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-4">Finance Tracker</h1>

      <div className="mb-4">
        <input
          type="date"
          className="border p-2 mr-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Доход"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Расход"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
        <button onClick={handleAddEntry} className="bg-blue-500 text-white p-2">
          Добавить
        </button>
      </div>

      <table
        {...getTableProps()}
        className="min-w-full table-auto border-collapse border border-gray-300"
      >
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {" "}
              {/* Добавлен ключ для <tr> */}
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id} // Ключ для ячейки
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
