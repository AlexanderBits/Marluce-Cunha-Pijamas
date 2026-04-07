"use client";

import React from "react";
import { Truck, ShieldCheck, Box, Ticket } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "FRETE FIXO e GRÁTIS",
    subtitle: "Confira condições",
  },
  {
    icon: ShieldCheck,
    title: "COMPRA SEGURA",
    subtitle: "ambiente protegido",
  },
  {
    icon: Box,
    title: "TROCA FÁCIL",
    subtitle: "7 dias para trocar",
  },
  {
    icon: Ticket,
    title: "CASHBACK*",
    subtitle: "10% OFF para sua Próxima Compra",
  },
];

export const BenefitsBar = () => {
  return (
    <section className="w-full bg-background py-4 lg:py-6 px-4 lg:px-20 border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto overflow-x-auto lg:overflow-x-visible no-scrollbar">
        <div className="flex items-center gap-6 lg:justify-between min-w-max lg:min-w-0">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex items-center gap-3 lg:gap-4 shrink-0">
                <div className="text-secondary">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-primary text-[13px] lg:text-[14px] font-bold leading-tight uppercase">
                    {benefit.title}
                  </h3>
                  <p className="text-[#666666] text-[11px] lg:text-[12px] font-medium leading-tight mt-0.5">
                    {benefit.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
