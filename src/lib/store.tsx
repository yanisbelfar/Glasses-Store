"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import { Product } from "@/lib/data";

// ============================================
// Cart Classes
// ============================================

export class CartItem {
  constructor(
    public product: Product,
    public quantity: number,
    public selectedColor?: string,
    public selectedSize?: string,
  ) {}

  get total(): number {
    return this.product.price * this.quantity;
  }

  get formattedTotal(): string {
    return `${this.total.toLocaleString("fr-DZ")} DA`;
  }
}

export class CartState {
  constructor(
    public items: CartItem[] = [],
    public wishlist: string[] = [],
    public isCartOpen: boolean = false,
    public isSearchOpen: boolean = false,
    public isQuickViewOpen: boolean = false,
    public quickViewProductId: string | null = null,
    public recentlyViewed: string[] = [],
  ) {}

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  get formattedSubtotal(): string {
    return `${this.subtotal.toLocaleString("fr-DZ")} DA`;
  }

  get wishlistCount(): number {
    return this.wishlist.length;
  }
}

// ============================================
// Actions
// ============================================

type Action =
  | { type: "ADD_TO_CART"; product: Product; color?: string; size?: string }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "TOGGLE_WISHLIST"; productId: string }
  | { type: "TOGGLE_CART" }
  | { type: "TOGGLE_SEARCH" }
  | { type: "OPEN_QUICK_VIEW"; productId: string }
  | { type: "CLOSE_QUICK_VIEW" }
  | { type: "ADD_RECENTLY_VIEWED"; productId: string }
  | { type: "HYDRATE"; state: Partial<CartState> };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      );
      const items = existing
        ? state.items.map((i) =>
            i.product.id === action.product.id
              ? new CartItem(i.product, i.quantity + 1, i.selectedColor, i.selectedSize)
              : i
          )
        : [
            ...state.items,
            new CartItem(action.product, 1, action.color, action.size),
          ];
      return new CartState(items, state.wishlist, true, state.isSearchOpen, state.isQuickViewOpen, state.quickViewProductId, state.recentlyViewed);
    }
    case "REMOVE_FROM_CART": {
      const items = state.items.filter((i) => i.product.id !== action.productId);
      return new CartState(items, state.wishlist, state.isCartOpen, state.isSearchOpen, state.isQuickViewOpen, state.quickViewProductId, state.recentlyViewed);
    }
    case "UPDATE_QUANTITY": {
      const items = action.quantity <= 0
        ? state.items.filter((i) => i.product.id !== action.productId)
        : state.items.map((i) =>
            i.product.id === action.productId
              ? new CartItem(i.product, action.quantity, i.selectedColor, i.selectedSize)
              : i
          );
      return new CartState(items, state.wishlist, state.isCartOpen, state.isSearchOpen, state.isQuickViewOpen, state.quickViewProductId, state.recentlyViewed);
    }
    case "TOGGLE_WISHLIST": {
      const wishlist = state.wishlist.includes(action.productId)
        ? state.wishlist.filter((id) => id !== action.productId)
        : [...state.wishlist, action.productId];
      return new CartState(state.items, wishlist, state.isCartOpen, state.isSearchOpen, state.isQuickViewOpen, state.quickViewProductId, state.recentlyViewed);
    }
    case "TOGGLE_CART":
      return new CartState(state.items, state.wishlist, !state.isCartOpen, false, state.isQuickViewOpen, state.quickViewProductId, state.recentlyViewed);
    case "TOGGLE_SEARCH":
      return new CartState(state.items, state.wishlist, false, !state.isSearchOpen, state.isQuickViewOpen, state.quickViewProductId, state.recentlyViewed);
    case "OPEN_QUICK_VIEW":
      return new CartState(state.items, state.wishlist, state.isCartOpen, state.isSearchOpen, true, action.productId, state.recentlyViewed);
    case "CLOSE_QUICK_VIEW":
      return new CartState(state.items, state.wishlist, state.isCartOpen, state.isSearchOpen, false, null, state.recentlyViewed);
    case "ADD_RECENTLY_VIEWED": {
      const rv = [action.productId, ...state.recentlyViewed.filter((id) => id !== action.productId)].slice(0, 10);
      return new CartState(state.items, state.wishlist, state.isCartOpen, state.isSearchOpen, state.isQuickViewOpen, state.quickViewProductId, rv);
    }
    case "HYDRATE":
      return new CartState(
        action.state.items ?? state.items,
        action.state.wishlist ?? state.wishlist,
        state.isCartOpen,
        state.isSearchOpen,
        state.isQuickViewOpen,
        state.quickViewProductId,
        action.state.recentlyViewed ?? state.recentlyViewed,
      );
    default:
      return state;
  }
}

// ============================================
// Context
// ============================================

const StoreContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, new CartState());

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("newlookoptic-store");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "HYDRATE", state: parsed });
      }
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "newlookoptic-store",
        JSON.stringify({
          wishlist: state.wishlist,
          recentlyViewed: state.recentlyViewed,
        })
      );
    } catch {}
  }, [state.wishlist, state.recentlyViewed]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
