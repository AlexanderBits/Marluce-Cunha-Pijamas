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
      <div className="py-20 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B1D5B] mb-4"></div>
        <p className="text-[#8B1D5B]/60 text-xs font-bold uppercase tracking-widest animate-pulse">Carregando Vitrine...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 px-4 max-w-7xl mx-auto text-center border-2 border-dashed border-[#8B1D5B]/10 rounded-3xl my-10 bg-white/50">
        <div className="mb-6 flex justify-center">
          <div className="bg-[#8B1D5B]/10 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B1D5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
        </div>
        <h2 className="text-xl font-black text-[#8B1D5B] uppercase tracking-widest mb-2">Nenhum produto encontrado</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-8 font-medium">
          A vitrine está vazia. Certifique-se de executar o script de inicialização do banco de dados no painel do Supabase.
        </p>
        <div className="bg-[#8B1D5B] text-white p-4 rounded-xl inline-block text-[10px] font-mono tracking-tighter opacity-80">
          Dica: Rode o arquivo supabase/seed.sql no seu SQL Editor
        </div>
      </section>
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
