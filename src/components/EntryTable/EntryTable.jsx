import { useMemo } from "react";
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { useTable } from "react-table";

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatAmount = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "0";
  return num.toLocaleString("uk-UA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

function EntryTable({ entries, handleEdit, handleDelete }) {
  const columns = useMemo(
    () => [
      {
        Header: "№",
        accessor: (_, i) => i + 1,
        id: "rowNum",
      },
      {
        Header: "Дата",
        accessor: "date",
        Cell: ({ value }) => formatDate(value),
      },
      { Header: "Категорія", accessor: "category" },
      {
        Header: "Сума",
        accessor: "amount",
        Cell: ({ value, row }) => (
          <div className="text-right">
            {row.original.type === "income" ? "+" : "-"}
            {formatAmount(value)} грн
          </div>
        ),
      },
      {
        Header: "Тип",
        accessor: "type",
        Cell: ({ value }) => (value === "income" ? "Дохід" : "Витрати"),
      },
      {
        Header: "Опис",
        accessor: "description",
        Cell: ({ value }) => (
          <div className="max-w-[120px] truncate" title={value || ""}>
            {value || "—"}
          </div>
        ),
      },
      {
        Header: "Створено",
        accessor: "createdAt",
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: "Дії",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="text-center flex justify-evenly">
            <button
              type="button"
              aria-label="Редагувати"
              className="c.button dark:md:hover:bg-yellow-400 bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              onClick={() => handleEdit(row.original.id)}
            >
              <CiEdit />
            </button>
            <button
              type="button"
              aria-label="Видалити"
              className="dark:md:hover:bg-red-400 transition-colors duration-300 bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(row.original.id)}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: entries });

  if (entries.length === 0) {
    return (
      <div className="mt-4 p-8 text-center text-gray-500 border border-gray-300 rounded">
        Немає записів. Додайте першу транзакцію.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table
        {...getTableProps()}
        className="min-w-full table-auto border-collapse border border-gray-300"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.original.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="border p-2 text-right"
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

export default EntryTable;
