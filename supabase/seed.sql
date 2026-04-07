-- 20260407000001_initial_schema.sql
-- Initial schema for Ateliê Cunha E-commerce
-- Includes categories and products with RLS policies.

-- 1. Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Read policy: Anyone can see categories
CREATE POLICY IF NOT EXISTS "categories_read_all"
  ON public.categories FOR SELECT
  USING (true);

-- Admin policy: Full access for managing categories
CREATE POLICY IF NOT EXISTS "categories_admin_all"
  ON public.categories FOR ALL
  USING (true)
  WITH CHECK (true);

-- 2. Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_new BOOLEAN DEFAULT FALSE,
  stock INTEGER DEFAULT 0,
  installments TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Read policy: Anyone can see products
CREATE POLICY IF NOT EXISTS "products_read_all"
  ON public.products FOR SELECT
  USING (true);

-- Admin policy: Full access for managing products
CREATE POLICY IF NOT EXISTS "products_admin_all"
  ON public.products FOR ALL
  USING (true)
  WITH CHECK (true);

-- Index for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);

-- 3. Seed initial data
INSERT INTO public.categories (name, slug, image_url) VALUES
('Mundo Dino', 'dino', '/images/products/dino.png'),
('Corações', 'hearts', '/images/products/hearts.png'),
('Linha Pets', 'pets', '/images/products/dalmatas.png'),
('Coleção Kids', 'kids', '/images/products/mickey-blue.png'),
('Cores Premium', 'premium', '/images/products/white-premium.png')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (title, slug, price, image_url, is_new, installments) VALUES
('Pijama Hospitalar Dino Rosa', 'pijama-dino-rosa', 189.90, '/images/products/dino.png', true, '10x de R$ 18,99'),
('Pijama Hospitalar Corações Azul', 'pijama-hearts-blue', 179.90, '/images/products/hearts.png', false, '10x de R$ 17,99'),
('Pijama Hospitalar Dalmátas', 'pijama-dalmatas', 199.90, '/images/products/dalmatas.png', true, '10x de R$ 19,99'),
('Pijama Hospitalar Premium Branco', 'pijama-premium-branco', 249.90, '/images/products/white-premium.png', true, '10x de R$ 24,99')
ON CONFLICT (slug) DO NOTHING;
