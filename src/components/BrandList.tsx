"use client";

import { brands, allProducts } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

// Display alphabetical list of brand names with the count of frames per brand
export default function BrandList() {
  const list = brands.map((b) => {
    const items = allProducts.filter((p) => p.brand === b.name);
    return {
      ...b,
      count: items.length,
      cover: items.find((it) => it.image && !it.image.includes("placeholder"))?.image,
    };
  });

  // Group by first letter
  const groups = list.reduce<Record<string, typeof list>>((acc, b) => {
    const letter = b.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(b);
    return acc;
  }, {});
  const letters = Object.keys(groups).sort();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#f5fefe] to-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="section-eyebrow text-ink-soft">
            <span className="text-[var(--neon-violet)]">A → Z</span>
          </p>
          <h2 className="mt-4 text-3xl lg:text-4xl font-light text-ink leading-[1.05]">
            Index <span className="gradient-text font-semibold">complet</span> des marques
          </h2>
        </div>

        {/* Letter index */}
        <div className="flex flex-wrap gap-1.5 mb-10">
          {letters.map((l) => (
            <a
              key={l}
              href={`#letter-${l}`}
              className="w-9 h-9 rounded-full border border-[var(--neon-violet)]/20 grid place-items-center text-xs font-semibold text-[var(--neon-violet)] hover:bg-[var(--neon-violet)] hover:text-white transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="space-y-12">
          {letters.map((l) => (
            <div key={l} id={`letter-${l}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 grid place-items-center rounded-none bg-gradient-to-br from-[var(--neon-violet)] to-[var(--neon-magenta)] text-white text-sm font-semibold">
                  {l}
                </span>
                <span className="text-xs tracking-[0.3em] uppercase text-muted">
                  {groups[l].length} marques
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {groups[l].map((b) => (
                  <Link
                    key={b.id}
                    href={`/collections/all?brand=${encodeURIComponent(b.name)}`}
                    className="group flex items-center gap-3 p-4 rounded-none border border-[var(--neon-violet)]/10 hover:border-[var(--neon-violet)]/30 hover:bg-[var(--neon-violet)]/4 transition-all"
                  >
                    <div className="relative w-12 h-12 rounded-none bg-white grid place-items-center overflow-hidden border border-[var(--neon-violet)]/10">
                      {b.cover ? (
                        <img
                          src={b.cover}
                          alt={b.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={b.logo}
                          alt={b.name}
                          width={60}
                          height={30}
                          className="max-w-[80%] max-h-[60%] object-contain"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-ink truncate group-hover:text-[var(--neon-violet)]">
                        {b.name}
                      </p>
                      <p className="text-[11px] text-muted">{b.count} référence{b.count > 1 ? "s" : ""}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
