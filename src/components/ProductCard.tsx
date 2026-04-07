"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { getAssetPath } from "@/lib/utils";

interface ProductCardProps {
  id: number | string;
  title: string;
  price: string | number;
  installments: string;
  image: string;
  isNew?: boolean;
}

export function ProductCard({ id, title, price, installments, image, isNew }: ProductCardProps) {
  const { addItem } = useCart();
  const assetImage = getAssetPath(image);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Parse price if it's a string like "R$ 189,90"
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace('R$', '').replace(',', '.').trim())
      : price;

    addItem({
      id: id.toString(),
      title,
      price: numericPrice,
      quantity: 1,
      image
    });
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {isNew && (
        <div className="absolute top-3 left-3 z-10 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          Novo
        </div>
      )}
      
      <div className="relative aspect-[4/5] w-full bg-gray-50 overflow-hidden">
        <Image
          src={assetImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col grow">
        <h3 className="text-secondary font-bold text-sm lg:text-base leading-tight mb-2 min-h-[40px] line-clamp-2 uppercase">
          {title}
        </h3>
        
        <div className="mt-auto">
          <div className="flex flex-col mb-4">
            <span className="text-primary font-extrabold text-lg lg:text-xl">
              {typeof price === 'number' ? `R$ ${price.toFixed(2).replace('.', ',')}` : price}
            </span>
            <span className="text-gray-400 text-xs lg:text-[11px] font-medium uppercase tracking-wider">
              {installments}
            </span>
          </div>

          <Button 
            onClick={handleAddToCart}
            className="w-full bg-[#8B1D5B] hover:bg-[#71184a] text-white font-bold py-6 rounded-lg uppercase tracking-widest text-xs transition-all transform active:scale-95 shadow-sm hover:shadow-md"
          >
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </div>
  );
}
