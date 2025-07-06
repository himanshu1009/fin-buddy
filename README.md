# 💸 Personal Finance Visualizer

A responsive web app to track personal finances, manage budgets, and visualize expenses with modern charts.

---

## 🚀 Tech Stack

- **Next.js 15 (App Router)**
- **React + Shadcn/ui**
- **MongoDB + Mongoose**
- **Recharts** for charts
- **Tailwind CSS** for responsive design

---

## ✨ Features

✅ Add, edit, delete transactions  
✅ Predefined categories with Pie Chart  
✅ Monthly expenses bar chart  
✅ Dashboard summary: total expenses, category breakdown, recent transactions  
✅ Set monthly budgets & compare with actual spending  
✅ Simple, clean, responsive UI  

---

## 📂 Project Structure

app/

  ├─ page.tsx # Main dashboard

  └─ api/

  ├─ transactions/route.ts

  └─ budgets/route.ts


components/

  ├─ TransactionForm.tsx

  ├─ TransactionList.tsx

  ├─ MonthlyExpensesChart.tsx

  ├─ CategoryPieChart.tsx

  ├─ SummaryCards.tsx

  ├─ BudgetForm.tsx

  └─ BudgetComparisonChart.tsx


lib/db.ts # MongoDB connection

models/Transaction.ts # Transaction schema

models/Budget.ts # Budget schema

utils/ # Helper functions



---

## 🛠️ Setup & Run

1. Clone the repository
```bash
git clone (https://github.com/himanshu1009/fin-buddy)
cd fin-buddy
```
Install dependencies

```bash
npm install
```
Configure environment
Create .env.local:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```
Run development server

```bash
npm run dev
```
App runs at http://localhost:3000

🎨 UI Notes
Clean, modern Shadcn UI

Fully responsive grid layout

Dashboard separates forms, charts, summaries

Interactive Recharts graphs

Basic validation and error states

⚠️ Evaluation Notes
No authentication implemented, as per task requirements

Multiple stage submissions supported

