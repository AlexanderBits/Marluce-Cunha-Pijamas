import { NextResponse } from 'next/server';
import { createPurchase, updatePurchase, createPurchaseItems } from '@/lib/db/purchases';
import { createPreference } from '@/lib/mercadopago';
import { z } from 'zod';

const checkoutSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    title: z.string().min(1),
    quantity: z.number().positive(),
    unit_price: z.number().positive(),
  })).min(1),
  email: z.string().email().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = checkoutSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Dados de checkout inválidos' }, { status: 400 });
    }

    const { items, email } = validation.data;
    const totalAmount = items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);

    // 1. Create purchase in DB
    const purchase = await createPurchase({
      user_email: email || 'pendente@checkout',
      status: 'pending',
      total_amount: totalAmount,
    });

    // 2. Create purchase items in DB
    const itemsForDb = items.map(i => ({
      id: i.id,
      title: i.title,
      price: i.unit_price,
      quantity: i.quantity
    }));
    await createPurchaseItems(purchase.id, itemsForDb);

    // 3. Create Mercado Pago preference
    const mpPreference = await createPreference({
      items, 
      purchaseId: purchase.id, 
      buyerEmail: email,
    });

    // 4. Update purchase with preference ID
    await updatePurchase(purchase.id, {
      mercadopago_preference_id: mpPreference.id,
    });

    return NextResponse.json({
      preferenceId: mpPreference.id,
      initPoint: mpPreference.init_point,
      purchaseId: purchase.id,
    });
  } catch (error) {
    console.error('Erro no Checkout:', error);
    return NextResponse.json({ error: 'Falha ao processar o checkout' }, { status: 500 });
  }
}
