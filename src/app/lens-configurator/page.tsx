"use client";

import { useState } from "react";
import { lensOptions, allProducts } from "@/lib/data";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Layers, Shield, Monitor, Sun, Circle, Sparkles, Check, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  shield: Shield,
  monitor: Monitor,
  sun: Sun,
  circle: Circle,
  layers: Layers,
};

export default function LensConfiguratorPage() {
  const [selectedFrame, setSelectedFrame] = useState(allProducts[0]?.id ?? "");
  const [selectedLens, setSelectedLens] = useState<string[]>(["antireflet"]);
  const [coating, setCoating] = useState("classic");

  const frame = allProducts.find((p) => p.id === selectedFrame);

  const toggleLens = (id: string) => {
    setSelectedLens((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Configurateur verres")]} />

        <div className="text-center mt-6 mb-10">
          <p className="section-eyebrow text-ink-soft justify-center">
            <Layers size={14} className="text-[var(--neon-amber)]" />
            Configurateur Premium
          </p>
          <h1 className="mt-4 text-4xl lg:text-6xl font-light text-ink leading-[1.05]">
            Composez vos <span className="gradient-text-warm font-semibold">verres parfaits</span>
          </h1>
          <p className="mt-3 text-ink-soft max-w-2xl mx-auto">
            Choisissez la monture et ajoutez les traitements de verres pour un devis sur demande.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8">
          {/* Left: Frame chooser + Lens options */}
          <div className="space-y-7">
            <div className="rounded-3xl bg-white border border-[var(--neon-violet)]/15 p-6 shadow-md shadow-[var(--neon-violet)]/5">
              <p className="text-xs tracking-[0.25em] uppercase text-muted">
                1. Choisissez votre monture
              </p>
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[260px] overflow-y-auto pr-2">
                {allProducts.slice(0, 16).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedFrame(p.id)}
                    className={`rounded-xl border p-2 transition-all ${
                      selectedFrame === p.id
                        ? "border-[var(--neon-violet)] ring-2 ring-[var(--neon-violet)]/30 bg-[var(--neon-violet)]/4"
                        : "border-[var(--neon-violet)]/10 hover:border-[var(--neon-violet)]/30"
                    }`}
                  >
                    <div className="aspect-square rounded-lg bg-[#f5f7ff] overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] text-muted mt-1 truncate">{p.brand}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-[var(--neon-violet)]/15 p-6 shadow-md shadow-[var(--neon-violet)]/5">
              <p className="text-xs tracking-[0.25em] uppercase text-muted">
                2. Choisissez vos traitements
              </p>
              <div className="mt-4 space-y-3">
                {lensOptions.map((opt) => {
                  const Icon = iconMap[opt.icon] ?? Circle;
                  const active = selectedLens.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleLens(opt.id)}
                      className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                        active
                          ? "border-[var(--neon-violet)] bg-[var(--neon-violet)]/5"
                          : "border-[var(--neon-violet)]/10 hover:border-[var(--neon-violet)]/30"
                      }`}
                    >
                      <span
                        className={`w-11 h-11 grid place-items-center rounded-xl ${
                          active
                            ? "bg-gradient-to-br from-[var(--neon-violet)] to-[var(--neon-magenta)] text-white"
                            : "bg-[#f5f7ff] text-[var(--neon-violet)]"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-ink">{opt.name}</p>
                        <p className="text-xs text-muted leading-snug">{opt.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-ink">
                          {opt.price === 0 ? "Inclus" : "Sur devis"}
                        </p>
                        {active && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[var(--neon-emerald)] tracking-wider uppercase font-semibold mt-0.5">
                            <Check size={11} /> Ajouté
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-[var(--neon-violet)]/15 p-6 shadow-md shadow-[var(--neon-violet)]/5">
              <p className="text-xs tracking-[0.25em] uppercase text-muted">
                3. Finition de monture
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { id: "classic", label: "Standard", price: 0, desc: "Finition d'origine" },
                  {
                    id: "premium",
                    label: "Premium",
                    price: 3500,
                    desc: "Polish et ajustement sur-mesure",
                  },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCoating(c.id)}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      coating === c.id
                        ? "border-[var(--neon-amber)] bg-[var(--neon-amber)]/8"
                        : "border-[var(--neon-violet)]/10 hover:border-[var(--neon-amber)]/40"
                    }`}
                  >
                    <p className="font-semibold text-ink">{c.label}</p>
                    <p className="text-xs text-muted">{c.desc}</p>
                    <p className="mt-2 text-sm font-semibold text-[var(--neon-amber)]">
                      {c.price === 0 ? "Inclus" : "Sur devis"}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="rounded-3xl overflow-hidden border border-[var(--neon-violet)]/15 bg-gradient-to-br from-[#e9f3ff] via-white to-[#dfeeff] text-ink shadow-2xl shadow-[var(--neon-violet)]/15">
              <div className="aurora opacity-40" />
              <div className="relative p-7">
                <p className="text-xs tracking-[0.3em] uppercase text-ink-soft">
                  Récapitulatif
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Votre paire sur-mesure</h2>

                {frame && (
                  <div className="mt-6 flex gap-4 items-center">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/80 border border-[var(--neon-violet)]/15">
                      <img src={frame.image} alt={frame.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] tracking-[0.22em] uppercase text-[var(--neon-cyan)]">
                        {frame.brand}
                      </p>
                      <p className="font-semibold truncate">{frame.name}</p>
                      <p className="text-sm text-ink-soft">Devis sur demande</p>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-2 border-t border-[var(--neon-violet)]/15 pt-5">
                  <p className="text-[11px] tracking-[0.22em] uppercase text-ink-soft">
                    Traitements ({selectedLens.length})
                  </p>
                  {lensOptions
                    .filter((l) => selectedLens.includes(l.id))
                    .map((l) => (
                      <div key={l.id} className="flex justify-between text-sm">
                        <span className="text-ink">{l.name}</span>
                        <span className="text-ink">
                          {l.price === 0 ? "Inclus" : "Sur devis"}
                        </span>
                      </div>
                    ))}
                  {coating === "premium" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-ink">Finition Premium</span>
                      <span className="text-ink">Sur devis</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-5 border-t border-[var(--neon-violet)]/15 flex items-center justify-between">
                  <p className="text-sm text-ink-soft inline-flex items-center gap-2">
                    <Sparkles size={14} className="text-[var(--neon-amber)]" />
                    Devis
                  </p>
                  <p className="text-lg font-semibold text-ink">
                    Sur demande
                  </p>
                </div>

                <a
                  href={`https://wa.me/213555852457?text=${encodeURIComponent(
                    `Bonjour, je souhaite commander la monture ${frame?.name} avec les options ${lensOptions
                      .filter((l) => selectedLens.includes(l.id))
                      .map((l) => l.name)
                      .join(", ")}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full mt-7"
                >
                  Envoyer ma config sur WhatsApp
                  <ArrowRight size={14} />
                </a>
                <p className="text-[11px] text-center text-ink-soft mt-3">
                  Devis sans engagement · Réponse en 30 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
