"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { allProducts, categories, brands, categoryAccents, Brand } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X, Sparkles, ChevronDown } from "lucide-react";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

type SidebarProps = {
  selectedShapes: string[];
  setSelectedShapes: (v: string[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (v: string[]) => void;
  selectedMaterials: string[];
  setSelectedMaterials: (v: string[]) => void;
  selectedGenders: string[];
  setSelectedGenders: (v: string[]) => void;
  brands: Brand[];
  activeCount: number;
  clearFilters: () => void;
};

function FiltersSidebar(props: SidebarProps) {
  const {
    selectedShapes, setSelectedShapes,
    selectedBrands, setSelectedBrands,
    selectedMaterials, setSelectedMaterials,
    selectedGenders, setSelectedGenders,
    brands, activeCount, clearFilters,
  } = props;

  const toggle = (list: string[], item: string, setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const groups = [
    { title: "Forme", list: CollectionFilterConfig.shapes, sel: selectedShapes, setter: setSelectedShapes, color: "var(--neon-violet)" },
    { title: "Matière", list: CollectionFilterConfig.materials, sel: selectedMaterials, setter: setSelectedMaterials, color: "var(--neon-cyan)" },
  ];

  return (
    <div className="space-y-7">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: group.color }}>
            {group.title}
          </p>
          <div className="space-y-1.5">
            {group.list.map((item) => (
              <label key={item} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={group.sel.includes(item)}
                  onChange={() => toggle(group.sel, item, group.setter)}
                  className="w-4 h-4 rounded accent-[var(--neon-violet)]"
                />
                <span className="text-sm text-ink-soft group-hover:text-[var(--neon-violet)] transition-colors">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div>
        <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-3 text-[var(--neon-rose)]">
          Genre
        </p>
        <div className="space-y-1.5">
          {CollectionFilterConfig.genders.map((g) => (
            <label key={g.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedGenders.includes(g.value)}
                onChange={() => toggle(selectedGenders, g.value, setSelectedGenders)}
                className="w-4 h-4 rounded accent-[var(--neon-rose)]"
              />
              <span className="text-sm text-ink-soft group-hover:text-[var(--neon-rose)] transition-colors">
                {g.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-3 text-[var(--neon-magenta)]">
          Marque
        </p>
        <div className="max-h-72 overflow-y-auto pr-1 space-y-1.5">
          {brands.map((b) => (
            <label key={b.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b.name)}
                onChange={() => toggle(selectedBrands, b.name, setSelectedBrands)}
                className="w-4 h-4 rounded accent-[var(--neon-magenta)]"
              />
              <span className="text-sm text-ink-soft group-hover:text-[var(--neon-magenta)] transition-colors truncate">
                {b.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {activeCount > 0 && (
        <button
          onClick={clearFilters}
          className="text-xs tracking-[0.22em] uppercase font-semibold text-[var(--neon-rose)] hover:underline"
        >
          Effacer ({activeCount})
        </button>
      )}
    </div>
  );
}

export class CollectionFilterConfig {
  static readonly shapes = ["Aviator", "Carré", "Rond", "Rectangulaire", "Pilote", "Oversize", "Browline", "Papillon"];
  static readonly materials = ["Métal", "Acétate", "Acétate/Métal", "O-Matter"];
  static readonly genders = [
    { value: "homme", label: "Homme" },
    { value: "femme", label: "Femme" },
    { value: "enfant", label: "Enfant" },
    { value: "unisexe", label: "Unisexe" },
  ];
  static readonly sortOptions = [
    { value: "featured", label: "En vedette" },
    { value: "name", label: "Nom A → Z" },
  ];
}

export default function CollectionPageClient({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const initialShape = searchParams.get("shape");
  const initialBrand = searchParams.get("brand");

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedShapes, setSelectedShapes] = useState<string[]>(
    initialShape ? [initialShape] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrand ? [initialBrand] : []
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const category = categories.find((c) => c.slug === slug);
  const isAll = slug === "all";
  const title = isAll ? "Toutes les Collections" : category?.name ?? "Collection";
  const accent = categoryAccents[slug] ?? categoryAccents.all;

  const filtered = useMemo(() => {
    const activeCategory = categories.find((c) => c.slug === slug);
    let products = allProducts.slice();

    if (!isAll && activeCategory) {
      const targetLabel = activeCategory.name
        .replace("Lunettes de ", "")
        .replace("Lunettes ", "")
        .toLowerCase();
      products = products.filter(
        (p) =>
          p.category.toLowerCase() === targetLabel ||
          p.category.toLowerCase() === slug.toLowerCase()
      );
    }
    if (selectedShapes.length > 0) products = products.filter((p) => p.shape && selectedShapes.includes(p.shape));
    if (selectedBrands.length > 0) products = products.filter((p) => p.brand && selectedBrands.includes(p.brand));
    if (selectedMaterials.length > 0) products = products.filter((p) => p.material && selectedMaterials.includes(p.material));
    if (selectedGenders.length > 0) products = products.filter((p) => p.gender && selectedGenders.includes(p.gender));

    switch (sortBy) {
      case "name":
        products = [...products].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return products;
  }, [slug, isAll, selectedShapes, selectedBrands, selectedMaterials, selectedGenders, sortBy]);

  const activeCount =
    selectedShapes.length + selectedBrands.length + selectedMaterials.length + selectedGenders.length;

  const clearFilters = () => {
    setSelectedShapes([]);
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setSelectedGenders([]);
  };

  const sidebarProps: SidebarProps = {
    selectedShapes,
    setSelectedShapes,
    selectedBrands,
    setSelectedBrands,
    selectedMaterials,
    setSelectedMaterials,
    selectedGenders,
    setSelectedGenders,
    brands,
    activeCount,
    clearFilters,
  };

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      {/* Hero banner */}
      <section className="relative overflow-hidden py-14">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(135deg, ${accent.from}22, ${accent.to}22), #fafbff`,
          }}
        />
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[new BreadcrumbItem(title)]} />
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mt-4">
            <div>
              <p
                className="section-eyebrow"
                style={{ color: accent.from }}
              >
                <Sparkles size={14} />
                {accent.tag}
              </p>
              <h1 className="mt-3 text-4xl lg:text-6xl font-light text-ink leading-[1.05]">
                {title}
              </h1>
              <p className="mt-2 text-sm text-ink-soft">
                {filtered.length} produit{filtered.length !== 1 ? "s" : ""} disponibles
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--neon-violet)]/20 text-sm text-ink-soft hover:border-[var(--neon-violet)] hover:text-[var(--neon-violet)] transition-colors"
              >
                <SlidersHorizontal size={16} />
                Filtres {activeCount > 0 && `(${activeCount})`}
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-9 py-2.5 rounded-full border border-[var(--neon-violet)]/20 text-sm text-ink-soft bg-white outline-none focus:border-[var(--neon-violet)]"
                >
                  {CollectionFilterConfig.sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0 sticky top-32 self-start">
            <div className="rounded-3xl border border-[var(--neon-violet)]/15 bg-white p-5 shadow-md shadow-[var(--neon-violet)]/5">
              <FiltersSidebar {...sidebarProps} />
            </div>
          </aside>

          {filtersOpen && (
            <>
              <div
                className="fixed inset-0 z-50 bg-[rgba(123,182,255,0.22)] backdrop-blur-md lg:hidden"
                onClick={() => setFiltersOpen(false)}
              />
              <div className="fixed top-0 left-0 bottom-0 z-50 w-80 bg-white p-6 overflow-y-auto lg:hidden animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm tracking-[0.2em] uppercase font-semibold text-ink">
                    Filtres
                  </span>
                  <button onClick={() => setFiltersOpen(false)}>
                    <X size={20} />
                  </button>
                </div>
                <FiltersSidebar {...sidebarProps} />
              </div>
            </>
          )}

          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-[var(--neon-violet)]/20 p-16 text-center">
                <p className="text-lg font-light text-ink">
                  Aucun produit ne correspond à vos filtres.
                </p>
                <button onClick={clearFilters} className="btn-ghost mt-5">
                  Réinitialiser
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p, i) => (
                  <div
                    key={p.id}
                    className="animate-float-up"
                    style={{ animationDelay: `${(i % 9) * 50}ms` }}
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
