import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { BenefitsBar } from "@/components/BenefitsBar";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryNav } from "@/components/CategoryNav";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <HeroCarousel />
        <BenefitsBar />
        <CategoryNav />
        <ProductGrid />
        {/* Further sections will be added here */}
      </main>
    </div>
  );
}
