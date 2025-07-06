"use client";

import { useState, useEffect } from "react";
// import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyExpensesChart from "@/components/MonthlyExpensesChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCards from "@/components/SummaryCards";
import BudgetForm from "@/components/BudgetList";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";
import { groupTransactionsByMonth } from "@/utils/dateHelpers";
import { groupByCategory } from "@/utils/categoryHelpers";
import { TransactionType, BudgetType } from "@/types";
import { Loader2 } from "lucide-react"; 

export default function Home() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tRes = await fetch("/api/transactions");
    const bRes = await fetch("/api/budgets");
    setTransactions(await tRes.json());
    setBudgets(await bRes.json());
    setIsLoading(false);
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
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          </div>
        ) :
        <>
        <SummaryCards transactions={transactions} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* <div className="bg-white p-4 rounded-xl shadow space-y-4">
              <h2 className="text-lg font-semibold">Add Transaction</h2>
              <TransactionForm onAdd={fetchData} />
            </div> */}

            <div className="bg-white p-4 rounded-xl shadow space-y-4">
             
              <TransactionList transactions={transactions} onRefresh={fetchData} />
              
            </div>
             <div className="bg-white p-4 rounded-xl shadow space-y-4">
              <BudgetForm budgets={budgets} onRefresh={fetchData} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow">
              
              <MonthlyExpensesChart data={groupTransactionsByMonth(transactions)} />
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              
              <CategoryPieChart data={groupByCategory(transactions)} />
            </div>

           

            <div className="bg-white p-4 rounded-xl shadow">
              <BudgetComparisonChart budgets={currentBudgets} actuals={actuals} />
            </div>
          </div>
        </div>
        </>
        }
      </div>
      
    </div>
  );
}
