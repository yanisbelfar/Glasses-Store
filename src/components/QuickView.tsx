"use client";

import { X, Heart, ArrowRight, Sparkles } from "lucide-react";
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
      <div
        className="fixed inset-0 z-[60] bg-[#04061a]/65 backdrop-blur-md animate-fade-in"
        onClick={() => dispatch({ type: "CLOSE_QUICK_VIEW" })}
      />
      <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[61] bg-white max-w-3xl w-full max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl shadow-[var(--neon-violet)]/20 border border-white/60 animate-scale-in">
        <button
          onClick={() => dispatch({ type: "CLOSE_QUICK_VIEW" })}
          className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-full bg-white/80 backdrop-blur text-ink hover:text-[var(--neon-rose)] z-10 shadow-md"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#f5f7ff] to-[#e9eeff]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className="chip bg-gradient-to-r from-[var(--neon-violet)] to-[var(--neon-magenta)] text-white shadow-lg">
                  {product.badge === "best-seller" ? "★ Best Seller" : product.badge === "nouveau" ? "✦ Nouveau" : "Tendance"}
                </span>
              )}
              <span className="brand-pill">{product.brand}</span>
            </div>
          </div>

          {/* Info */}
          <div className="p-7">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--neon-violet)] font-semibold">
              Aperçu rapide
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-ink">{product.name}</h3>
            <p className="text-xs text-muted tracking-wider uppercase mt-1">
              {product.category} · {product.shape}
            </p>

            {product.description && (
              <p className="text-sm text-ink-soft mt-4 leading-relaxed">
                {product.description}
              </p>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="mt-5">
                <p className="text-[11px] tracking-[0.22em] uppercase text-muted mb-2">
                  Couleurs disponibles
                </p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <span
                      key={c.name}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-5">
                <p className="text-[11px] tracking-[0.22em] uppercase text-muted mb-2">
                  Tailles
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full border border-[var(--neon-violet)]/20 text-xs text-ink-soft bg-[#f5f7ff]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-7 grid grid-cols-2 gap-2 text-xs text-ink-soft">
              {product.material && (
                <div className="rounded-xl border border-[var(--neon-violet)]/10 p-3 bg-[#f5f7ff]/60">
                  <p className="text-[10px] tracking-wider uppercase text-muted">
                    Matière
                  </p>
                  <p className="font-semibold text-ink mt-0.5">{product.material}</p>
                </div>
              )}
              {product.lensType && (
                <div className="rounded-xl border border-[var(--neon-violet)]/10 p-3 bg-[#f5f7ff]/60">
                  <p className="text-[10px] tracking-wider uppercase text-muted">
                    Verres
                  </p>
                  <p className="font-semibold text-ink mt-0.5">{product.lensType}</p>
                </div>
              )}
            </div>

            <div className="mt-7 space-y-2">
              <Link
                href={`/products/${product.id}`}
                onClick={() => dispatch({ type: "CLOSE_QUICK_VIEW" })}
                className="btn-primary w-full"
              >
                <Sparkles size={14} />
                Indiquer ma monture
                <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => dispatch({ type: "TOGGLE_WISHLIST", productId: product.id })}
                className={`w-full py-3 rounded-full border text-xs tracking-[0.22em] uppercase font-semibold transition-all flex items-center justify-center gap-2 ${
                  isWished
                    ? "border-[var(--neon-rose)] text-[var(--neon-rose)] bg-[var(--neon-rose)]/5"
                    : "border-[var(--neon-violet)]/20 text-ink-soft hover:text-[var(--neon-rose)] hover:border-[var(--neon-rose)]"
                }`}
              >
                <Heart size={14} fill={isWished ? "currentColor" : "none"} />
                {isWished ? "Dans vos favoris" : "Ajouter aux favoris"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
