"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const categories = ["Food", "Transport", "Shopping", "Bills", "Health", "Entertainment", "Other"];

export default function TransactionForm({ onAdd }: { onAdd: () => void }) {
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || !date || !description || !category) {
      alert("Please fill all fields");
      return;
    }

    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, date, description, category }),
    });

    setAmount(0);
    setDate("");
    setDescription("");
    setCategory("");
    onAdd();
  };

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="mb-1 block">Amount</Label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <Label className="mb-1 block">Date</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div>
          <Label className="mb-1 block">Description</Label>
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Label className="mb-1 block">Category</Label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" className="w-full">
          Add Transaction
        </Button>
      </form>
    </Card>
  );
}
