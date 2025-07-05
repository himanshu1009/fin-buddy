export function groupByCategory(transactions: { amount: number; category: string }[]) {
  const groups: { [key: string]: number } = {};

  transactions.forEach((t) => {
    groups[t.category] = (groups[t.category] || 0) + t.amount;
  });

  return Object.entries(groups).map(([category, total]) => ({ category, total }));
}
