"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TransactionType } from "@/types";
import { Pencil, Trash2, Save, X } from "lucide-react";

export default function TransactionList({
  transactions,
  onRefresh,
}: {
  transactions: TransactionType[];
  onRefresh: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState<number>(0);
  const [editDate, setEditDate] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editCategory, setEditCategory] = useState<string>("");

  const categories = ["Food", "Transport", "Shopping", "Bills", "Health", "Entertainment", "Other"];

  const startEdit = (t: TransactionType) => {
    setEditingId(t._id);
    setEditAmount(t.amount);
    setEditDate(t.date.slice(0, 10));
    setEditDescription(t.description);
    setEditCategory(t.category);
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async () => {
    await fetch(`/api/transactions/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: editAmount,
        date: editDate,
        description: editDescription,
        category: editCategory,
      }),
    });
    setEditingId(null);
    onRefresh();
  };

  const deleteTransaction = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    onRefresh();
  };

  return (
    <div className="space-y-3 mt-4">
      {transactions.map((t) => (
        <div key={t._id} className="border p-4 rounded-xl shadow-sm hover:shadow transition space-y-2 bg-white">
          {editingId === t._id ? (
            <div className="space-y-3">
              <Input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(parseFloat(e.target.value))}
                placeholder="Amount"
              />
              <Input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
              <Input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
              />
              <select
                className="border p-2 rounded w-full"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <Button size="sm" onClick={saveEdit} className="flex items-center gap-1">
                  <Save size={14} />
                  Save
                </Button>
                <Button variant="destructive" size="sm" onClick={cancelEdit} className="flex items-center gap-1">
                  <X size={14} />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-center">
              <div className="font-semibold text-lg">₹{t.amount}</div>
              <div className="text-gray-700">{new Date(t.date).toLocaleDateString()}</div>
              <div className="text-gray-600 truncate">{t.description}</div>
              <div className="text-sm text-blue-500">{t.category}</div>
            </div>
          )}

          {editingId !== t._id && (
            <div className="flex gap-2 mt-3">
              <Button size="icon" variant="outline" onClick={() => startEdit(t)}>
                <Pencil size={16} />
              </Button>
              <Button size="icon" variant="destructive" onClick={() => deleteTransaction(t._id)}>
                <Trash2 size={16} />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
