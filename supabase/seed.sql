-- seed.sql
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/bbyumylxcpkadxdlloay/sql)
-- This will populate your categories and products for Ateliê Cunha.

-- 1. Insert Initial Category
INSERT INTO public.categories (name, slug, image_url)
VALUES ('Pijamas Hospitalares', 'pijamas-hospitalares', '/images/categories/hospitalar.jpg')
ON CONFLICT (slug) DO NOTHING;

-- 2. Get the Category ID (Helper for the next inserts)
DO $$
DECLARE
    cat_id UUID;
BEGIN
    SELECT id INTO cat_id FROM public.categories WHERE slug = 'pijamas-hospitalares' LIMIT 1;

    -- 3. Insert Products
    INSERT INTO public.products (category_id, title, slug, price, installments, image_url, is_new, stock)
    VALUES 
    (cat_id, 'Pijama Hospitalar Dino Blue - Confort Premium', 'pijama-dino-blue', 189.90, '10x de R$ 18,99', '/images/products/dino.png', true, 50),
    (cat_id, 'Pijama Hospitalar Hearts Pink - Coleção Delicadeza', 'pijama-hearts-pink', 199.90, '10x de R$ 19,99', '/images/products/hearts.png', true, 50),
    (cat_id, 'Pijama Hospitalar Branco Neve - Linha Premium Elite', 'pijama-branco-neve', 219.90, '10x de R$ 21,99', '/images/products/white-premium.png', false, 30),
    (cat_id, 'Pijama Hospitalar Rosa Suave - Toque de Seda', 'pijama-rosa-suave', 195.90, '10x de R$ 19,59', '/images/products/pink-premium.jpg', false, 40),
    (cat_id, 'Pijama Hospitalar Mickey Blue - Kids Care Edition', 'pijama-mickey-blue', 189.90, '10x de R$ 18,99', '/images/products/mickey-blue.png', true, 25),
    (cat_id, 'Pijama Hospitalar Gatinhos Lilás - Coleção Joy', 'pijama-gatinhos-lilas', 189.90, '10x de R$ 18,99', '/images/products/cats-purple.jpg', true, 35),
    (cat_id, 'Pijama Hospitalar Dálmatas - Edição Especial Pediatria', 'pijama-dalmatas', 189.90, '10x de R$ 18,99', '/images/products/dalmatas.png', false, 20),
    (cat_id, 'Pijama Hospitalar Powerpuff Girls - Linda, Doce e Forte', 'pijama-powerpuff-girls', 199.90, '10x de R$ 19,99', '/images/products/powerpuff.png', true, 15)
    ON CONFLICT (slug) DO NOTHING;
END $$;
