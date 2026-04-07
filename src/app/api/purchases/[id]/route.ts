import { NextResponse } from 'next/server';
import { getPurchaseStatus } from '@/lib/db/purchases';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await getPurchaseStatus(id);

  if (!data) return NextResponse.json({ error: 'Compra não encontrada' }, { status: 404 });
  return NextResponse.json({ id: data.id, status: data.status });
}
