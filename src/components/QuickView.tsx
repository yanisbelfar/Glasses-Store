"use client";

import { X, Heart, ShoppingBag, Eye } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { allProducts } from "@/lib/data";

export class QuickViewController {
  static getProduct(id: string | null) {
    return allProducts.find((p) => p.id === id) ?? null;
  }
}

export default function QuickView() {
  const { state, dispatch } = useStore();
  const product = QuickViewController.getProduct(state.quickViewProductId);

  if (!state.isQuickViewOpen || !product) return null;

  const isWished = state.wishlist.includes(product.id);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={() => dispatch({ type: "CLOSE_QUICK_VIEW" })}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[61] bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={() => dispatch({ type: "CLOSE_QUICK_VIEW" })}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-charcoal transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="aspect-square bg-stone-100 flex items-center justify-center">
            <Eye size={48} className="text-stone-300" strokeWidth={1} />
          </div>

          {/* Info */}
          <div className="p-8">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2">{product.brand}</p>
            <h3 className="text-2xl font-light text-charcoal">{product.name}</h3>
            <p className="text-2xl font-light text-charcoal mt-2">{product.formattedPrice}</p>

            {product.description && (
              <p className="text-sm text-stone-500 mt-4">{product.description}</p>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-2">Couleurs</p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      className="w-8 h-8 rounded-full border-2 border-stone-200 hover:border-gold transition-colors"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-2">Taille</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className="px-3 py-1 border border-stone-200 text-xs text-stone-600 hover:border-gold hover:text-gold transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <button
                onClick={() => dispatch({ type: "ADD_TO_CART", product })}
                className="w-full py-4 bg-gold text-white text-xs tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                Ajouter au panier
              </button>
              <button
                onClick={() => dispatch({ type: "TOGGLE_WISHLIST", productId: product.id })}
                className={`w-full py-3 border text-xs tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 ${
                  isWished
                    ? "border-gold text-gold"
                    : "border-stone-200 text-stone-600 hover:border-gold hover:text-gold"
                }`}
              >
                <Heart size={16} fill={isWished ? "currentColor" : "none"} />
                {isWished ? "Dans vos favoris" : "Ajouter aux favoris"}
              </button>
              <Link
                href={`/products/${product.id}`}
                onClick={() => dispatch({ type: "CLOSE_QUICK_VIEW" })}
                className="block text-center text-xs tracking-[0.2em] uppercase text-stone-500 hover:text-gold transition-colors py-2"
              >
                Voir tous les détails
              </Link>
            </div>

            {/* Details */}
            <div className="mt-6 pt-6 border-t border-stone-100 space-y-2 text-xs text-stone-400">
              {product.material && <p>Matière : {product.material}</p>}
              {product.shape && <p>Forme : {product.shape}</p>}
              {product.lensType && <p>Verres : {product.lensType}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
