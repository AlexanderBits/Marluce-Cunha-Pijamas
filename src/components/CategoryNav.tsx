"use client";

import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";

const categories = [
  {
    id: 1,
    name: "Mundo Dino",
    image: getAssetPath("/images/products/dino.png"),
    slug: "dino",
  },
  {
    id: 2,
    name: "Corações",
    image: getAssetPath("/images/products/hearts.png"),
    slug: "hearts",
  },
  {
    id: 3,
    name: "Linha Pets",
    image: getAssetPath("/images/products/dalmatas.png"),
    slug: "pets",
  },
  {
    id: 4,
    name: "Coleção Kids",
    image: getAssetPath("/images/products/mickey-blue.png"),
    slug: "kids",
  },
  {
    id: 5,
    name: "Cores Premium",
    image: getAssetPath("/images/products/white-premium.png"),
    slug: "premium",
  },
];

export function CategoryNav() {
  return (
    <section className="py-8 bg-[#F2EAE4] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">
          Compre por Estampa
        </h2>
        
        <div className="flex md:justify-center overflow-x-auto pb-4 gap-6 md:gap-12 scrollbar-hide no-scrollbar">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="flex flex-col items-center group shrink-0"
            >
              <div className="relative w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-lg group-hover:border-primary transition-all duration-300">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="mt-4 text-sm md:text-base font-bold text-gray-800 group-hover:text-primary transition-colors uppercase tracking-tight">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
