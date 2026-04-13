"use client";

import { Heart, ShoppingBag, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { allProducts } from "@/lib/data";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

export default function WishlistPage() {
  const { state, dispatch } = useStore();
  const wishedProducts = allProducts.filter((p) => state.wishlist.includes(p.id));

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Favoris")]} />
        <h1 className="text-3xl lg:text-4xl font-extralight text-charcoal mt-4 mb-2">
          Mes Favoris
        </h1>
        <p className="text-sm text-stone-400 mb-10">
          {wishedProducts.length === 0
            ? "Votre liste de souhaits est vide."
            : `${wishedProducts.length} article${wishedProducts.length > 1 ? "s" : ""}`}
        </p>

        {wishedProducts.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="text-stone-200 mx-auto mb-4" strokeWidth={1} />
            <p className="text-stone-400 mb-6">Vous n&apos;avez pas encore de favoris.</p>
            <Link
              href="/collections/all"
              className="inline-block px-8 py-3 bg-gold text-white text-xs tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors"
            >
              Découvrir la collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {wishedProducts.map((p) => (
              <div key={p.id} className="group relative">
                <Link href={`/products/${p.id}`}>
                  <div className="aspect-square bg-stone-100 flex items-center justify-center">
                    <Eye size={40} className="text-stone-300 group-hover:text-gold/50 transition-colors" strokeWidth={1} />
                  </div>
                </Link>
                <button
                  onClick={() => dispatch({ type: "TOGGLE_WISHLIST", productId: p.id })}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/80 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors"
                  title="Retirer des favoris"
                >
                  <Trash2 size={14} />
                </button>
                <div className="mt-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gold">{p.brand}</p>
                  <p className="text-sm font-light text-charcoal truncate">{p.name}</p>
                  <p className="text-sm text-stone-500 mt-1">{p.formattedPrice}</p>
                </div>
                <button
                  onClick={() => dispatch({ type: "ADD_TO_CART", product: p })}
                  className="mt-2 w-full py-2 bg-charcoal text-white text-[10px] tracking-[0.2em] uppercase hover:bg-gold transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={12} />
                  Ajouter au panier
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
