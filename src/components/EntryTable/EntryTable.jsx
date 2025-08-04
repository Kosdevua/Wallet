import { useMemo } from "react";
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { useTable } from "react-table";

function EntryTable({ entries, handleEdit, handleDelete }) {
  const columns = useMemo(
    () => [
      { Header: "№", accessor: (_, index) => index + 1 },
      { Header: "Дата", accessor: "date" },
      { Header: "Категорія", accessor: "category" },
      {
        Header: "Сума",
        accessor: "amount",
        Cell: ({ value, row }) => (
          <div className="text-right">
            {row.original.type === "income" ? "+" : "-"}
            {/* {row.original.type} */}
            {value}
          </div>
        ),
      },
      { Header: "Тип", accessor: "type" },
      {
        Header: "Дії",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="text-center flex justify-evenly">
            <button
              className="c.button dark:md:hover:bg-yellow-400  bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              onClick={() => handleEdit(row.original.id)}
            >
              <CiEdit />
            </button>
            <button
              className=" dark:md:hover:bg-red-400 transition-colors duration-300 bg-red-500 text-white px-2 py-1 rounded"
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

  const data = useMemo(() => entries, [entries]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
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
  );
}

export default EntryTable;
