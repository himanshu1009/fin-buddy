import { Card, CardContent } from "@/components/ui/card";

type Transaction = {
  _id: string;
  amount: number;
  category: string;
  date: string | Date;
};

export default function SummaryCards({ transactions }: { transactions: Transaction[] }) {
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

  const recent = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-xl font-bold">₹{totalExpenses.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="text-xl font-bold">{transactions.length}</p>
        </CardContent>
      </Card>

      <Card className="sm:col-span-1">
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Recent Transactions</p>
          <ul className="text-sm mt-2 space-y-1">
            {recent.map((t,index) => { return index<2&&(
              <li key={t._id}>
                ₹{t.amount} • {t.category} • {new Date(t.date).toLocaleDateString()}
              </li>
            )})}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
