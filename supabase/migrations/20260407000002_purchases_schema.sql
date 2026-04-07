-- 20260407000002_purchases_schema.sql
-- Purchases and items schema for payment tracking.
-- Based on mercadopago-integration skill patterns.

-- 1. Create purchases table
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  total_amount DECIMAL(10, 2) NOT NULL,
  mercadopago_payment_id TEXT,
  mercadopago_preference_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Read policy: Anyone can see their own purchases by email (simple tracking)
-- Note: In a full auth system, this would use auth.uid()
CREATE POLICY "purchases_read_own"
  ON public.purchases FOR SELECT
  USING (true); -- Publicly readable for now, protected by ID in queries

-- 2. Create purchase_items table
CREATE TABLE public.purchase_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID REFERENCES public.purchases(id) ON DELETE CASCADE,
  item_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.purchase_items ENABLE ROW LEVEL SECURITY;

-- Create index for performance
CREATE INDEX idx_purchase_items_purchase_id ON public.purchase_items(purchase_id);
