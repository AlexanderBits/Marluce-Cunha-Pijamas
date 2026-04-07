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
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  // Buyer & Address State
  const [buyerData, setBuyerData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
  });

  const [addressData, setAddressData] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  // ViaCEP Logic
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    setAddressData(prev => ({ ...prev, cep }));

    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        
        if (!data.erro) {
          setAddressData(prev => ({
            ...prev,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
          }));
          // Auto-focus the Number field after auto-fill
          document.getElementById('address-number')?.focus();
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showAddressForm) {
      setShowAddressForm(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(getAssetPath('/api/checkout'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            id: i.id,
            title: i.title,
            quantity: i.quantity,
            unit_price: i.price
          })),
          buyer: buyerData,
          address: addressData
        })
      });

      const data = await res.json();
      if (data.initPoint) {
        window.location.href = data.initPoint;
      } else {
        console.error('Checkout Error:', data);
        alert(`Erro: ${data.error || 'Falha ao iniciar checkout'}`);
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
      
      <main className="grow py-12 px-4 max-w-6xl mx-auto w-full">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Items List & Address Form */}
            <div className="lg:col-span-8 space-y-6">
              {/* Items */}
              {!showAddressForm && (
                <div className="space-y-4">
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
              )}

              {/* Delivery Data Form */}
              {showAddressForm && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#8B1D5B]/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black text-[#8B1D5B] uppercase tracking-widest">Dados de Entrega</h2>
                    <button 
                      onClick={() => setShowAddressForm(false)}
                      className="text-xs font-bold text-gray-400 hover:text-[#8B1D5B] uppercase underline"
                    >
                      Voltar ao Carrinho
                    </button>
                  </div>

                  <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
                    {/* Buyer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#8B1D5B] uppercase ml-1">Nome Completo</label>
                        <input 
                          type="text" required
                          value={buyerData.name}
                          onChange={e => setBuyerData({...buyerData, name: e.target.value})}
                          placeholder="Ex: Maria Cunha"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1D5B]/20"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#8B1D5B] uppercase ml-1">E-mail</label>
                        <input 
                          type="email" required
                          value={buyerData.email}
                          onChange={e => setBuyerData({...buyerData, email: e.target.value})}
                          placeholder="maria@exemplo.com"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1D5B]/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#8B1D5B] uppercase ml-1">Telefone / WhatsApp</label>
                        <input 
                          type="text" required
                          value={buyerData.phone}
                          onChange={e => setBuyerData({...buyerData, phone: e.target.value})}
                          placeholder="(21) 99999-9999"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1D5B]/20"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#8B1D5B] uppercase ml-1">CPF (Opcional)</label>
                        <input 
                          type="text"
                          value={buyerData.cpf}
                          onChange={e => setBuyerData({...buyerData, cpf: e.target.value})}
                          placeholder="000.000.000-00"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1D5B]/20"
                        />
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Address Section - CEP FIRST */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#8B1D5B] uppercase ml-1">CEP</label>
                        <input 
                          type="text" required
                          maxLength={9}
                          value={addressData.cep}
                          onChange={handleCepChange}
                          placeholder="00000-000"
                          className="w-full bg-[#8B1D5B]/5 border border-[#8B1D5B]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#8B1D5B] focus:outline-none focus:ring-2 focus:ring-[#8B1D5B]/20"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Rua / Logradouro</label>
                        <input 
                          type="text" required
                          value={addressData.logradouro}
                          onChange={e => setAddressData({...addressData, logradouro: e.target.value})}
                          className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#8B1D5B] uppercase ml-1">Número</label>
                        <input 
                          id="address-number"
                          type="text" required
                          value={addressData.numero}
                          onChange={e => setAddressData({...addressData, numero: e.target.value})}
                          placeholder="Nº"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1D5B]/20"
                        />
                      </div>
                      <div className="md:col-span-3 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Complemento</label>
                        <input 
                          type="text"
                          value={addressData.complemento}
                          onChange={e => setAddressData({...addressData, complemento: e.target.value})}
                          placeholder="Apt, Bloco, etc."
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Bairro</label>
                        <input 
                          type="text" required
                          value={addressData.bairro}
                          onChange={e => setAddressData({...addressData, bairro: e.target.value})}
                          className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Cidade</label>
                        <input 
                          type="text" required
                          value={addressData.cidade}
                          onChange={e => setAddressData({...addressData, cidade: e.target.value})}
                          className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Estado (UF)</label>
                        <input 
                          type="text" required maxLength={2}
                          value={addressData.estado}
                          onChange={e => setAddressData({...addressData, estado: e.target.value.toUpperCase()})}
                          className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-4">
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
                  form={showAddressForm ? "checkout-form" : undefined}
                  type={showAddressForm ? "submit" : "button"}
                  onClick={!showAddressForm ? handleCheckout : undefined}
                  disabled={isSubmitting}
                  className="w-full bg-[#8B1D5B] hover:bg-[#71184a] text-white font-bold py-7 rounded-xl uppercase tracking-widest text-xs shadow-lg transform active:scale-95 transition-all"
                >
                  {isSubmitting ? 'Processando...' : showAddressForm ? 'Pagar via Mercado Pago' : 'Finalizar Compra'}
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
