"use client";

import { useState, useRef, useEffect } from "react";
import { X, Search, ArrowRight, Sparkles, Layers, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { allProducts, brands } from "@/lib/data";

export class SearchController {
  static readonly placeholder = "Rechercher une monture, une marque, une forme...";
  static readonly popularSearches = [
    "Helen Keller",
    "Horien",
    "Aviator",
    "Soleil",
    "Oversize",
    "Pilote",
    "Carré",
    "Rond",
  ];

  static search(query: string) {
    const q = query.toLowerCase();
    return allProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shape?.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }

  static searchBrands(query: string) {
    const q = query.toLowerCase();
    return brands.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 6);
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isSearchOpen]);

  if (!state.isSearchOpen) return null;

  const results = query.length >= 2 ? SearchController.search(query) : [];
  const brandResults = query.length >= 2 ? SearchController.searchBrands(query) : [];

  const close = () => {
    dispatch({ type: "TOGGLE_SEARCH" });
    setQuery("");
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="absolute inset-0 -z-10">
        <div className="aurora opacity-25" />
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-10 pb-20">
        <div className="flex items-center justify-between mb-8">
          <span className="section-eyebrow text-ink-soft">
            <Search size={14} className="text-[var(--neon-violet)]" />
            Recherche intelligente
          </span>
          <button
            onClick={close}
            className="w-10 h-10 grid place-items-center rounded-full border border-ink/10 text-ink hover:text-[var(--neon-rose)] hover:border-[var(--neon-rose)] transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative">
          <Search
            size={22}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--neon-violet)]"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={SearchController.placeholder}
            className="w-full pl-14 pr-4 py-5 text-xl lg:text-2xl font-light text-ink rounded-none border-2 border-[var(--neon-violet)]/15 focus:border-[var(--neon-violet)] outline-none placeholder:text-muted/60 bg-white shadow-xl shadow-[var(--neon-violet)]/10 transition-colors"
          />
        </div>

        <div className="mt-10">
          {query.length < 2 ? (
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted mb-4 inline-flex items-center gap-2">
                <Sparkles size={12} />
                Recherches populaires
              </p>
              <div className="flex flex-wrap gap-2">
                {SearchController.popularSearches.map((term, i) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      i % 4 === 0
                        ? "border-[var(--neon-violet)]/25 text-[var(--neon-violet)] hover:bg-[var(--neon-violet)]/8"
                        : i % 4 === 1
                        ? "border-[var(--neon-cyan)]/25 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/8"
                        : i % 4 === 2
                        ? "border-[var(--neon-rose)]/25 text-[var(--neon-rose)] hover:bg-[var(--neon-rose)]/8"
                        : "border-[var(--neon-amber)]/30 text-[var(--neon-amber)] hover:bg-[var(--neon-amber)]/8"
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="mt-12 grid sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: Layers,
                    title: "Catégories",
                    text: "Homme · Femme · Enfant",
                    color: "var(--neon-violet)",
                    href: "/collections/all",
                  },
                  {
                    icon: Tag,
                    title: "Marques",
                    text: `${brands.length}+ griffes`,
                    color: "var(--neon-magenta)",
                    href: "/marques",
                  },
                  {
                    icon: Sparkles,
                    title: "Essai virtuel",
                    text: "Testez en 3D",
                    color: "var(--neon-cyan)",
                    href: "/virtual-try-on",
                  },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <Link
                      key={c.title}
                      href={c.href}
                      onClick={close}
                      className="group rounded-none p-5 border border-[var(--neon-violet)]/10 bg-white transition-all"
                    >
                      <div
                        className="w-10 h-10 grid place-items-center rounded-full text-white mb-3"
                        style={{
                          background: `linear-gradient(135deg, ${c.color}, var(--neon-rose))`,
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <p className="font-semibold text-ink">{c.title}</p>
                      <p className="text-sm text-muted">{c.text}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {brandResults.length > 0 && (
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-muted mb-4">
                    Marques · {brandResults.length}
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {brandResults.map((b) => (
                      <Link
                        key={b.id}
                        href={`/collections/all?brand=${encodeURIComponent(b.name)}`}
                        onClick={close}
                        className="group flex items-center gap-3 p-4 rounded-none border border-[var(--neon-violet)]/15 hover:border-[var(--neon-violet)]/40 hover:bg-[var(--neon-violet)]/5 transition-all"
                      >
                        <div className="relative w-14 h-14 rounded-none bg-[#f0fefe] grid place-items-center overflow-hidden">
                          <Image
                            src={b.logo}
                            alt={b.name}
                            width={120}
                            height={50}
                            className="max-w-[80%] max-h-[60%] object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-ink truncate group-hover:text-[var(--neon-violet)]">
                            {b.name}
                          </p>
                          <p className="text-xs text-muted">Voir la collection</p>
                        </div>
                        <ArrowRight
                          size={16}
                          className="ml-auto text-muted group-hover:text-[var(--neon-violet)] group-hover:translate-x-1 transition-all"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.length > 0 && (
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-muted mb-4">
                    Produits · {results.length}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {results.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        onClick={close}
                        className="group block rounded-none overflow-hidden bg-white border border-[var(--neon-violet)]/10 transition-all"
                      >
                        <div className="aspect-square bg-[#f0fefe] overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3">
                          <p className="text-[10px] tracking-[0.18em] uppercase text-[var(--neon-violet)] font-semibold">
                            {p.brand}
                          </p>
                          <p className="text-sm text-ink truncate font-medium">
                            {p.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.length === 0 && brandResults.length === 0 && (
                <div className="text-center py-16">
                  <span className="inline-block w-16 h-16 rounded-full bg-[var(--neon-rose)]/10 grid place-items-center text-[var(--neon-rose)]">
                    <Search size={24} />
                  </span>
                  <p className="text-ink-soft mt-4 text-lg">
                    Aucun résultat pour <span className="font-semibold gradient-text">{query}</span>
                  </p>
                  <p className="text-sm text-muted mt-1">
                    Essayez avec un autre mot ou consultez nos collections.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
