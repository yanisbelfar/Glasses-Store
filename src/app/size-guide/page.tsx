"use client";

import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { sizeGuide } from "@/lib/data";
import { Ruler, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

const accents = [
  { from: "#1fb9c3", to: "#009898" },
  { from: "#00b4b4", to: "#00c4c4" },
  { from: "#1aa99c", to: "#7cc8ff" },
  { from: "#00d4d4", to: "#00b4b4" },
  { from: "#009898", to: "#1aa99c" },
];

export default function SizeGuidePage() {
  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Guide des Tailles")]} />

        <div className="text-center mt-6 mb-12">
          <p className="section-eyebrow text-ink-soft justify-center">
            <Ruler size={14} className="text-[var(--neon-violet)]" />
            Guide
          </p>
          <h1 className="mt-4 text-4xl lg:text-6xl font-light text-ink leading-[1.05]">
            Trouvez la <span className="gradient-text font-semibold">taille parfaite</span>
          </h1>
          <p className="mt-3 text-ink-soft max-w-xl mx-auto">
            Forme du visage, largeur de monture, longueur de branche, tout ce qu&apos;il faut savoir
            pour choisir la monture qui vous met en valeur.
          </p>
        </div>

        {/* How to measure */}
        <section className="rounded-none bg-white border border-[var(--neon-violet)]/10 p-8 shadow-md shadow-[var(--neon-violet)]/5">
          <h2 className="text-2xl font-semibold text-ink">Comment mesurer ?</h2>
          <div className="mt-5 grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "Largeur de monture",
                text: "Mesurez d'une charnière à l'autre. C'est la mesure clé du confort.",
                color: "var(--neon-violet)",
              },
              {
                title: "Largeur de verre",
                text: "Diamètre horizontal du verre, indiqué sur la branche (ex: 52□18).",
                color: "var(--neon-cyan)",
              },
              {
                title: "Longueur branche",
                text: "De la charnière à l'extrémité, généralement 135 à 150 mm.",
                color: "var(--neon-rose)",
              },
            ].map((m) => (
              <div
                key={m.title}
                className="rounded-none border border-[var(--neon-violet)]/10 bg-[#f5fefe] p-5"
              >
                <p
                  className="text-[11px] tracking-[0.25em] uppercase font-semibold"
                  style={{ color: m.color }}
                >
                  {m.title}
                </p>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Face Shape Guide */}
        <section className="mt-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="section-eyebrow text-ink-soft">
                <Compass size={14} className="text-[var(--neon-rose)]" />
                Forme du visage
              </p>
              <h2 className="mt-2 text-2xl lg:text-3xl font-light text-ink">
                Forme du visage & monture recommandée
              </h2>
            </div>
            <Link href="/face-shape" className="btn-ghost hidden sm:inline-flex">
              Faire le quiz
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {sizeGuide.map((entry, i) => {
              const c = accents[i % accents.length];
              return (
                <div
                  key={entry.faceShape}
                  className="relative rounded-none overflow-hidden border border-[var(--neon-violet)]/10 bg-white p-6 transition-all"
                >
                  <div
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-25 blur-2xl"
                    style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                  />
                  <div className="relative">
                    <span
                      className="chip text-white"
                      style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                    >
                      Visage {entry.faceShape}
                    </span>
                    <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                      {entry.description}
                    </p>
                    <div className="mt-5">
                      <p
                        className="text-[10px] tracking-[0.25em] uppercase font-semibold"
                        style={{ color: c.from }}
                      >
                        Formes recommandées
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {entry.recommended.map((shape) => (
                          <span
                            key={shape}
                            className="px-2.5 py-1 rounded-full text-[11px] text-ink bg-[#f0fefe] border border-[var(--neon-violet)]/10"
                          >
                            {shape}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-muted">
                        Taille idéale : <span className="text-ink font-semibold">{entry.frameWidth}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-7 text-center sm:hidden">
            <Link href="/face-shape" className="btn-primary">
              Faire le quiz
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
