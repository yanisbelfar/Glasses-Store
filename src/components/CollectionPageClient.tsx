"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { allProducts, categories, brands } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Eye, Heart, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

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
    { value: "name", label: "A - Z" },
  ];
}

export default function CollectionPageClient({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const { state, dispatch } = useStore();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedShapes, setSelectedShapes] = useState<string[]>(
    searchParams.get("shape") ? [searchParams.get("shape")!] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get("brand") ? [searchParams.get("brand")!] : []
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const category = categories.find((c) => c.slug === slug);
  const isAll = slug === "all";
  const title = isAll ? "Tous les Produits" : category?.name ?? "Collection";

  const filtered = useMemo(() => {
    const activeCategory = categories.find((c) => c.slug === slug);
    let products = allProducts;

    // Filter by category
    if (!isAll && activeCategory) {
      products = products.filter((p) =>
        p.category.toLowerCase() === activeCategory.name.replace("Lunettes de ", "").replace("Lunettes ", "").toLowerCase() ||
        p.category.toLowerCase() === slug.toLowerCase()
      );
    }

    // Filter by shape
    if (selectedShapes.length > 0) {
      products = products.filter((p) => p.shape && selectedShapes.includes(p.shape));
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      products = products.filter((p) => p.brand && selectedBrands.includes(p.brand));
    }

    // Filter by material
    if (selectedMaterials.length > 0) {
      products = products.filter((p) => p.material && selectedMaterials.includes(p.material));
    }

    // Filter by gender
    if (selectedGenders.length > 0) {
      products = products.filter((p) => p.gender && selectedGenders.includes(p.gender));
    }

    // Sort
    switch (sortBy) {
      case "name":
        products = [...products].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return products;
  }, [slug, isAll, selectedShapes, selectedBrands, selectedMaterials, selectedGenders, sortBy]);

  const toggleFilter = (list: string[], item: string, setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const activeFilterCount = selectedShapes.length + selectedBrands.length + selectedMaterials.length + selectedGenders.length;

  const clearFilters = () => {
    setSelectedShapes([]);
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setSelectedGenders([]);
  };

  const renderFilterSidebar = () => (
    <div className="space-y-8">
      {/* Shapes */}
      <div>
        <h3 className="text-xs tracking-[0.2em] uppercase text-charcoal mb-3 font-medium">Forme</h3>
        <div className="space-y-2">
          {CollectionFilterConfig.shapes.map((shape) => (
            <label key={shape} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedShapes.includes(shape)}
                onChange={() => toggleFilter(selectedShapes, shape, setSelectedShapes)}
                className="accent-[var(--gold)] w-4 h-4"
              />
              <span className="text-sm text-stone-600 group-hover:text-gold transition-colors">{shape}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-xs tracking-[0.2em] uppercase text-charcoal mb-3 font-medium">Marque</h3>
        <div className="space-y-2">
          {brands.map((b) => (
            <label key={b.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b.name)}
                onChange={() => toggleFilter(selectedBrands, b.name, setSelectedBrands)}
                className="accent-[var(--gold)] w-4 h-4"
              />
              <span className="text-sm text-stone-600 group-hover:text-gold transition-colors">{b.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <h3 className="text-xs tracking-[0.2em] uppercase text-charcoal mb-3 font-medium">Matière</h3>
        <div className="space-y-2">
          {CollectionFilterConfig.materials.map((mat) => (
            <label key={mat} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedMaterials.includes(mat)}
                onChange={() => toggleFilter(selectedMaterials, mat, setSelectedMaterials)}
                className="accent-[var(--gold)] w-4 h-4"
              />
              <span className="text-sm text-stone-600 group-hover:text-gold transition-colors">{mat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <h3 className="text-xs tracking-[0.2em] uppercase text-charcoal mb-3 font-medium">Genre</h3>
        <div className="space-y-2">
          {CollectionFilterConfig.genders.map((g) => (
            <label key={g.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedGenders.includes(g.value)}
                onChange={() => toggleFilter(selectedGenders, g.value, setSelectedGenders)}
                className="accent-[var(--gold)] w-4 h-4"
              />
              <span className="text-sm text-stone-600 group-hover:text-gold transition-colors">{g.label}</span>
            </label>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-dark transition-colors"
        >
          Effacer les filtres ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[new BreadcrumbItem(title)]} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extralight text-charcoal tracking-tight">{title}</h1>
            <p className="text-sm text-stone-400 mt-1">{filtered.length} produit{filtered.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-stone-200 text-sm text-stone-600 hover:border-gold hover:text-gold transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filtres {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-stone-200 text-sm text-stone-600 bg-white outline-none focus:border-gold"
            >
              {CollectionFilterConfig.sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            {renderFilterSidebar()}
          </aside>

          {/* Mobile Filters Overlay */}
          {filtersOpen && (
            <>
              <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setFiltersOpen(false)} />
              <div className="fixed top-0 left-0 bottom-0 z-50 w-80 bg-white shadow-xl p-6 overflow-y-auto lg:hidden">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm tracking-[0.2em] uppercase text-charcoal">Filtres</span>
                  <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
                </div>
                {renderFilterSidebar()}
              </div>
            </>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-light text-stone-400">Aucun produit ne correspond à vos filtres.</p>
                <button onClick={clearFilters} className="mt-4 text-gold text-sm underline">
                  Effacer les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => {
                  const isWished = state.wishlist.includes(product.id);
                  return (
                    <div key={product.id} className="group relative">
                      <Link href={`/products/${product.id}`} className="block">
                        <div className="relative overflow-hidden bg-stone-100 aspect-square">
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-200 group-hover:from-stone-100 group-hover:to-stone-300 transition-colors duration-500">
                            <Eye size={36} className="text-stone-300 group-hover:text-gold/50 transition-colors duration-500" strokeWidth={1} />
                          </div>
                          {product.badge && (
                            <span className={`absolute top-3 left-3 px-2 py-1 text-[10px] tracking-[0.15em] uppercase ${
                              product.badge === "best-seller" ? "bg-gold text-white" :
                              product.badge === "nouveau" ? "bg-charcoal text-white" : "bg-stone-600 text-white"
                            }`}>
                              {product.badge === "best-seller" ? "★ Best Seller" : product.badge === "nouveau" ? "Nouveau" : "Tendance"}
                            </span>
                          )}
                        </div>
                      </Link>
                      {/* Quick actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => dispatch({ type: "TOGGLE_WISHLIST", productId: product.id })}
                          className="w-8 h-8 bg-white shadow flex items-center justify-center text-stone-400 hover:text-gold transition-colors"
                        >
                          <Heart size={14} fill={isWished ? "currentColor" : "none"} className={isWished ? "text-gold" : ""} />
                        </button>
                        <button
                          onClick={() => dispatch({ type: "OPEN_QUICK_VIEW", productId: product.id })}
                          className="w-8 h-8 bg-white shadow flex items-center justify-center text-stone-400 hover:text-gold transition-colors"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                      {/* Colors */}
                      {product.colors && product.colors.length > 1 && (
                        <div className="flex gap-1 mt-3">
                          {product.colors.map((c) => (
                            <span key={c.name} className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: c.hex }} title={c.name} />
                          ))}
                        </div>
                      )}
                      <div className="mt-2">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-gold">{product.brand}</p>
                        <p className="text-sm font-light text-charcoal group-hover:text-gold transition-colors truncate">{product.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
