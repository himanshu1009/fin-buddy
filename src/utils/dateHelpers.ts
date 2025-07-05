export function groupTransactionsByMonth(transactions: { amount: number; date: string }[]) {
  const groups: { [key: string]: number } = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

    groups[month] = (groups[month] || 0) + t.amount;
  });

  return Object.entries(groups).map(([month, total]) => ({ month, total }));
}
