💸 Personal Finance Visualizer
A responsive web application for tracking personal finances, managing budgets, and visualizing expenses with modern charts.

Stack:
✅ Next.js 15 (App Router)
✅ React with Shadcn/ui for modern UI components
✅ MongoDB (via Mongoose) for persistent storage
✅ Recharts for interactive charts
✅ Tailwind CSS for responsive design

🚀 Features
✅ Stage 1: Transaction Tracking
✔️ Add, edit, delete transactions (amount, date, description, category)
✔️ View all transactions in a clean, responsive list
✔️ Monthly expenses bar chart

✅ Stage 2: Categories & Dashboard
✔️ Predefined categories for transactions
✔️ Category-wise pie chart for expense breakdown
✔️ Dashboard summary: Total expenses, category insights, latest transactions

✅ Stage 3: Budgeting & Insights
✔️ Set monthly budgets per category
✔️ Budget vs Actual comparison chart
✔️ Simple spending insights

📂 Project Structure
bash
Copy
Edit
├── app/
│   ├── page.tsx               # Main dashboard layout
│   ├── api/
│   │   ├── transactions/route.ts    # Transaction API (CRUD)
│   │   ├── budgets/route.ts         # Budget API
├── components/
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   ├── MonthlyExpensesChart.tsx
│   ├── CategoryPieChart.tsx
│   ├── SummaryCards.tsx
│   ├── BudgetForm.tsx
│   ├── BudgetComparisonChart.tsx
├── lib/db.ts                   # MongoDB connection
├── models/Transaction.ts       # Transaction schema
├── models/Budget.ts            # Budget schema
├── utils/
│   ├── dateHelpers.ts
│   ├── categoryHelpers.ts
├── styles/globals.css
└── .env.local                  # MongoDB credentials
🛠️ Setup & Run
Clone the Repository

bash
Copy
Edit
git clone [your-repo-url]
cd [project-folder]
Install Dependencies

bash
Copy
Edit
npm install
Configure Environment
Create .env.local with:

php-template
Copy
Edit
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
Run Development Server

bash
Copy
Edit
npm run dev
App available at http://localhost:3000

🎨 UI/UX Notes
Clean, modern Shadcn UI components

Fully responsive grid layout

Dashboard separates forms, charts, and summaries

Interactive charts with Recharts

Error handling and basic form validation included

❗ Evaluation Note
No authentication implemented — As per submission rules.
Multiple stage submissions allowed.

🌐 Live Demo
[Your Deployed URL Here]

📊 Example Screenshots
(Add screenshots of dashboard, charts, transaction form, etc.)

✔️ Ready for Submission
Includes:
✅ GitHub Repo
✅ Live URL
✅ Clean, professional README

✨ Optional Improvements
Dark mode toggle

Improved spending insights

More chart types

