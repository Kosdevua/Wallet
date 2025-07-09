function Filters({ filterType, setFilterType, sortBy, setSortBy }) {
  return (
    <div className="flex gap-2 my-4">
      <select
        className="p-2 border rounded-md"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">Тип витрат</option>
        <option value="expense">Витрати</option>
        <option value="income">Дохід</option>
      </select>

      <select
        className="p-2 border rounded-md"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="date">Сортувати за датою</option>
        <option value="amount">Сортувати за сумою</option>
      </select>
    </div>
  );
}

export default Filters;
