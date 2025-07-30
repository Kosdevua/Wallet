function Balance({ entries }) {
  const balance = entries.reduce(
    (acc, entry) => acc + parseFloat(entry.amount),
    0
  );
  return (
    <div className="text-center text-2xl font-bold mt-4 border-1">
      Баланс: {balance} грн
    </div>
  );
}

export default Balance;
