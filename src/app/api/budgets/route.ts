import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Budget from "@/models/Budget";

export async function GET() {
  await connectToDatabase();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

export async function POST(request: Request) {
  const body = await request.json();
  await connectToDatabase();
  const budget = await Budget.create(body);
  return NextResponse.json(budget);
}
