"use client";

import { featuredProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#f5f7ff] to-white" />
      <div
        className="glow-orb"
        style={{
          width: 420,
          height: 420,
          left: "-8%",
          top: "10%",
          background: "rgba(139, 92, 246, 0.12)",
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 360,
          height: 360,
          right: "-6%",
          bottom: "-6%",
          background: "rgba(6, 211, 247, 0.12)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="section-eyebrow text-ink-soft">
              <Crown size={14} className="text-[var(--neon-amber)]" />
              Pièces d&apos;exception
            </p>
            <h2 className="mt-4 text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.05] text-ink">
              Les <span className="gradient-text font-semibold">stars</span> de la collection
            </h2>
            <p className="mt-4 text-ink-soft max-w-2xl">
              Une sélection rigoureuse des plus belles montures, repérées par nos opticiens parmi
              60+ marques pour leur qualité, leur style et leur confort.
            </p>
          </div>
          <Link
            href="/collections/all"
            className="hidden lg:inline-flex btn-ghost"
          >
            Tout voir
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredProducts.map((p, i) => (
            <div
              key={p.id}
              className="animate-float-up"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <ProductCard product={p} size="lg" />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center lg:hidden">
          <Link href="/collections/all" className="btn-ghost">
            Tout voir <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
