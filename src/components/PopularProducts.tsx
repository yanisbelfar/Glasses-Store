"use client";

import { popularProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { useState } from "react";

const tabs = [
  { id: "all", label: "Tous" },
  { id: "Homme", label: "Homme" },
  { id: "Femme", label: "Femme" },
  { id: "Enfant", label: "Enfant" },
] as const;

export default function PopularProducts() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const filtered =
    tab === "all" ? popularProducts : popularProducts.filter((p) => p.category === tab);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-white" />
      <div
        className="glow-orb"
        style={{
          width: 380,
          height: 380,
          right: "-6%",
          top: "20%",
          background: "rgba(0, 160, 160, 0.18)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <p className="section-eyebrow text-ink-soft">
              <Flame size={14} className="text-[var(--neon-rose)]" />
              Tendances
            </p>
            <h2 className="mt-4 text-4xl lg:text-5xl xl:text-6xl font-light text-ink leading-[1.05]">
              Ce que <span className="gradient-text-warm font-semibold">tout le monde</span> commande
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 bg-[#f0f8ff] rounded-full">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold transition-all ${
                  tab === t.id
                    ? "text-white bg-gradient-to-r from-[var(--neon-violet)] to-[var(--neon-magenta)] shadow-md shadow-[var(--neon-violet)]/30"
                    : "text-ink-soft hover:text-[var(--neon-violet)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="animate-float-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted py-12">Aucun produit dans cette catégorie pour l&apos;instant.</p>
        )}

        <div className="mt-12 text-center">
          <Link href="/collections/all" className="btn-primary">
            Découvrir tous les produits <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
