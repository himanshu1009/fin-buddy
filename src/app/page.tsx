"use client";

import { useState, useEffect } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyExpensesChart from "@/components/MonthlyExpensesChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCards from "@/components/SummaryCards";
import BudgetForm from "@/components/BudgetForm";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";
import { groupTransactionsByMonth } from "@/utils/dateHelpers";
import { groupByCategory } from "@/utils/categoryHelpers";
import { TransactionType, BudgetType } from "@/types";

export default function Home() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [budgets, setBudgets] = useState<BudgetType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tRes = await fetch("/api/transactions");
    const bRes = await fetch("/api/budgets");
    setTransactions(await tRes.json());
    setBudgets(await bRes.json());
  };

  const currentMonth = new Date().toISOString().slice(0, 7);
  const filteredTransactions = transactions.filter(t => t.date.startsWith(currentMonth));
  const actuals = groupByCategory(filteredTransactions);
  const currentBudgets = budgets.filter(b => b.month === currentMonth);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">💰 Personal Finance Dashboard</h1>
        </header>

        <SummaryCards transactions={transactions} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow space-y-4">
              <h2 className="text-lg font-semibold">Add Transaction</h2>
              <TransactionForm onAdd={fetchData} />
            </div>

            <div className="bg-white p-4 rounded-xl shadow space-y-4">
             
              <TransactionList transactions={transactions} onRefresh={fetchData} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow">
              
              <MonthlyExpensesChart data={groupTransactionsByMonth(transactions)} />
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              
              <CategoryPieChart data={groupByCategory(transactions)} />
            </div>

            <div className="bg-white p-4 rounded-xl shadow space-y-4">
              <h2 className="text-lg font-semibold">Set Budget</h2>
              <BudgetForm onAdd={fetchData} />
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <BudgetComparisonChart budgets={currentBudgets} actuals={actuals} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
