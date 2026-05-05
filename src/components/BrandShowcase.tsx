"use client";

import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/data";
import { ArrowRight, Crown } from "lucide-react";

export default function BrandShowcase() {
  // duplicate for seamless marquee
  const list = brands.slice(0, 16);

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#eef5ff] to-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="section-eyebrow text-ink-soft">
              <Crown size={14} className="text-[var(--neon-amber)]" />
              Nos griffes
            </p>
            <h2 className="mt-3 text-4xl lg:text-5xl font-light text-ink leading-[1.05]">
              <span className="gradient-text-warm font-semibold">60+ marques</span> que vous adorez
            </h2>
            <p className="mt-3 text-ink-soft max-w-xl">
              De Dior à Skechers en passant par GIVENCHY, KENZO et Polaroid, toutes les
              griffes que vous cherchez, vérifiées et 100% authentiques.
            </p>
          </div>
          <Link href="/marques" className="btn-ghost shrink-0">
            Toutes les marques
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* infinite marquee row 1 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="marquee-track py-2">
          {[...list, ...list].map((b, i) => (
            <Link
              key={`${b.id}-${i}`}
              href={`/collections/all?brand=${encodeURIComponent(b.name)}`}
              className="shrink-0 group"
            >
              <div className="w-44 h-24 rounded-2xl bg-white border border-[var(--neon-violet)]/10 grid place-items-center px-4 shadow-sm hover:shadow-lg hover:shadow-[var(--neon-violet)]/15 transition-all">
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={160}
                  height={60}
                  className="max-w-full max-h-12 object-contain opacity-80 group-hover:opacity-100"
                />
              </div>
              <p className="text-center text-[10px] tracking-[0.18em] uppercase text-muted mt-2">
                {b.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
