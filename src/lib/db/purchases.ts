import { supabase } from '../supabase';

export interface PurchaseInsert {
  user_email: string;
  status: 'pending';
  total_amount: number;
}

export interface PurchaseUpdate {
  status?: 'pending' | 'approved' | 'rejected';
  mercadopago_payment_id?: string;
  mercadopago_preference_id?: string;
  user_email?: string;
  updated_at?: string;
}

export async function createPurchase(data: PurchaseInsert) {
  const { data: purchase, error } = await supabase
    .from('purchases')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return purchase;
}

export async function updatePurchase(id: string, data: PurchaseUpdate) {
  const { error } = await supabase
    .from('purchases')
    .update(data)
    .eq('id', id);

  if (error) throw error;
}

export async function getPurchaseStatus(id: string) {
  const { data, error } = await supabase
    .from('purchases')
    .select('id, status')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createPurchaseItems(purchaseId: string, items: { id: string; title: string; price: number; quantity: number }[]) {
  const itemsToInsert = items.map((item) => ({
    purchase_id: purchaseId,
    item_id: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
  }));

  const { error } = await supabase
    .from('purchase_items')
    .insert(itemsToInsert);

  if (error) throw error;
}
