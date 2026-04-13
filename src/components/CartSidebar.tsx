"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";

export class CartSidebarConfig {
  static readonly title = "Votre Panier";
  static readonly emptyMessage = "Votre panier est vide";
  static readonly emptySubtext = "Découvrez nos collections et trouvez la monture parfaite.";
  static readonly ctaCheckout = "Commander";
  static readonly ctaContinue = "Continuer les achats";
  static readonly freeShippingThreshold = 50000;

  static getFreeShippingMessage(subtotal: number): string {
    if (subtotal >= this.freeShippingThreshold) {
      return "Livraison gratuite !";
    }
    const remaining = this.freeShippingThreshold - subtotal;
    return `Plus que ${remaining.toLocaleString("fr-DZ")} DA pour la livraison gratuite`;
  }
}

export default function CartSidebar() {
  const { state, dispatch } = useStore();

  if (!state.isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        onClick={() => dispatch({ type: "TOGGLE_CART" })}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200">
          <h2 className="text-sm tracking-[0.3em] uppercase text-charcoal">
            {CartSidebarConfig.title} ({state.itemCount})
          </h2>
          <button
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
            className="p-1 text-charcoal hover:text-gold transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Bar */}
        {state.items.length > 0 && (
          <div className="px-6 py-3 bg-cream">
            <p className="text-xs text-center text-stone-600">
              {CartSidebarConfig.getFreeShippingMessage(state.subtotal)}
            </p>
            <div className="mt-2 h-1 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-500"
                style={{
                  width: `${Math.min(100, (state.subtotal / CartSidebarConfig.freeShippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-stone-200 mb-4" strokeWidth={1} />
              <p className="text-lg font-light text-charcoal">{CartSidebarConfig.emptyMessage}</p>
              <p className="text-sm text-stone-400 mt-2">{CartSidebarConfig.emptySubtext}</p>
              <Link
                href="/collections/all"
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
                className="mt-6 px-6 py-3 bg-gold text-white text-xs tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors"
              >
                Explorer
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-stone-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gold tracking-wider uppercase">{item.product.brand}</p>
                        <p className="text-sm font-light text-charcoal truncate">{item.product.name}</p>
                      </div>
                      <button
                        onClick={() => dispatch({ type: "REMOVE_FROM_CART", productId: item.product.id })}
                        className="text-stone-400 hover:text-charcoal transition-colors shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    {(item.selectedColor || item.selectedSize) && (
                      <p className="text-xs text-stone-400 mt-1">
                        {[item.selectedColor, item.selectedSize].filter(Boolean).join(" / ")}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200">
                        <button
                          onClick={() => dispatch({ type: "UPDATE_QUANTITY", productId: item.product.id, quantity: item.quantity - 1 })}
                          className="px-2 py-1 text-stone-400 hover:text-charcoal transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm text-charcoal">{item.quantity}</span>
                        <button
                          onClick={() => dispatch({ type: "UPDATE_QUANTITY", productId: item.product.id, quantity: item.quantity + 1 })}
                          className="px-2 py-1 text-stone-400 hover:text-charcoal transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-sm font-light text-charcoal">{item.formattedTotal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-stone-200 px-6 py-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-sm tracking-wider uppercase text-stone-500">Sous-total</span>
              <span className="text-lg font-light text-charcoal">{state.formattedSubtotal}</span>
            </div>
            <button className="w-full py-4 bg-gold text-white text-sm tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors">
              {CartSidebarConfig.ctaCheckout}
            </button>
            <button
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="w-full py-3 text-sm tracking-[0.15em] uppercase text-stone-500 hover:text-charcoal transition-colors"
            >
              {CartSidebarConfig.ctaContinue}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
