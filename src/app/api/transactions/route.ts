import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Transaction from '@/models/Transaction';

export async function GET() {
  await connectToDatabase();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const body = await request.json();
  await connectToDatabase();
  const newTransaction = await Transaction.create(body);
  return NextResponse.json(newTransaction, { status: 201 });
}
