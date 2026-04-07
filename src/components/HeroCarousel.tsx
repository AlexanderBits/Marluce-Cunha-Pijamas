"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, getAssetPath } from "@/lib/utils";

const slides = [
  {
    image: getAssetPath("/images/hero/hero_dino_sus.png"),
    title: "PIJAMA HOSPITALAR",
    content: "CONFORTO E QUALIDADE PARA O SEU DIA A DIA NO SUS",
    buttonText: "VER MODELOS",
    align: "left",
  },
  {
    image: getAssetPath("/images/hero/hero_hearts_sus.png"),
    title: "PIJAMA DE HOSPITAL",
    content: "ESTILO E DURABILIDADE EM CADA PLANTÃO",
    buttonText: "COMPRAR AGORA",
    align: "right",
  },
  {
    image: getAssetPath("/images/hero/hero_white_sus.png"),
    title: "PIJAMA HOSPITALAR PIJAMA ENFERMAGEM",
    content: "O CLÁSSICO BRANCO COM TECIDO PREMIUM",
    buttonText: "VER DETALHES",
    align: "left",
  },
  {
    image: getAssetPath("/images/hero/hero_pink_sus.png"),
    title: "PIJAMA ENFERMAGEM",
    content: "COLEÇÃO PREMIUM PARA PROFISSIONAIS DA SAÚDE",
    buttonText: "COMPRAR",
    align: "right",
  },
];

export const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <div key={index} className="embla__slide relative flex-[0_0_100%] min-w-0">
              <div className="relative aspect-[21/9] md:aspect-[21/7] lg:aspect-[21/6.5] w-full min-h-[300px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                
                {/* Overlay Content */}
                <div className={cn(
                  "absolute inset-0 flex items-center px-10 md:px-20 lg:px-32",
                  slide.align === "right" ? "justify-end text-right" : "justify-start text-left"
                )}>
                  <div className="max-w-[500px] flex flex-col gap-2 md:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <h2 className="text-primary font-bold text-lg md:text-3xl lg:text-5xl tracking-tight">
                      {slide.title}
                    </h2>
                    <p className="text-gray-700 text-xs md:text-sm lg:text-lg font-medium max-w-[400px]">
                      {slide.content}
                    </p>
                    <button className="bg-primary text-white font-bold py-2 md:py-3 px-6 md:px-10 rounded-full text-[10px] md:text-sm hover:bg-opacity-90 transition-all w-fit self-start uppercase tracking-wider">
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-all hidden md:block"
      >
        <ChevronLeft className="w-8 h-8 text-primary" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-all hidden md:block"
      >
        <ChevronRight className="w-8 h-8 text-primary" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              index === selectedIndex ? "bg-primary w-8" : "bg-gray-300"
            )}
          />
        ))}
      </div>

      <style jsx>{`
        .embla {
          overflow: hidden;
        }
        .embla__container {
          display: flex;
        }
        .embla__slide {
          flex: 0 0 100%;
          min-w: 0;
        }
      `}</style>
    </section>
  );
};
