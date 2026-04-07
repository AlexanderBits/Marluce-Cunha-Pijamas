import { NextResponse } from 'next/server';
import { getPurchaseStatus, updatePurchase } from '@/lib/db/purchases';
import { getPayment } from '@/lib/mercadopago';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check for both IPN and Webhook formats
    if (body.type !== 'payment' && body.action !== 'payment.created' && body.action !== 'payment.updated') {
      return NextResponse.json({ received: true });
    }

    const paymentId = body.data?.id || body.id;
    if (!paymentId) return NextResponse.json({ received: true });

    const payment = await getPayment(paymentId.toString());
    if (!payment?.external_reference) return NextResponse.json({ received: true });

    let status: 'pending' | 'approved' | 'rejected' = 'pending';
    if (payment.status === 'approved') status = 'approved';
    else if (['rejected', 'cancelled', 'refunded'].includes(payment.status || '')) status = 'rejected';

    // Idempotency: verify if already terminal
    const existing = await getPurchaseStatus(payment.external_reference);
    if (existing?.status === 'approved' || existing?.status === 'rejected') {
      return NextResponse.json({ received: true });
    }

    const payerEmail = payment.payer?.email;
    await updatePurchase(payment.external_reference, {
      status,
      mercadopago_payment_id: paymentId.toString(),
      ...(payerEmail ? { user_email: payerEmail } : {}),
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro no Webhook:', error);
    return NextResponse.json({ received: true });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
