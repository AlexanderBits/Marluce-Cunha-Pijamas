"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { 
  SearchIcon, 
  UserIcon, 
  CartIcon, 
  HelpIcon, 
  FacebookIcon, 
  InstagramIcon, 
  TikTokIcon, 
  PinterestIcon,
  MenuIcon,
  CloseIcon,
  ChevronDown
} from "@/components/icons";
import { useCart } from "@/hooks/useCart";

import { getAssetPath } from "@/lib/utils";

export const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full flex flex-col font-sans">
      {/* Top Bar (Desktop Only) */}
      <div className="hidden lg:flex bg-[#8B1D5B] h-8 text-white text-[11px] items-center justify-between px-4 lg:px-20 uppercase tracking-wider">
        <div className="flex gap-4 items-center">
          <span>Bem-vindo(a) ao Ateliê Cunha!</span>
          <Link href="tel:21960148621" className="hover:underline font-bold">(21) 96014-8621</Link>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="#" className="hover:underline">Rastrear pedido</Link>
          <div className="flex gap-3 items-center">
            <FacebookIcon className="w-3 h-3 cursor-pointer hover:opacity-80" />
            <InstagramIcon className="w-3 h-3 cursor-pointer hover:opacity-80" />
            <PinterestIcon className="w-3 h-3 cursor-pointer hover:opacity-80" />
            <TikTokIcon className="w-3 h-3 cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </div>

      <div className="w-full bg-[#F2E8DD] shadow-sm z-50">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Hamburguer */}
            <button 
              className="lg:hidden p-2 text-[#8B1D5B]"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            {/* Logo (Aligned Left within container) */}
            <div className="relative h-[180px] w-[180px] flex-shrink-0">
              <Link href="/" className="relative block w-full h-full">
                <Image 
                  src={getAssetPath("/images/logo.png")} 
                  alt="Ateliê Cunha Logo" 
                  fill 
                  className="object-contain mix-blend-multiply"
                  priority
                />
              </Link>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden lg:flex flex-grow max-w-[600px] border border-[#8B1D5B]/20 rounded-full bg-white/30 px-6 py-2.5 items-center focus-within:bg-white focus-within:border-[#8B1D5B] transition-all">
              <input 
                type="text" 
                placeholder="O que você está procurando?" 
                className="w-full bg-transparent outline-none text-sm text-[#8B1D5B] placeholder:text-[#8B1D5B]/40"
              />
              <SearchIcon className="w-5 h-5 text-[#8B1D5B]/60 cursor-pointer hover:text-[#8B1D5B]" />
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-4 lg:gap-8">
              <div className="hidden lg:flex flex-col items-center cursor-pointer group">
                <HelpIcon className="w-6 h-6 text-[#8B1D5B] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] text-[#8B1D5B] mt-1 font-bold uppercase tracking-tighter">Ajuda</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <UserIcon className="w-6 h-6 text-[#8B1D5B] group-hover:scale-110 transition-transform" />
                <span className="hidden lg:block text-[10px] text-[#8B1D5B] mt-1 font-bold uppercase tracking-tighter">Conta</span>
              </div>
              <Link href="/cart" className="flex flex-col items-center cursor-pointer group relative">
                <div className="relative">
                  <CartIcon className="w-6 h-6 text-[#8B1D5B] group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#8B1D5B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden lg:block text-[10px] text-[#8B1D5B] mt-1 font-bold uppercase tracking-tighter">Carrinho</span>
              </Link>
            </div>
          </div>

          {/* Navigation Menu (Desktop) */}
          <nav className="hidden lg:flex mt-6 border-t border-[#8B1D5B]/10 pt-4 justify-center">
            <ul className="flex items-center gap-10 lg:gap-14">
              {['FEMININO', 'MASCULINO', 'LANÇAMENTOS', 'PERSONALIZADOS', 'PLUS SIZE'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-[#8B1D5B] text-[13px] font-bold tracking-widest hover:opacity-70 transition-all relative group uppercase"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B1D5B] transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
              <li>
                <button className="flex items-center gap-1 text-[#8B1D5B] text-[13px] font-bold cursor-pointer hover:opacity-70 transition-all uppercase tracking-widest">
                  <span>CATEGORIAS</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 lg:hidden">
          <div className="w-[80%] h-full bg-[#F2E8DD] flex flex-col p-6 animate-in slide-in-from-left duration-300 shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mb-10">
              <div className="relative h-12 w-40">
                <Image src="/images/logo.png" alt="Logo" fill className="object-contain mix-blend-multiply" />
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <CloseIcon className="w-6 h-6 text-[#8B1D5B]" />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 text-[#8B1D5B] text-lg font-bold uppercase tracking-tight">
              {['FEMININO', 'MASCULINO', 'LANÇAMENTOS', 'PERSONALIZADOS', 'PLUS SIZE'].map((item) => (
                <Link key={item} href="#" className="hover:text-secondary transition-colors">
                  {item}
                </Link>
              ))}
              <div className="h-px bg-gray-100 w-full" />
              <div className="flex items-center justify-between hover:text-secondary cursor-pointer transition-colors">
                <span>Categorias</span>
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-auto pt-10 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#8B1D5B]">
                <InstagramIcon className="w-6 h-6" />
                <span className="text-sm font-medium uppercase tracking-widest font-bold">Siga-nos</span>
              </div>
              <p className="text-[#8B1D5B]/40 text-xs font-bold uppercase">Ateliê Cunha © 2026</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
