"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Send,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Camera,
  Sparkles,
  Layers,
  Ruler,
  Tag,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { allProducts, Product } from "@/lib/data";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export class ProductDetailConfig {
  static readonly whatsappNumber = "213555852457";
  static readonly requestSuccessMessage =
    "Vos données ont bien été envoyées. Vous recevrez une réponse dans les plus brefs délais.";

  static readonly guarantees = [
    { icon: "truck", label: "Livraison 24-48h", detail: "Express partout en Algérie", color: "var(--neon-cyan)" },
    { icon: "shield", label: "Garantie 2 ans", detail: "Produit 100% authentique", color: "var(--neon-emerald)" },
    { icon: "return", label: "Retour 14 jours", detail: "Satisfait ou remboursé", color: "var(--neon-amber)" },
  ];

  static getRelatedProducts(product: Product): Product[] {
    return allProducts
      .filter(
        (p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category)
      )
      .slice(0, 4);
  }

  static getWhatsAppLink(
    product: Product,
    frame: string,
    color?: string,
    size?: string
  ): string {
    const message = [
      "Nouvelle demande monture · New Look Optic",
      `Produit: ${product.name}`,
      `Marque: ${product.brand ?? "Non précisée"}`,
      `Monture indiquée: ${frame}`,
      `Couleur: ${color ?? "Non précisée"}`,
      `Taille: ${size ?? "Non précisée"}`,
    ].join("\n");

    return `https://wa.me/${ProductDetailConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
}

export default function ProductDetailClient({ id }: { id: string }) {
  const { state, dispatch } = useStore();
  const product = allProducts.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [frameInput, setFrameInput] = useState("");
  const [requestError, setRequestError] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "livraison" | "guide">("details");
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (product) {
      dispatch({ type: "ADD_RECENTLY_VIEWED", productId: product.id });
    }
  }, [product, dispatch]);

  if (!product) {
    return (
      <main className="flex-1 pt-32 text-center py-20">
        <p className="text-lg text-muted">Produit introuvable.</p>
        <Link href="/collections/all" className="btn-primary mt-5 inline-flex">
          Retour à la boutique
        </Link>
      </main>
    );
  }

  const isWished = state.wishlist.includes(product.id);
  const relatedProducts = ProductDetailConfig.getRelatedProducts(product);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const iconMap = { truck: Truck, shield: Shield, return: RotateCcw };

  const handleSendRequest = () => {
    const normalizedFrame = frameInput.trim();
    if (!normalizedFrame) {
      setRequestSent(false);
      setRequestError("Veuillez indiquer votre monture avant l'envoi.");
      return;
    }
    setRequestError("");
    setRequestSent(true);
    const url = ProductDetailConfig.getWhatsAppLink(
      product,
      normalizedFrame,
      product.colors?.[selectedColor]?.name,
      product.sizes?.[selectedSize]
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs
          items={[
            new BreadcrumbItem(product.category, `/collections/${product.category.toLowerCase()}`),
            new BreadcrumbItem(product.name),
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-4">
          {/* IMAGE GALLERY */}
          <div>
            <div
              className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#f5f7ff] via-white to-[#eef0ff] group cursor-zoom-in border border-[var(--neon-violet)]/10"
              onClick={() => setZoomed((z) => !z)}
            >
              {/* repeating mesh pattern */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, rgba(139,92,246,0.05) 0 1px, transparent 1px 24px)",
                }}
              />
              <img
                src={images[currentImage]}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                  zoomed ? "scale-150" : "group-hover:scale-105"
                }`}
              />
              {/* badges overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="chip text-white bg-gradient-to-r from-[var(--neon-violet)] to-[var(--neon-magenta)] shadow-lg">
                    {product.badge === "best-seller"
                      ? "★ Best Seller"
                      : product.badge === "nouveau"
                      ? "✦ Nouveau"
                      : "Tendance"}
                  </span>
                )}
                <span className="brand-pill">{product.brand}</span>
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage((currentImage - 1 + images.length) % images.length);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-full bg-white/85 backdrop-blur shadow-md hover:bg-white text-ink transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage((currentImage + 1) % images.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-full bg-white/85 backdrop-blur shadow-md hover:bg-white text-ink transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              <Link
                href="/virtual-try-on"
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[var(--neon-violet)] to-[var(--neon-magenta)] text-white text-xs tracking-[0.18em] uppercase font-semibold shadow-lg shadow-[var(--neon-violet)]/40 hover:scale-105 transition-transform"
              >
                <Camera size={14} />
                Essayer en 3D
              </Link>
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      currentImage === i
                        ? "border-[var(--neon-violet)] scale-105"
                        : "border-transparent hover:border-[var(--neon-violet)]/30"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--neon-violet)] font-semibold">
              {product.brand}
            </p>
            <h1 className="mt-1 text-3xl lg:text-5xl font-light text-ink leading-[1.05]">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold">
              {product.shape && (
                <span className="chip bg-[var(--neon-violet)]/10 text-[var(--neon-violet)]">
                  <Tag size={10} /> {product.shape}
                </span>
              )}
              {product.material && (
                <span className="chip bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)]">
                  <Layers size={10} /> {product.material}
                </span>
              )}
              {product.frameWidth && (
                <span className="chip bg-[var(--neon-amber)]/10 text-[var(--neon-amber)]">
                  <Ruler size={10} /> {product.frameWidth} mm
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-ink-soft mt-5 leading-relaxed">{product.description}</p>
            )}

            {/* Color */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-7">
                <p className="text-[11px] tracking-[0.22em] uppercase text-muted mb-3">
                  Couleur · <span className="text-ink font-semibold">{product.colors[selectedColor].name}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(i)}
                      className={`w-11 h-11 rounded-full border-2 transition-all ${
                        selectedColor === i
                          ? "border-[var(--neon-violet)] scale-110 shadow-md shadow-[var(--neon-violet)]/30"
                          : "border-white shadow hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] tracking-[0.22em] uppercase text-muted">
                    Taille · <span className="text-ink font-semibold">{product.sizes[selectedSize]}</span>
                  </p>
                  <Link
                    href="/size-guide"
                    className="text-xs text-[var(--neon-violet)] hover:underline"
                  >
                    Guide des tailles
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(i)}
                      className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                        selectedSize === i
                          ? "border-[var(--neon-violet)] text-[var(--neon-violet)] bg-[var(--neon-violet)]/8"
                          : "border-[var(--neon-violet)]/15 text-ink-soft hover:border-[var(--neon-violet)]/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action */}
            <div className="mt-7 space-y-3">
              <div>
                <label
                  htmlFor="frame-input"
                  className="text-[11px] tracking-[0.22em] uppercase text-muted mb-2 block"
                >
                  Indiquer ma monture
                </label>
                <input
                  id="frame-input"
                  type="text"
                  value={frameInput}
                  onChange={(e) => setFrameInput(e.target.value)}
                  placeholder="Ex : 138 mm / référence / besoin spécifique"
                  className="w-full rounded-2xl border border-[var(--neon-violet)]/20 px-4 py-3.5 text-sm outline-none focus:border-[var(--neon-violet)] transition-colors"
                />
              </div>
              <button onClick={handleSendRequest} className="btn-primary w-full">
                <Send size={16} />
                Envoyer ma demande
              </button>
              <button
                onClick={() => dispatch({ type: "TOGGLE_WISHLIST", productId: product.id })}
                className={`w-full py-3.5 rounded-full border text-xs tracking-[0.22em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isWished
                    ? "border-[var(--neon-rose)] text-[var(--neon-rose)] bg-[var(--neon-rose)]/5"
                    : "border-[var(--neon-violet)]/20 text-ink-soft hover:text-[var(--neon-rose)] hover:border-[var(--neon-rose)]"
                }`}
              >
                <Heart size={16} fill={isWished ? "currentColor" : "none"} />
                {isWished ? "Dans vos favoris" : "Ajouter aux favoris"}
              </button>
              {requestError && (
                <p className="text-sm text-[var(--neon-rose)] bg-[var(--neon-rose)]/8 px-3 py-2 rounded-xl">
                  {requestError}
                </p>
              )}
              {requestSent && (
                <p className="text-sm text-[var(--neon-emerald)] bg-[var(--neon-emerald)]/8 border border-[var(--neon-emerald)]/20 px-3 py-2 rounded-xl">
                  ✓ {ProductDetailConfig.requestSuccessMessage}
                </p>
              )}
            </div>

            {/* Guarantees */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {ProductDetailConfig.guarantees.map((g) => {
                const Icon = iconMap[g.icon as keyof typeof iconMap];
                return (
                  <div
                    key={g.label}
                    className="rounded-2xl border border-[var(--neon-violet)]/10 bg-white p-3 text-center"
                  >
                    <span
                      className="inline-grid place-items-center w-10 h-10 rounded-full text-white mb-1"
                      style={{
                        background: `linear-gradient(135deg, ${g.color}, var(--neon-rose))`,
                      }}
                    >
                      <Icon size={16} />
                    </span>
                    <p className="text-xs font-semibold text-ink">{g.label}</p>
                    <p className="text-[10px] text-muted mt-0.5">{g.detail}</p>
                  </div>
                );
              })}
            </div>

            {/* Tabs */}
            <div className="mt-9">
              <div className="flex gap-1 p-1 rounded-full bg-[#f5f7ff] w-fit">
                {(
                  [
                    { key: "details", label: "Détails" },
                    { key: "livraison", label: "Livraison" },
                    { key: "guide", label: "Entretien" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold transition-all ${
                      activeTab === tab.key
                        ? "text-white bg-gradient-to-r from-[var(--neon-violet)] to-[var(--neon-magenta)]"
                        : "text-ink-soft hover:text-[var(--neon-violet)]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="py-5 text-sm text-ink-soft leading-relaxed">
                {activeTab === "details" && (
                  <div className="space-y-2">
                    {product.brand && <p><strong className="text-ink">Marque :</strong> {product.brand}</p>}
                    {product.shape && <p><strong className="text-ink">Forme :</strong> {product.shape}</p>}
                    {product.material && <p><strong className="text-ink">Matière :</strong> {product.material}</p>}
                    {product.lensType && <p><strong className="text-ink">Verres :</strong> {product.lensType}</p>}
                    {product.gender && <p><strong className="text-ink">Genre :</strong> {product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}</p>}
                    {product.frameWidth && <p><strong className="text-ink">Largeur monture :</strong> {product.frameWidth}mm</p>}
                    <p><strong className="text-ink">Protection UV :</strong> 100% UV400</p>
                  </div>
                )}
                {activeTab === "livraison" && (
                  <div className="space-y-2">
                    <p>Livraison express 24-48h dans tout le territoire algérien.</p>
                    <p>Suivi WhatsApp dédié, paiement sécurisé en boutique ou en ligne.</p>
                    <p>Retrait gratuit dans nos boutiques d&apos;Alger, Oran et Constantine.</p>
                    <p>Conseiller dédié joignable du samedi au jeudi.</p>
                  </div>
                )}
                {activeTab === "guide" && (
                  <div className="space-y-2">
                    <p>Nettoyez vos verres avec le chiffon microfibre fourni.</p>
                    <p>Rangez toujours vos lunettes dans leur étui rigide.</p>
                    <p>Évitez de les poser verres vers le bas.</p>
                    <p>Pas de produits chimiques agressifs ni de nettoyants ménagers.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between mb-7">
              <div>
                <p className="section-eyebrow text-ink-soft">
                  <Sparkles size={14} className="text-[var(--neon-amber)]" />
                  Suggestions
                </p>
                <h2 className="mt-3 text-3xl lg:text-4xl font-light text-ink">
                  Vous aimerez <span className="gradient-text font-semibold">aussi</span>
                </h2>
              </div>
              <Link href={`/collections/all`} className="btn-ghost">
                Tout voir
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
