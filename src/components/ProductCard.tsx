"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  installments: string;
  isNew?: boolean;
}

export function ProductCard({ image, title, price, installments, isNew }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {isNew && (
        <div className="absolute top-3 left-3 z-10 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          Novo
        </div>
      )}
      
      <div className="relative aspect-[4/5] w-full bg-gray-50 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-gray-800 font-medium text-sm mb-2 line-clamp-2 uppercase tracking-tight">
          {title}
        </h3>
        
        <div className="mt-auto">
          <p className="text-primary font-bold text-lg">{price}</p>
          <p className="text-gray-500 text-xs mt-1">ou {installments}</p>
          
          <p className="text-[10px] text-gray-400 mt-2 uppercase font-medium">
            * Calças sem estampa (lisa)
          </p>
          
          <Button 
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold h-10"
          >
            VER DETALHES
          </Button>
        </div>
      </div>
    </div>
  );
}
