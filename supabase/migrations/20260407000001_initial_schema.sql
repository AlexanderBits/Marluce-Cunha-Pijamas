-- 20260407000001_initial_schema.sql
-- Initial schema for Ateliê Cunha E-commerce
-- Includes categories and products with RLS policies.

-- 1. Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Read policy: Anyone can see categories
CREATE POLICY "categories_read_all"
  ON public.categories FOR SELECT
  USING (true);

-- 2. Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_new BOOLEAN DEFAULT FALSE,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Read policy: Anyone can see products
CREATE POLICY "products_read_all"
  ON public.products FOR SELECT
  USING (true);

-- Index for better performance
CREATE INDEX idx_products_category_id ON public.products(category_id);
