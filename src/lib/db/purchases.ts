import { supabase } from '../supabase';

export interface PurchaseInsert {
  buyer_email: string;
  status: 'pending';
  total_amount: number;
  
  // Buyer Info
  buyer_name?: string;
  buyer_phone?: string;
  buyer_cpf?: string;
  
  // Address Info
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
}

export interface PurchaseUpdate {
  status?: 'pending' | 'approved' | 'rejected';
  mercadopago_payment_id?: string;
  mercadopago_preference_id?: string;
  buyer_email?: string;
  updated_at?: string;
  
  // Optional updates for buyer/address
  buyer_name?: string;
  buyer_phone?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
}

export async function createPurchase(data: PurchaseInsert) {
  const { data: purchase, error } = await supabase
    .from('purchases')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Database detailed error:', error);
    throw error;
  }
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
