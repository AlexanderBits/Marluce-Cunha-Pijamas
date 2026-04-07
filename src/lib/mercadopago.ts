import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

const preference = new Preference(client);
const payment = new Payment(client);

interface CreatePreferenceParams {
  items: { id: string; title: string; quantity: number; unit_price: number }[];
  purchaseId: string;
  buyerEmail?: string;
}

export async function createPreference({
  items, purchaseId, buyerEmail,
}: CreatePreferenceParams) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return preference.create({
    body: {
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: 'BRL', // Brazil for Ateliê Cunha
      })),
      ...(buyerEmail ? { payer: { email: buyerEmail } } : {}),
      back_urls: {
        success: `${baseUrl}/payment-success?purchase=${purchaseId}`,
        failure: `${baseUrl}/cart?status=failure`,
        pending: `${baseUrl}/payment-success?purchase=${purchaseId}&status=pending`,
      },
      ...(baseUrl.startsWith('https') ? { auto_return: 'approved' as const } : {}),
      external_reference: purchaseId,
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      statement_descriptor: 'ATELIE_CUNHA_PIJAMAS',
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    requestOptions: {
      idempotencyKey: purchaseId,
    },
  });
}

export async function getPayment(paymentId: string) {
  return payment.get({ id: paymentId });
}
