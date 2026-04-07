"use client";

import { ProductCard } from "./ProductCard";

const products = [
  {
    id: 1,
    title: "Pijama Hospitalar Dino Blue - Confort Premium",
    price: "R$ 189,90",
    installments: "10x de R$ 18,99",
    image: "/images/products/dino.png",
    isNew: true,
  },
  {
    id: 2,
    title: "Pijama Hospitalar Hearts Pink - Coleção Delicadeza",
    price: "R$ 199,90",
    installments: "10x de R$ 19,99",
    image: "/images/products/hearts.png",
    isNew: true,
  },
  {
    id: 3,
    title: "Pijama Hospitalar Branco Neve - Linha Premium Elite",
    price: "R$ 219,90",
    installments: "10x de R$ 21,99",
    image: "/images/products/white-premium.png",
    isNew: false,
  },
  {
    id: 4,
    title: "Pijama Hospitalar Rosa Suave - Toque de Seda",
    price: "R$ 195,90",
    installments: "10x de R$ 19,59",
    image: "/images/products/pink-premium.jpg",
    isNew: false,
  },
  {
    id: 5,
    title: "Pijama Hospitalar Mickey Blue - Kids Care Edition",
    price: "R$ 189,90",
    installments: "10x de R$ 18,99",
    image: "/images/products/mickey-blue.png",
    isNew: true,
  },
  {
    id: 6,
    title: "Pijama Hospitalar Gatinhos Lilás - Coleção Joy",
    price: "R$ 189,90",
    installments: "10x de R$ 18,99",
    image: "/images/products/cats-purple.jpg",
    isNew: true,
  },
  {
    id: 7,
    title: "Pijama Hospitalar Dálmatas - Edição Especial Pediatria",
    price: "R$ 189,90",
    installments: "10x de R$ 18,99",
    image: "/images/products/dalmatas.png",
    isNew: false,
  },
  {
    id: 8,
    title: "Pijama Hospitalar Powerpuff Girls - Linda, Doce e Forte",
    price: "R$ 199,90",
    installments: "10x de R$ 19,99",
    image: "/images/products/powerpuff.png",
    isNew: true,
  },
];

export function ProductGrid() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-bold text-primary tracking-tight mb-2 uppercase">
          Destaques da Semana
        </h2>
        <div className="h-1 w-20 bg-secondary rounded-full"></div>
        <p className="text-gray-500 mt-4 text-center max-w-2xl">
          Confira os modelos mais desejados do Ateliê Cunha. Conforto, durabilidade e estampas exclusivas para o seu plantão.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
