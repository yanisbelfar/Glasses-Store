"use client";

import { testimonials } from "@/lib/data";
import { Quote, Star, ShieldCheck } from "lucide-react";

const palette = [
  { from: "#00d4d4", to: "#00c4c4" },
  { from: "#00b4b4", to: "#00c4c4" },
  { from: "#00c8b0", to: "#f59e0b" },
  { from: "#00d4d4", to: "#00b4b4" },
  { from: "#00c4c4", to: "#00c8b0" },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#e0f5f5] via-white to-[#d0f0f0]" />
      <div className="aurora opacity-40" />
      <div className="noise opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-ink">
        <div className="text-center mb-14">
          <p className="section-eyebrow text-ink-soft justify-center">
            <ShieldCheck size={14} className="text-[var(--neon-emerald)]" />
            Témoignages clients
          </p>
          <h2 className="mt-4 text-4xl lg:text-5xl xl:text-6xl font-light text-ink tracking-tight">
            Ils <span className="gradient-text font-semibold">nous adorent</span>.
          </h2>
          <p className="mt-3 text-ink-soft max-w-2xl mx-auto">
            Plus de 5000 clients à travers l&apos;Algérie ont fait de Newlook Optic Sidi Aiche leur opticien de confiance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const c = palette[i % palette.length];
            return (
              <div
                key={t.id}
                className="relative rounded-none overflow-hidden p-7 border border-[var(--neon-violet)]/10 bg-white/90 backdrop-blur-md hover:bg-white transition-all"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30 blur-3xl pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                />
                <Quote
                  size={28}
                  className="text-ink-soft mb-3"
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
                <p className="text-ink-soft leading-relaxed text-sm italic">
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
                    <p className="text-ink text-sm font-semibold">{t.name}</p>
                    <p className="text-ink-soft text-[11px] tracking-wider">
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
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-none p-5 border border-[var(--neon-violet)]/10 bg-white/90 text-center"
            >
              <p className="text-3xl font-semibold gradient-text">{s.v}</p>
              <p className="text-[11px] tracking-[0.22em] uppercase text-ink-soft mt-1">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
