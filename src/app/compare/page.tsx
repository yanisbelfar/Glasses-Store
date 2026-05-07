"use client";

import { useState } from "react";
import { allProducts, Product } from "@/lib/data";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Link from "next/link";
import { GitCompareArrows, Plus, X, Check, Minus } from "lucide-react";

const MAX_COMPARE = 4;

const fields: { label: string; key: keyof Product }[] = [
  { label: "Marque", key: "brand" },
  { label: "Catégorie", key: "category" },
  { label: "Forme", key: "shape" },
  { label: "Matière", key: "material" },
  { label: "Verres", key: "lensType" },
  { label: "Largeur", key: "frameWidth" },
];

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(
    allProducts.slice(0, 2).map((p) => p.id)
  );
  const [pickerOpen, setPickerOpen] = useState(false);

  const items = selected
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const remove = (id: string) => setSelected((s) => s.filter((x) => x !== id));
  const add = (id: string) => {
    if (selected.length >= MAX_COMPARE || selected.includes(id)) return;
    setSelected((s) => [...s, id]);
    setPickerOpen(false);
  };

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Comparateur")]} />

        <div className="text-center mt-6 mb-10">
          <p className="section-eyebrow text-ink-soft justify-center">
            <GitCompareArrows size={14} className="text-[var(--neon-violet)]" />
            Comparateur
          </p>
          <h1 className="mt-4 text-4xl lg:text-6xl font-light text-ink leading-[1.05]">
            Comparez jusqu&apos;à <span className="gradient-text font-semibold">4 montures</span>
          </h1>
          <p className="mt-3 text-ink-soft max-w-xl mx-auto">
            Caractéristiques côte à côte pour faire le choix le plus éclairé.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-none border-2 border-dashed border-[var(--neon-violet)]/30 p-16 text-center">
            <p className="text-ink-soft mb-5">Sélectionnez au moins une monture pour démarrer.</p>
            <button onClick={() => setPickerOpen(true)} className="btn-primary">
              <Plus size={14} />
              Ajouter une monture
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr>
                  <th className="text-left p-4 text-xs tracking-[0.25em] uppercase text-muted w-44">
                    Critère
                  </th>
                  {items.map((p) => (
                    <th
                      key={p.id}
                      className="p-4 align-top text-left min-w-[220px]"
                    >
                      <div className="rounded-none bg-white border border-[var(--neon-violet)]/15 overflow-hidden shadow-md shadow-[var(--neon-violet)]/5">
                        <div className="aspect-square bg-[#f0f8ff] relative">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          <button
                            onClick={() => remove(p.id)}
                            className="absolute top-2 right-2 w-8 h-8 grid place-items-center rounded-full bg-white/90 text-[var(--neon-rose)] hover:bg-[var(--neon-rose)] hover:text-white transition-colors"
                            aria-label="Retirer"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="p-3">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--neon-violet)] font-semibold">
                            {p.brand}
                          </p>
                          <p className="text-sm font-semibold text-ink truncate">{p.name}</p>
                          <Link
                            href={`/products/${p.id}`}
                            className="text-[10px] tracking-[0.18em] uppercase text-muted hover:text-[var(--neon-violet)]"
                          >
                            Voir le détail →
                          </Link>
                        </div>
                      </div>
                    </th>
                  ))}
                  {items.length < MAX_COMPARE && (
                    <th className="p-4 align-top min-w-[180px]">
                      <button
                        onClick={() => setPickerOpen(true)}
                        className="w-full aspect-square rounded-none border-2 border-dashed border-[var(--neon-violet)]/30 grid place-items-center text-[var(--neon-violet)] hover:bg-[var(--neon-violet)]/5 hover:border-[var(--neon-violet)] transition-all"
                      >
                        <Plus size={28} />
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {fields.map((f, i) => (
                  <tr
                    key={f.label}
                    className={i % 2 === 0 ? "bg-[#f8f9ff]" : ""}
                  >
                    <td className="p-4 text-xs tracking-[0.18em] uppercase text-muted font-semibold">
                      {f.label}
                    </td>
                    {items.map((p) => {
                      const v =
                        f.key === "frameWidth"
                          ? p.frameWidth
                            ? `${p.frameWidth} mm`
                            : "N/A"
                          : (p[f.key] as string) ?? "N/A";
                      return (
                        <td key={p.id} className="p-4 text-sm text-ink font-medium">
                          {v}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="p-4 text-xs tracking-[0.18em] uppercase text-muted font-semibold">
                    Couleurs
                  </td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4">
                      <div className="flex gap-1">
                        {p.colors?.map((c) => (
                          <span
                            key={c.name}
                            className="w-4 h-4 rounded-full border border-white shadow"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-xs tracking-[0.18em] uppercase text-muted font-semibold">
                    Best Seller
                  </td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.badge === "best-seller" ? (
                        <Check size={16} className="text-[var(--neon-emerald)]" />
                      ) : (
                        <Minus size={16} className="text-muted" />
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {pickerOpen && (
          <>
            <div
              className="fixed inset-0 z-[60] bg-[rgba(123,182,255,0.22)] backdrop-blur-md"
              onClick={() => setPickerOpen(false)}
            />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] w-[92%] max-w-3xl max-h-[80vh] overflow-y-auto rounded-none bg-white shadow-2xl p-6 animate-scale-in">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs tracking-[0.3em] uppercase text-muted">
                  Ajouter une monture
                </p>
                <button
                  onClick={() => setPickerOpen(false)}
                  className="text-muted hover:text-[var(--neon-rose)]"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {allProducts
                  .filter((p) => !selected.includes(p.id))
                  .slice(0, 24)
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => add(p.id)}
                      className="text-left rounded-none border border-[var(--neon-violet)]/10 hover:border-[var(--neon-violet)]/40 transition-all p-2"
                    >
                      <div className="aspect-square rounded-none overflow-hidden bg-[#f0f8ff]">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[10px] text-[var(--neon-violet)] mt-2 truncate">
                        {p.brand}
                      </p>
                      <p className="text-xs text-ink truncate font-medium">{p.name}</p>
                    </button>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
