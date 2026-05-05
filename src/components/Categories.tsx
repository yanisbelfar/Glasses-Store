"use client";

import { categories, allProducts, categoryAccents } from "@/lib/data";
import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

export default function Categories() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f4f9ff] via-white to-[#e9f3ff]" />
      <div className="aurora opacity-60" />
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-ink">
        <div className="text-center mb-14">
          <p className="section-eyebrow text-ink-soft justify-center">
            <Compass size={14} className="text-[var(--neon-cyan)]" />
            Notre univers
          </p>
          <h2 className="mt-4 text-4xl lg:text-5xl xl:text-6xl font-light text-ink tracking-tight">
            Explorez par <span className="gradient-text font-semibold">catégorie</span>
          </h2>
          <p className="mt-4 text-ink-soft max-w-2xl mx-auto">
            Trois univers, trois langages visuels. Chaque catégorie est pensée pour révéler ce qui vous rend unique.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const accent = categoryAccents[cat.slug] ?? categoryAccents.all;
            const sample = allProducts
              .filter((p) => p.category.toLowerCase().includes(cat.slug))
              .slice(0, 4);

            return (
              <Link
                key={cat.id}
                href={`/collections/${cat.slug}`}
                className="group relative rounded-3xl overflow-hidden border border-[var(--neon-violet)]/15 bg-white/80 backdrop-blur-md transition-all hover:bg-white"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* glow background */}
                <div
                  className="absolute -inset-1 opacity-30 group-hover:opacity-60 blur-3xl pointer-events-none transition-opacity"
                  style={{
                    background: `radial-gradient(60% 60% at 30% 30%, ${accent.from}, transparent 60%), radial-gradient(60% 60% at 70% 70%, ${accent.to}, transparent 60%)`,
                  }}
                />

                <div className="relative p-7">
                  {/* image mosaic */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {sample.slice(0, 4).map((p, i) => (
                      <div
                        key={p.id}
                        className={`aspect-square rounded-xl overflow-hidden ${
                          i === 0 ? "row-span-2 col-span-1 aspect-auto h-full" : ""
                        }`}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="text-[10px] tracking-[0.3em] uppercase font-semibold"
                        style={{ color: accent.from }}
                      >
                        {accent.tag}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-ink">
                        {cat.name}
                      </h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        {cat.productCount} modèles
                      </p>
                    </div>
                    <span
                      className="w-12 h-12 grid place-items-center rounded-full text-white shadow-lg group-hover:rotate-45 transition-transform duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                        boxShadow: `0 12px 30px -10px ${accent.from}`,
                      }}
                    >
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
