"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FacebookIcon, 
  InstagramIcon, 
  TikTokIcon, 
  PinterestIcon 
} from "@/components/icons";
import { getAssetPath } from "@/lib/utils";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-4 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* About */}
        <div className="flex flex-col gap-6">
          <div className="relative h-12 w-48">
            <Image 
              src={getAssetPath("/images/logo.png")} 
              alt="Ateliê Cunha Logo" 
              fill 
              className="object-contain mix-blend-multiply" 
            />
          </div>
          <p className="text-[#8B1D5B]/60 text-sm leading-relaxed max-w-xs">
            Ateliê Cunha - Pijamas Hospitalares Premium. Conforto, qualidade e personalização para profissionais da saúde.
          </p>
          <div className="flex gap-4 items-center">
            <FacebookIcon className="w-5 h-5 text-[#8B1D5B] hover:opacity-70 cursor-pointer transition-all" />
            <InstagramIcon className="w-5 h-5 text-[#8B1D5B] hover:opacity-70 cursor-pointer transition-all" />
            <PinterestIcon className="w-5 h-5 text-[#8B1D5B] hover:opacity-70 cursor-pointer transition-all" />
            <TikTokIcon className="w-5 h-5 text-[#8B1D5B] hover:opacity-70 cursor-pointer transition-all" />
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[#8B1D5B] font-bold text-sm uppercase tracking-widest">Navegação</h3>
          <ul className="flex flex-col gap-3 text-sm text-[#8B1D5B]/60">
            <li><Link href="/" className="hover:text-[#8B1D5B] transition-colors uppercase font-medium">Home</Link></li>
            <li><Link href="#" className="hover:text-[#8B1D5B] transition-colors uppercase font-medium">Feminino</Link></li>
            <li><Link href="#" className="hover:text-[#8B1D5B] transition-colors uppercase font-medium">Masculino</Link></li>
            <li><Link href="#" className="hover:text-[#8B1D5B] transition-colors uppercase font-medium">Lançamentos</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[#8B1D5B] font-bold text-sm uppercase tracking-widest">Ajuda</h3>
          <ul className="flex flex-col gap-3 text-sm text-[#8B1D5B]/60">
            <li><Link href="#" className="hover:text-[#8B1D5B] transition-colors uppercase font-medium">Sobre Nós</Link></li>
            <li><Link href="#" className="hover:text-[#8B1D5B] transition-colors uppercase font-medium">Trocas e Devoluções</Link></li>
            <li><Link href="#" className="hover:text-[#8B1D5B] transition-colors uppercase font-medium">Envio e Prazos</Link></li>
            <li><Link href="#" className="hover:text-[#8B1D5B] transition-colors uppercase font-medium">Fale Conosco</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[#8B1D5B] font-bold text-sm uppercase tracking-widest">Contato</h3>
          <div className="flex flex-col gap-4 text-sm text-[#8B1D5B]/60 italic">
            <p>(21) 96014-8621</p>
            <p>contato@ateliecunha.com.br</p>
            <p>Rio de Janeiro, RJ</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-[#8B1D5B]/40 font-medium uppercase tracking-widest">
          Ateliê Cunha © {currentYear} | Todos os direitos reservados.
        </p>
        
        <div className="flex items-center gap-8">
           <Image 
              src="https://logodownload.org/wp-content/uploads/2014/10/mercado-pago-logo.png" 
              alt="Pagamento Seguro" 
              width={80} 
              height={20} 
              className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair h-auto w-auto"
            />
          
          {/* Discrete Shield Icon for Admin */}
          <Link 
            href="/admin" 
            className="text-gray-300 hover:text-[#8B1D5B] transition-colors transform hover:scale-110 active:scale-95 duration-300"
            title="Administração"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              fill="currentColor" 
              viewBox="0 0 16 16"
            >
              <path d="M1 1a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2.5a.5.5 0 0 1-1 0V1H2v2.5a.5.5 0 0 1-1 0zM14 14V3H2v11h12zM2 15a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/>
              <path d="M5.05 9h5.9L10 6H6l-.95 3zm.45 1h5l.5 2h-6l.5-2z"/>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};
