import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = ["Food", "Transport", "Shopping", "Bills", "Health", "Entertainment", "Other"];

export default function BudgetForm({ onAdd }: { onAdd: () => void }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [month, setMonth] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || amount <= 0 || !month) return alert("Fill all fields");

    await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, amount, month }),
    });

    setCategory("");
    setAmount(0);
    setMonth("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded w-full">
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <Input type="number" placeholder="Budget Amount" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
      <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      <Button type="submit">Set Budget</Button>
    </form>
  );
}
