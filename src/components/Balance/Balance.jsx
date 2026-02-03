function Balance({ entries }) {
  // 1. Захист від відсутності або некоректних даних
  if (!Array.isArray(entries)) {
    return (
      <div className="text-center text-red-500 mt-4">
        Немає даних для розрахунку балансу
      </div>
    );
  }

  // 2. Оптимізація розрахунку через useMemo (якщо компонент у функціональному компоненті)
  const balance = entries.reduce((acc, entry) => {
    const amount = parseFloat(entry?.amount) || 0;
    return entry?.type === "income" ? acc + amount : acc - amount;
  }, 0);

  // 3. Форматування числа з роздільниками тисяч
  const formatBalance = (value) => {
    return new Intl.NumberFormat("uk-UA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // 4. Визначення класу в залежності від значення балансу
  const getBalanceClass = (value) => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  // 5. Додаткове текстове представлення
  const getBalanceStatus = (value) => {
    if (value > 0) return " (активний)";
    if (value < 0) return " (кредит)";
    return " (нульовий)";
  };

  return (
    <div
      className={`text-center text-2xl font-bold mt-4 p-4 rounded-lg border ${getBalanceClass(balance)}`}
    >
      <div className="flex flex-col items-center">
        <span className="text-lg font-normal text-gray-700">
          Поточний баланс:
        </span>
        <div className="flex items-center gap-2">
          <span className="text-3xl">{formatBalance(balance)}</span>
          <span className="text-lg">грн</span>
        </div>
        <span className="text-sm font-normal mt-1">
          {getBalanceStatus(balance)}
          {entries.length > 0 && ` • ${entries.length} операцій`}
        </span>
      </div>
    </div>
  );
}

export default Balance;
