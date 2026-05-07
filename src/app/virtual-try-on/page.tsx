"use client";

import { Camera, Upload, RotateCcw, Monitor, Smartphone, ScanFace, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { allProducts } from "@/lib/data";

export class VirtualTryOnConfig {
  static readonly title = "Essai Virtuel 3D";
  static readonly subtitle =
    "Notre miroir intelligent superpose la monture sur votre visage en temps rÃ©el. Aucun tÃ©lÃ©chargement requis.";
  static readonly modes = [
    { key: "webcam", icon: "camera", label: "Webcam en direct" },
    { key: "photo", icon: "upload", label: "Importer une photo" },
  ] as const;
}

export default function VirtualTryOnPage() {
  const [selectedProduct, setSelectedProduct] = useState(allProducts[0]?.id ?? "");
  const [mode, setMode] = useState<"webcam" | "photo">("webcam");
  const product = allProducts.find((p) => p.id === selectedProduct);

  const tryOnProducts = allProducts.slice(0, 16);
  const iconMap = { camera: Camera, upload: Upload };

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Essai Virtuel")]} />

        <div className="text-center mt-6 mb-10">
          <p className="section-eyebrow text-ink-soft justify-center">
            <ScanFace size={14} className="text-[var(--neon-cyan)]" />
            {VirtualTryOnConfig.title}
          </p>
          <h1 className="mt-4 text-4xl lg:text-6xl font-light text-ink leading-[1.05]">
            Essayez avant <span className="gradient-text font-semibold">d&apos;acheter</span>
          </h1>
          <p className="mt-3 text-ink-soft max-w-2xl mx-auto">
            {VirtualTryOnConfig.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-7">
          {/* Camera Preview */}
          <div>
            <div className="flex gap-2 mb-4">
              {VirtualTryOnConfig.modes.map((m) => {
                const Icon = iconMap[m.icon as keyof typeof iconMap];
                return (
                  <button
                    key={m.key}
                    onClick={() => setMode(m.key)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[0.2em] uppercase font-semibold transition-all ${
                      mode === m.key
                        ? "text-white bg-gradient-to-r from-[var(--neon-violet)] to-[var(--neon-magenta)] shadow-lg shadow-[var(--neon-violet)]/30"
                        : "text-ink-soft border border-[var(--neon-violet)]/15 hover:border-[var(--neon-violet)]/40"
                    }`}
                  >
                    <Icon size={14} />
                    {m.label}
                  </button>
                );
              })}
            </div>

            <div className="relative aspect-[4/3] rounded-none overflow-hidden bg-gradient-to-br from-[#e0f5f5] via-white to-[#d0f0f0] border border-[var(--neon-violet)]/20">
              <div className="aurora opacity-40" />
              {/* Frame outline */}
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="w-72 h-44 rounded-[2.5rem] border border-[var(--neon-violet)]/30 relative animate-pulse-glow">
                  <div className="absolute -inset-2 rounded-none border border-[var(--neon-violet)]/15" />
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-ink">
                {mode === "webcam" ? (
                  <>
                    <Camera size={44} className="mb-4 text-[var(--neon-cyan)]" strokeWidth={1.5} />
                    <p className="text-base">Miroir intelligent prÃªt</p>
                    <p className="text-xs text-ink-soft mb-5">Cliquez pour activer la webcam</p>
                    <button className="btn-primary">
                      <Sparkles size={14} />
                      Activer ma camÃ©ra
                    </button>
                  </>
                ) : (
                  <>
                    <Upload size={44} className="mb-4 text-[var(--neon-magenta)]" strokeWidth={1.5} />
                    <p className="text-base">Photo de face recommandÃ©e</p>
                    <p className="text-xs text-ink-soft mb-5">JPG ou PNG Â· max 10 Mo</p>
                    <label className="btn-primary cursor-pointer">
                      <Upload size={14} />
                      Choisir un fichier
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  </>
                )}
              </div>

              <div className="absolute bottom-4 left-4 flex gap-2">
                {[Monitor, Smartphone, RotateCcw].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 grid place-items-center rounded-full bg-white/80 hover:bg-white text-ink transition-colors"
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>

              {product && (
                <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/85 backdrop-blur text-ink text-xs">
                  <span className="w-2 h-2 rounded-full bg-[var(--neon-emerald)] animate-pulse" />
                  Monture active : <span className="font-semibold">{product.name}</span>
                </div>
              )}
            </div>

            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {[
                {
                  title: "100% privÃ©",
                  text: "Aucune photo envoyÃ©e Ã  un serveur. Tout reste sur votre appareil.",
                  color: "var(--neon-emerald)",
                },
                {
                  title: "PrÃ©cision IA",
                  text: "DÃ©tection des points clÃ©s du visage pour un rendu rÃ©aliste.",
                  color: "var(--neon-cyan)",
                },
                {
                  title: "Toutes les montures",
                  text: "Plus de 16 modÃ¨les essayables instantanÃ©ment.",
                  color: "var(--neon-magenta)",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-none bg-white border border-[var(--neon-violet)]/10 p-4"
                >
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase font-semibold"
                    style={{ color: c.color }}
                  >
                    {c.title}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft leading-snug">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product selector */}
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-muted mb-3">
              Choisissez un modÃ¨le
            </p>
            <div className="grid grid-cols-2 gap-3 max-h-[640px] overflow-y-auto pr-1">
              {tryOnProducts.map((p) => {
                const active = selectedProduct === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p.id)}
                    className={`text-left rounded-none p-2 transition-all ${
                      active
                        ? "bg-gradient-to-br from-[var(--neon-violet)]/10 to-[var(--neon-cyan)]/10 ring-2 ring-[var(--neon-violet)]/40"
                        : "bg-white border border-[var(--neon-violet)]/10 hover:border-[var(--neon-violet)]/30"
                    }`}
                  >
                    <div className="aspect-square rounded-none overflow-hidden bg-[#f0fefe]">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] text-[var(--neon-violet)] mt-2 truncate">
                      {p.brand}
                    </p>
                    <p className="text-xs text-ink truncate font-medium">{p.name}</p>
                  </button>
                );
              })}
            </div>
            <Link
              href="/collections/all"
              className="mt-4 inline-flex items-center gap-1 text-xs tracking-[0.22em] uppercase font-semibold text-[var(--neon-violet)] hover:gap-2 transition-all"
            >
              Voir tous les modÃ¨les
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
