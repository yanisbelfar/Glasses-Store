"use client";

import Link from "next/link";
import {
  ScanFace,
  Compass,
  Layers,
  CalendarDays,
  GitCompareArrows,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: ScanFace,
    title: "Essayage virtuel 3D",
    description:
      "Testez n'importe quelle monture depuis chez vous grâce à votre webcam ou une simple photo.",
    href: "/virtual-try-on",
    cta: "Lancer l'essai",
    gradient: "linear-gradient(135deg, #06d3f7, #4f8cff)",
    glow: "rgba(6, 211, 247, 0.35)",
  },
  {
    icon: Compass,
    title: "Quiz forme du visage",
    description:
      "3 questions et nos experts vous proposent les montures qui flattent vraiment vos traits.",
    href: "/face-shape",
    cta: "Faire le quiz",
    gradient: "linear-gradient(135deg, #f472b6, #a855f7)",
    glow: "rgba(168, 85, 247, 0.35)",
  },
  {
    icon: Layers,
    title: "Configurateur verres",
    description:
      "Anti-reflet, bluelock, photochromique, progressifs — composez vos verres sur-mesure.",
    href: "/lens-configurator",
    cta: "Configurer",
    gradient: "linear-gradient(135deg, #fbbf24, #fb7185)",
    glow: "rgba(251, 191, 36, 0.35)",
  },
  {
    icon: CalendarDays,
    title: "Rendez-vous opticien",
    description:
      "Réservez un créneau en boutique pour un examen visuel complet et un conseil expert.",
    href: "/appointment",
    cta: "Réserver",
    gradient: "linear-gradient(135deg, #2ed68a, #06d3f7)",
    glow: "rgba(46, 214, 138, 0.35)",
  },
  {
    icon: GitCompareArrows,
    title: "Comparateur de montures",
    description:
      "Hésitation ? Comparez jusqu'à 4 modèles côte à côte : forme, matériau, taille.",
    href: "/compare",
    cta: "Comparer",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    glow: "rgba(139, 92, 246, 0.35)",
  },
];

export default function FeatureHighlights() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#fafbff] via-white to-[#fafbff]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="section-eyebrow text-ink-soft justify-center">
            <ScanFace size={14} className="text-[var(--neon-cyan)]" />
            L&apos;optique nouvelle génération
          </p>
          <h2 className="mt-4 text-4xl lg:text-5xl xl:text-6xl font-light text-ink tracking-tight leading-[1.05]">
            5 outils <span className="gradient-text font-semibold">intelligents</span>
            <br />
            pour bien choisir.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            const span = i === 0 ? "lg:col-span-2 lg:row-span-1" : i === 4 ? "lg:col-span-2" : "";
            return (
              <Link
                key={f.title}
                href={f.href}
                className={`group relative rounded-3xl overflow-hidden p-7 border border-[var(--neon-violet)]/10 bg-white transition-all ${span}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-30 blur-3xl group-hover:opacity-60 transition-opacity"
                  style={{ background: f.gradient }}
                />
                <div className="relative">
                  <span
                    className="w-12 h-12 grid place-items-center rounded-2xl text-white shadow-lg"
                    style={{ background: f.gradient, boxShadow: `0 16px 36px -12px ${f.glow}` }}
                  >
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs tracking-[0.22em] uppercase font-semibold text-[var(--neon-violet)] group-hover:gap-2 transition-all">
                    {f.cta}
                    <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
