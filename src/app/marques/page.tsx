"use client";

import { Eye } from "lucide-react";
import Link from "next/link";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { brands } from "@/lib/data";

export default function BrandsPage() {
  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Nos Marques")]} />
        <div className="text-center mt-6 mb-12">
          <h1 className="text-3xl lg:text-4xl font-extralight text-charcoal">
            Nos Marques
          </h1>
          <p className="text-sm text-stone-400 mt-3 max-w-xl mx-auto">
            Découvrez notre sélection des plus grandes marques de lunettes de soleil et de vue.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={`/collections/all?brand=${encodeURIComponent(brand.name)}`}
              className="group border border-stone-200 p-6 text-center hover:border-gold/40 transition-all"
            >
              <div className="w-full aspect-[3/2] flex items-center justify-center bg-stone-50 mb-4 group-hover:bg-gold/5 transition-colors">
                <Eye size={28} className="text-stone-300 group-hover:text-gold/50 transition-colors" strokeWidth={1} />
              </div>
              <h2 className="text-sm font-light text-charcoal group-hover:text-gold transition-colors tracking-wide">
                {brand.name}
              </h2>
              {brand.description && (
                <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">{brand.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
