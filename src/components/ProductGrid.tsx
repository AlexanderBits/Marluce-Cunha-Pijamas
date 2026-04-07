"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { supabase } from "@/lib/supabase";

export function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B1D5B]"></div>
      </div>
    );
  }
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-bold text-primary tracking-tight mb-2 uppercase">
          Destaques da Semana
        </h2>
        <div className="h-1 w-20 bg-secondary rounded-full"></div>
        <p className="text-gray-500 mt-4 text-center max-w-2xl">
          Confira os modelos mais desejados do Ateliê Cunha. Conforto, durabilidade e estampas exclusivas para o seu plantão.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            image={product.image_url} 
            isNew={product.is_new} 
          />
        ))}
      </div>
    </section>
  );
}
