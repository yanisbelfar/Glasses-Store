"use client";

import { X, Minus, Plus, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";

export class CartSidebarConfig {
  static readonly title = "Votre Panier";
  static readonly emptyMessage = "Votre panier est encore vide";
  static readonly emptySubtext =
    "Ajoutez vos coups de cœur et finalisez votre demande sur WhatsApp.";
  static readonly ctaCheckout = "Finaliser ma demande";
  static readonly ctaContinue = "Continuer mes achats";
}

export default function CartSidebar() {
  const { state, dispatch } = useStore();

  if (!state.isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-[rgba(123,182,255,0.22)] backdrop-blur-md animate-fade-in"
        onClick={() => dispatch({ type: "TOGGLE_CART" })}
      />
      <div className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-md bg-white shadow-2xl flex flex-col animate-fade-in">
        {/* Header */}
        <div className="relative px-6 py-5 text-white overflow-hidden bg-gradient-to-br from-[var(--neon-violet)] via-[var(--neon-magenta)] to-[var(--neon-rose)]">
          <div className="aurora opacity-50" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[10px] tracking-[0.32em] uppercase text-white/70">
                Mon panier
              </p>
              <h2 className="text-xl font-semibold mt-0.5">
                {CartSidebarConfig.title}
                <span className="text-white/70 font-normal"> · {state.itemCount}</span>
              </h2>
            </div>
            <button
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="w-9 h-9 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>
          </div>
        </div>



        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="w-20 h-20 grid place-items-center rounded-full bg-gradient-to-br from-[var(--neon-violet)]/15 to-[var(--neon-cyan)]/15">
                <ShoppingBag size={36} className="text-[var(--neon-violet)]" strokeWidth={1.5} />
              </span>
              <p className="mt-5 text-lg font-semibold text-ink">
                {CartSidebarConfig.emptyMessage}
              </p>
              <p className="text-sm text-muted mt-2 max-w-xs">
                {CartSidebarConfig.emptySubtext}
              </p>
              <Link
                href="/collections/all"
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
                className="btn-primary mt-7"
              >
                Explorer la collection
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {state.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-none border border-[var(--neon-violet)]/10 bg-white shadow-sm"
                >
                  <div className="w-20 h-20 rounded-none overflow-hidden bg-[#f0f8ff] shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--neon-violet)] font-semibold">
                          {item.product.brand}
                        </p>
                        <p className="text-sm font-semibold text-ink truncate">
                          {item.product.name}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE_FROM_CART", productId: item.product.id })
                        }
                        className="text-muted hover:text-[var(--neon-rose)] transition-colors"
                        aria-label="Retirer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    {(item.selectedColor || item.selectedSize) && (
                      <p className="text-xs text-muted mt-1">
                        {[item.selectedColor, item.selectedSize].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="inline-flex items-center rounded-full bg-[#f0f8ff] p-0.5">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_QUANTITY",
                              productId: item.product.id,
                              quantity: item.quantity - 1,
                            })
                          }
                          className="w-7 h-7 grid place-items-center rounded-full hover:bg-white text-ink-soft"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm text-ink font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_QUANTITY",
                              productId: item.product.id,
                              quantity: item.quantity + 1,
                            })
                          }
                          className="w-7 h-7 grid place-items-center rounded-full hover:bg-white text-ink-soft"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-xs text-muted uppercase tracking-[0.18em]">
                        Sur devis
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-[var(--neon-violet)]/10 px-6 py-5 space-y-3 bg-white">
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-[var(--neon-emerald)]" />
                Paiement sécurisé
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles size={12} className="text-[var(--neon-amber)]" />
                Conseil expert
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-[0.22em] uppercase text-muted">
                Articles
              </span>
              <span className="text-2xl font-semibold text-ink">
                {state.itemCount}
              </span>
            </div>
            <button className="btn-primary w-full">{CartSidebarConfig.ctaCheckout}</button>
            <button
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="w-full py-3 text-xs tracking-[0.22em] uppercase text-muted hover:text-[var(--neon-violet)] transition-colors"
            >
              {CartSidebarConfig.ctaContinue}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
