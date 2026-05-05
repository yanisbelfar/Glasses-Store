"use client";

import { testimonials } from "@/lib/data";
import { Quote, Star, ShieldCheck } from "lucide-react";

const palette = [
  { from: "#22d3ee", to: "#3b82f6" },
  { from: "#f472b6", to: "#a855f7" },
  { from: "#fbbf24", to: "#fb7185" },
  { from: "#2ed68a", to: "#22d3ee" },
  { from: "#a855f7", to: "#ec4899" },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#04061a] via-[#0e0a2a] to-[#04061a] text-white" />
      <div className="aurora opacity-40" />
      <div className="noise opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="text-center mb-14">
          <p className="section-eyebrow text-white/70 justify-center">
            <ShieldCheck size={14} className="text-[var(--neon-emerald)]" />
            Témoignages clients
          </p>
          <h2 className="mt-4 text-4xl lg:text-5xl xl:text-6xl font-light text-white tracking-tight">
            Ils <span className="gradient-text font-semibold">nous adorent</span>.
          </h2>
          <p className="mt-3 text-white/60 max-w-2xl mx-auto">
            Plus de 5000 clients à travers l&apos;Algérie ont fait de New Look Optic leur opticien de confiance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const c = palette[i % palette.length];
            return (
              <div
                key={t.id}
                className="relative rounded-3xl overflow-hidden p-7 border border-white/10 bg-white/[0.04] backdrop-blur-md hover:bg-white/[0.07] transition-all"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30 blur-3xl pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                />
                <Quote
                  size={28}
                  className="text-white/20 mb-3"
                />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className="text-[var(--neon-amber)]"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-white/85 leading-relaxed text-sm italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-full grid place-items-center text-sm font-semibold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                    }}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-white/55 text-[11px] tracking-wider">
                      {t.city} {t.verified && "• Vérifié"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { v: "5000+", l: "Clients servis" },
            { v: "4.9/5", l: "Note moyenne" },
            { v: "60+", l: "Marques premium" },
            { v: "24-48h", l: "Livraison express" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl p-5 border border-white/10 bg-white/[0.03] text-center"
            >
              <p className="text-3xl font-semibold gradient-text">{s.v}</p>
              <p className="text-[11px] tracking-[0.22em] uppercase text-white/55 mt-1">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
