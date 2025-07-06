"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Loader2Icon } from "lucide-react";
import { BudgetType } from "@/types";

const categories = ["Food", "Transport", "Shopping", "Bills", "Health", "Entertainment", "Other"];

export default function BudgetBox({
  budgets,
  onRefresh,
}: {
  budgets: BudgetType[];
  onRefresh: () => void;
}) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [amount, setAmount] = useState<number>(0);
  const [month, setMonth] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const startAdd = () => {
    setEditingId(null);
    setAmount(0);
    setMonth("");
    setCategory("");
    setShowForm(true);
    setIsSubmitting(false);
  };

  const startEdit = (b: BudgetType) => {
    setEditingId(b._id);
    setAmount(b.amount);
    setMonth(b.month);
    setCategory(b.category);
    setShowForm(true);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || !month || !category) return alert("Fill all fields");
    setIsSubmitting(true);
    if (editingId) {
      await fetch(`/api/budgets/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, month, category }),
      });
    } else {
      await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, month, category }),
      });
    }

    setShowForm(false);
    onRefresh();
  };

  const deleteBudget = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/budgets/${id}`, { method: "DELETE" });
    onRefresh();
  };

  return (
    <div className=" p-4 space-y-4 relative">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold mb-2">Budgets</h2>
      {!showForm && (
        <Button size={'icon'} className=" rounded-lg w-fit p-4 shadow" onClick={startAdd}>
          <Plus className="w-5 h-5" />
          Add
        </Button>
      )}</div>
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-2 mt-4 border-t pt-4">
          <h1 className="text-lg font-semibold mb-2">{editingId ? "Edit Budget" : "Add Budget"}</h1>
          <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded w-full">
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
          <div className="flex justify-end space-x-2">
            {isSubmitting ? (<Button size="sm" disabled>
              <Loader2Icon className="animate-spin" />
              Please wait
            </Button>) : (<Button type="submit" >{editingId ? "Update" : "Add"}</Button>)}
            <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      )}
      <div className="space-y-3 overflow-y-auto no-scrollbar">
        {budgets.length === 0 && <div className="text-gray-500">No budgets set.</div>}
        {budgets.map((b) => (
          <div key={b._id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">₹{b.amount}</div>
              <div className="text-gray-600">{b.category}</div>
              <div className="text-xs text-gray-400">{b.month}</div>
            </div>
            <div className="flex space-x-2">
              <Button size="icon" variant="outline" onClick={() => startEdit(b)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="destructive" onClick={() => deleteBudget(b._id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      

      
    </div>
  );
}
