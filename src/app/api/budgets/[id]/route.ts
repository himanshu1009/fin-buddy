import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Budget from '@/models/Budget';

interface Context {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    
    await connectToDatabase();
    const updated = await Budget.findByIdAndUpdate(id, body, { new: true });
    
    if (!updated) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating Budget:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    
    await connectToDatabase();
    const deleted = await Budget.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }
    
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting Budget:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}