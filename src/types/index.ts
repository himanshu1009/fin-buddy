export interface TransactionType {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

export interface BudgetType {
  _id: string;
  category: string;
  amount: number;
  month: string;
}