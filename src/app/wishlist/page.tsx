"use client";

import { Heart, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { allProducts } from "@/lib/data";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { state, dispatch } = useStore();
  const wished = allProducts.filter((p) => state.wishlist.includes(p.id));

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Favoris")]} />
        <div className="mt-5 mb-10">
          <p className="section-eyebrow text-ink-soft">
            <Heart size={14} className="text-[var(--neon-rose)]" />
            Mes coups de cœur
          </p>
          <h1 className="mt-3 text-4xl lg:text-5xl font-light text-ink leading-[1.05]">
            Mes <span className="gradient-text-warm font-semibold">favoris</span>
          </h1>
          <p className="text-sm text-muted mt-2">
            {wished.length === 0
              ? "Votre liste est vide."
              : `${wished.length} article${wished.length > 1 ? "s" : ""} sauvegardé${wished.length > 1 ? "s" : ""}`}
          </p>
        </div>

        {wished.length === 0 ? (
          <div className="rounded-none border-2 border-dashed border-[var(--neon-rose)]/30 p-16 text-center bg-gradient-to-br from-[var(--neon-rose)]/4 via-white to-[var(--neon-violet)]/4">
            <span className="inline-grid place-items-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--neon-rose)] to-[var(--neon-magenta)] text-white">
              <Heart size={32} />
            </span>
            <p className="mt-5 text-ink-soft">Vous n&apos;avez pas encore de favoris.</p>
            <Link href="/collections/all" className="btn-primary mt-7 inline-flex">
              Explorer la collection
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wished.map((p) => (
              <div key={p.id} className="relative group">
                <ProductCard product={p} />
                <button
                  onClick={() => dispatch({ type: "TOGGLE_WISHLIST", productId: p.id })}
                  className="absolute top-3 right-3 z-10 w-9 h-9 grid place-items-center rounded-full bg-white/95 backdrop-blur text-[var(--neon-rose)] hover:bg-[var(--neon-rose)] hover:text-white shadow-md transition-all"
                  aria-label="Retirer des favoris"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
