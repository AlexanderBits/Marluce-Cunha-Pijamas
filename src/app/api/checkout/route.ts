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
  buyer: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    cpf: z.string().optional(),
  }),
  address: z.object({
    cep: z.string().min(8),
    logradouro: z.string().min(1),
    numero: z.string().min(1),
    complemento: z.string().optional(),
    bairro: z.string().min(1),
    cidade: z.string().min(1),
    estado: z.string().min(2).max(2),
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = checkoutSchema.safeParse(body);
    if (!validation.success) {
      console.error('Validation Error:', validation.error.format());
      return NextResponse.json({ error: 'Dados de checkout inválidos', details: validation.error.format() }, { status: 400 });
    }

    const { items, buyer, address } = validation.data;
    const totalAmount = items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);

    // 1. Create purchase in DB
    const purchase = await createPurchase({
      buyer_email: buyer.email,
      status: 'pending',
      total_amount: totalAmount,
      buyer_name: buyer.name,
      buyer_phone: buyer.phone,
      buyer_cpf: buyer.cpf,
      ...address,
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
      buyerEmail: buyer.email,
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
  } catch (error: any) {
    console.error('Erro no Checkout:', error);
    return NextResponse.json({ 
      error: 'Falha ao processar o checkout', 
      message: error.message 
    }, { status: 500 });
  }
}
