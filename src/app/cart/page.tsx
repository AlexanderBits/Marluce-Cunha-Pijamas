'use client';

import { useCart } from "@/hooks/useCart";
import { Header } from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getAssetPath } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            id: i.id,
            title: i.title,
            quantity: i.quantity,
            unit_price: i.price
          }))
        })
      });

      const data = await res.json();
      if (data.initPoint) {
        window.location.href = data.initPoint;
      } else {
        alert('Erro ao iniciar o checkout. Tente novamente.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro na conexão. Verifique sua internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F2E8DD]/30">
      <Header />
      
      <main className="grow py-12 px-4 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-[#8B1D5B] mb-8 uppercase tracking-widest">Seu Carrinho</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-6 font-medium">Seu carrinho está vazio.</p>
            <Link href="/">
              <Button className="bg-[#8B1D5B] hover:bg-[#71184a] text-white font-bold px-8 py-6 rounded-lg uppercase tracking-widest text-xs">
                Voltar para a Loja
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 flex gap-4 shadow-sm border border-gray-500/10">
                  <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                    <Image 
                      src={getAssetPath(item.image || '/images/placeholder.png')} 
                      alt={item.title} 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  
                  <div className="flex flex-col grow">
                    <h3 className="font-bold text-[#8B1D5B] text-sm uppercase mb-1">{item.title}</h3>
                    <p className="text-[#8B1D5B] font-extrabold text-lg">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-[#8B1D5B] font-bold hover:bg-gray-100 h-full"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-sm font-bold text-[#8B1D5B] border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-[#8B1D5B] font-bold hover:bg-gray-100 h-full"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 text-xs font-bold uppercase underline tracking-tighter"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#8B1D5B]/10 sticky top-24">
                <h2 className="text-lg font-bold text-[#8B1D5B] mb-6 uppercase tracking-wider">Resumo</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Itens ({totalItems})</span>
                    <span className="font-bold text-[#8B1D5B]">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Frete</span>
                    <span className="text-green-600 font-bold uppercase tracking-widest text-[10px]">Grátis</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[#8B1D5B] uppercase text-xs">Total</span>
                    <span className="text-2xl font-black text-[#8B1D5B]">
                      R$ {totalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 text-right">ou em até 10x sem juros</p>
                </div>

                <Button 
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                  className="w-full bg-[#8B1D5B] hover:bg-[#71184a] text-white font-bold py-7 rounded-xl uppercase tracking-widest text-xs shadow-lg transform active:scale-95 transition-all"
                >
                  {isSubmitting ? 'Processando...' : 'Finalizar Compra'}
                </Button>
                
                <p className="mt-4 text-[10px] text-center text-gray-400 font-medium">
                  🔒 Pagamento 100% Seguro via Mercado Pago
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
