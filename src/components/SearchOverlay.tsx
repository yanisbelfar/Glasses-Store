"use client";

import { useState, useRef, useEffect } from "react";
import { X, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { allProducts, brands } from "@/lib/data";

export class SearchController {
  static readonly placeholder = "Rechercher un produit, une marque...";
  static readonly popularSearches = ["Ray-Ban", "Aviator", "Solaire", "Gucci", "Optique"];

  static search(query: string) {
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shape?.toLowerCase().includes(q)
    ).slice(0, 6);
  }

  static searchBrands(query: string) {
    const q = query.toLowerCase();
    return brands.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 4);
  }
}

export default function SearchOverlay() {
  const { state, dispatch } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.isSearchOpen]);

  useEffect(() => {
    if (state.isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [state.isSearchOpen]);

  if (!state.isSearchOpen) return null;

  const results = query.length >= 2 ? SearchController.search(query) : [];
  const brandResults = query.length >= 2 ? SearchController.searchBrands(query) : [];

  return (
    <div className="fixed inset-0 z-[60] bg-white">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-stone-400">Recherche</span>
          <button
            onClick={() => { dispatch({ type: "TOGGLE_SEARCH" }); setQuery(""); }}
            className="p-2 text-charcoal hover:text-gold transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative border-b-2 border-charcoal">
          <Search size={20} className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={SearchController.placeholder}
            className="w-full pl-8 pr-4 py-4 text-2xl font-light text-charcoal bg-transparent outline-none placeholder:text-stone-300"
          />
        </div>

        {/* Results or Suggestions */}
        <div className="mt-8">
          {query.length < 2 ? (
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">
                Recherches populaires
              </p>
              <div className="flex flex-wrap gap-3">
                {SearchController.popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 border border-stone-200 text-sm text-stone-600 hover:border-gold hover:text-gold transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Brand Results */}
              {brandResults.length > 0 && (
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-3">Marques</p>
                  <div className="space-y-2">
                    {brandResults.map((b) => (
                      <Link
                        key={b.id}
                        href={`/collections/all?brand=${b.name}`}
                        onClick={() => { dispatch({ type: "TOGGLE_SEARCH" }); setQuery(""); }}
                        className="flex items-center justify-between py-2 text-charcoal hover:text-gold transition-colors"
                      >
                        <span className="text-lg font-light">{b.name}</span>
                        <ArrowRight size={16} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Results */}
              {results.length > 0 && (
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-3">Produits</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {results.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        onClick={() => { dispatch({ type: "TOGGLE_SEARCH" }); setQuery(""); }}
                        className="group block"
                      >
                        <div className="aspect-square bg-stone-100 mb-2" />
                        <p className="text-xs text-gold tracking-wider uppercase">{p.brand}</p>
                        <p className="text-sm font-light text-charcoal group-hover:text-gold transition-colors truncate">
                          {p.name}
                        </p>
                        <p className="text-sm text-stone-500">{p.formattedPrice}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.length === 0 && brandResults.length === 0 && (
                <p className="text-stone-400 text-center py-8">Aucun résultat pour &ldquo;{query}&rdquo;</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
