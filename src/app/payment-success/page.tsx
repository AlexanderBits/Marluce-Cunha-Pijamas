'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { Header } from "@/components/Header";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { getAssetPath } from "@/lib/utils";
import Link from "next/link";

type Status = 'loading' | 'approved' | 'pending' | 'rejected' | 'error';

function PaymentResult() {
  const purchaseId = useSearchParams().get('purchase');
  const [status, setStatus] = useState<Status>(purchaseId ? 'loading' : 'approved');
  const { clearCart } = useCart();
  const [hasCleared, setHasCleared] = useState(false);

  const verify = useCallback(async (id: string) => {
    try {
      const res = await fetch(getAssetPath(`/api/purchases/${id}`));
      if (!res.ok) { setStatus('error'); return; }
      const { status } = await res.json();
      
      const mappedStatus = status === 'approved' ? 'approved'
        : status === 'pending' ? 'pending' : 'rejected';
      
      setStatus(mappedStatus);

      // Clear cart on success
      if (mappedStatus === 'approved' && !hasCleared) {
        clearCart();
        setHasCleared(true);
      }
    } catch { setStatus('error'); }
  }, [clearCart, hasCleared]);

  useEffect(() => { if (purchaseId) verify(purchaseId); }, [purchaseId, verify]);

  return (
    <main className="grow py-12 px-4 max-w-2xl mx-auto w-full text-center">
      <div className="bg-white rounded-3xl p-12 shadow-xl border border-[#8B1D5B]/5">
        {status === 'loading' && (
          <div className="space-y-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8B1D5B] mx-auto"></div>
            <h1 className="text-2xl font-bold text-[#8B1D5B]">Verificando seu pagamento...</h1>
            <p className="text-gray-500">Isso levará apenas alguns segundos.</p>
          </div>
        )}

        {status === 'approved' && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-[#8B1D5B] uppercase tracking-widest">Pagamento Aprovado!</h1>
            <p className="text-gray-500 text-lg">Obrigado pela sua compra no Ateliê Cunha. Você receberá um e-mail com os detalhes do seu pedido em breve.</p>
            <div className="pt-8">
              <Link href="/">
                <Button className="bg-[#8B1D5B] hover:bg-[#71184a] text-white font-bold px-10 py-7 rounded-xl uppercase tracking-widest text-xs shadow-lg">
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          </div>
        )}

        {status === 'pending' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#8B1D5B] uppercase">Pagamento em Processamento</h1>
            <p className="text-gray-500 italic">Seu pagamento está sendo analisado pelo Mercado Pago. Assim que for aprovado, seu pedido será processado.</p>
            <div className="pt-8">
              <Link href="/">
                <Button className="variant-outline border-[#8B1D5B] text-[#8B1D5B] font-bold px-8 py-4 rounded-xl uppercase tracking-widest text-xs">
                  Voltar para a Inicial
                </Button>
              </Link>
            </div>
          </div>
        )}

        {(status === 'rejected' || status === 'error') && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600 uppercase">Ops! Algo deu errado</h1>
            <p className="text-gray-500">Não conseguimos confirmar seu pagamento. Por favor, tente novamente ou entre em contato com nosso suporte.</p>
            <div className="pt-8 flex flex-col gap-4">
              <Link href="/cart">
                <Button className="w-full bg-[#8B1D5B] hover:bg-[#71184a] text-white font-bold py-6 rounded-xl uppercase tracking-widest text-xs shadow-lg">
                  Tentar Novamente no Carrinho
                </Button>
              </Link>
              <Link href="/">
                <button className="text-[#8B1D5B] font-bold uppercase text-xs hover:underline tracking-widest">
                  Voltar para a Loja
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F2E8DD]/30">
      <Header />
      <Suspense fallback={
        <div className="grow py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B1D5B]"></div>
        </div>
      }>
        <PaymentResult />
      </Suspense>
    </div>
  );
}
