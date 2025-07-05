import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export interface BudgetType {
  _id: string;
  category: string;
  amount: number;
  month: string; // YYYY-MM format
}


export default function BudgetComparisonChart({ budgets, actuals }: { budgets: BudgetType[]; actuals: { category: string; total: number }[] }) {
  const merged = budgets.map((b) => {
    const actual = actuals.find((a) => a.category === b.category)?.total || 0;
    return { category: b.category, Budget: b.amount, Actual: actual };
  });

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={merged}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#8884d8" />
          <Bar dataKey="Actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
