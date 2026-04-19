"use client";

import { useState, useEffect } from "react";
import { Heart, Send, Truck, Shield, RotateCcw, Eye, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { allProducts, Product } from "@/lib/data";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

export class ProductDetailConfig {
  static readonly whatsappNumber = "213555852457";
  static readonly requestSuccessMessage = "vos donnée ont bien été envoyé, vous auriez une reponse dans les plus bref délai";

  static readonly guarantees = [
    { icon: "truck", label: "Livraison 24-48h", detail: "Express partout en Algérie" },
    { icon: "shield", label: "Garantie 2 ans", detail: "Produit 100% authentique" },
    { icon: "return", label: "Retour 14 jours", detail: "Satisfait ou remboursé" },
  ];

  static getRelatedProducts(product: Product): Product[] {
    return allProducts
      .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
      .slice(0, 4);
  }

  static getWhatsAppLink(product: Product, frame: string, color?: string, size?: string): string {
    const message = [
      "Nouvelle demande monture - New Look Optic",
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

  useEffect(() => {
    if (product) {
      dispatch({ type: "ADD_RECENTLY_VIEWED", productId: product.id });
    }
  }, [product, dispatch]);

  if (!product) {
    return (
      <main className="flex-1 pt-32 text-center py-20">
        <p className="text-lg text-stone-400">Produit introuvable.</p>
        <Link href="/collections/all" className="text-gold underline text-sm mt-4 inline-block">
          Retour à la boutique
        </Link>
      </main>
    );
  }

  const isWished = state.wishlist.includes(product.id);
  const relatedProducts = ProductDetailConfig.getRelatedProducts(product);
  const images = product.images ?? [product.image];
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

    const whatsappUrl = ProductDetailConfig.getWhatsAppLink(
      product,
      normalizedFrame,
      product.colors?.[selectedColor]?.name,
      product.sizes?.[selectedSize],
    );

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            new BreadcrumbItem(product.category, `/collections/${product.category.toLowerCase()}`),
            new BreadcrumbItem(product.name),
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-4">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square bg-stone-100 overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye size={64} className="text-stone-300" strokeWidth={0.5} />
              </div>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((currentImage - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImage((currentImage + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              {/* Virtual Try-On Button */}
              <button className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-xs tracking-[0.15em] uppercase hover:bg-gold transition-colors">
                <Camera size={14} />
                Essai Virtuel
              </button>
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-16 h-16 bg-stone-100 border-2 transition-colors ${
                      currentImage === i ? "border-gold" : "border-transparent hover:border-stone-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2">{product.brand}</p>
            <h1 className="text-3xl lg:text-4xl font-extralight text-charcoal">{product.name}</h1>
            <p className="text-sm text-stone-500 mt-4">Indiquez votre monture pour recevoir une réponse personnalisée.</p>

            {product.description && (
              <p className="text-stone-500 mt-4 leading-relaxed">{product.description}</p>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-8">
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">
                  Couleur : <span className="text-charcoal">{product.colors[selectedColor].name}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(i)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === i ? "border-gold scale-110" : "border-stone-200 hover:border-stone-400"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs tracking-[0.2em] uppercase text-stone-400">
                    Taille : <span className="text-charcoal">{product.sizes[selectedSize]}</span>
                  </p>
                  <Link href="/size-guide" className="text-xs text-gold hover:underline">
                    Guide des tailles
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(i)}
                      className={`px-4 py-2 border text-sm transition-colors ${
                        selectedSize === i
                          ? "border-gold text-gold bg-gold/5"
                          : "border-stone-200 text-stone-600 hover:border-gold hover:text-gold"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <div>
                <label htmlFor="frame-input" className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-2 block">
                  Monture
                </label>
                <input
                  id="frame-input"
                  type="text"
                  value={frameInput}
                  onChange={(event) => setFrameInput(event.target.value)}
                  placeholder="Ex: 138 mm / référence / besoin spécifique"
                  className="w-full border border-stone-200 px-4 py-3 text-sm text-charcoal outline-none focus:border-gold"
                />
              </div>
              <button
                onClick={handleSendRequest}
                className="w-full py-4 bg-gold text-white text-sm tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Envoyer
              </button>
              <button
                onClick={() => dispatch({ type: "TOGGLE_WISHLIST", productId: product.id })}
                className={`w-full py-3 border text-sm tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 ${
                  isWished
                    ? "border-gold text-gold bg-gold/5"
                    : "border-stone-200 text-stone-600 hover:border-gold hover:text-gold"
                }`}
              >
                <Heart size={18} fill={isWished ? "currentColor" : "none"} />
                {isWished ? "Dans vos favoris" : "Ajouter aux favoris"}
              </button>
              {requestError && (
                <p className="text-sm text-red-600">{requestError}</p>
              )}
              {requestSent && (
                <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-2">
                  {ProductDetailConfig.requestSuccessMessage}
                </p>
              )}
            </div>

            {/* Guarantees */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {ProductDetailConfig.guarantees.map((g) => {
                const Icon = iconMap[g.icon as keyof typeof iconMap];
                return (
                  <div key={g.label} className="text-center">
                    <Icon size={20} className="text-gold mx-auto mb-2" strokeWidth={1.5} />
                    <p className="text-xs font-medium text-charcoal">{g.label}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{g.detail}</p>
                  </div>
                );
              })}
            </div>

            {/* Tabs */}
            <div className="mt-10 border-t border-stone-200 pt-6">
              <div className="flex gap-6 border-b border-stone-100">
                {([
                  { key: "details", label: "Détails" },
                  { key: "livraison", label: "Livraison" },
                  { key: "guide", label: "Entretien" },
                ] as const).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-3 text-xs tracking-[0.2em] uppercase transition-colors border-b-2 ${
                      activeTab === tab.key ? "border-gold text-gold" : "border-transparent text-stone-400 hover:text-charcoal"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="py-6 text-sm text-stone-500 leading-relaxed">
                {activeTab === "details" && (
                  <div className="space-y-2">
                    {product.brand && <p><strong className="text-charcoal">Marque :</strong> {product.brand}</p>}
                    {product.shape && <p><strong className="text-charcoal">Forme :</strong> {product.shape}</p>}
                    {product.material && <p><strong className="text-charcoal">Matière :</strong> {product.material}</p>}
                    {product.lensType && <p><strong className="text-charcoal">Verres :</strong> {product.lensType}</p>}
                    {product.gender && <p><strong className="text-charcoal">Genre :</strong> {product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}</p>}
                    {product.frameWidth && <p><strong className="text-charcoal">Largeur monture :</strong> {product.frameWidth}mm</p>}
                    <p><strong className="text-charcoal">Protection UV :</strong> 100% UV400</p>
                  </div>
                )}
                {activeTab === "livraison" && (
                  <div className="space-y-3">
                    <p>Après envoi de votre demande, un conseiller vous contacte dans les plus brefs délais.</p>
                    <p>La réponse inclut disponibilité, ajustement de monture et options de prise en charge.</p>
                    <p>Le suivi est assuré directement par téléphone ou WhatsApp.</p>
                    <p>Un accompagnement personnalisé est proposé pour chaque référence.</p>
                  </div>
                )}
                {activeTab === "guide" && (
                  <div className="space-y-3">
                    <p>Nettoyez vos verres avec le chiffon microfibre fourni.</p>
                    <p>Rangez toujours vos lunettes dans leur étui rigide.</p>
                    <p>Évitez de poser vos lunettes verres vers le bas.</p>
                    <p>N&apos;utilisez jamais de produits chimiques agressifs.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 mb-16">
            <h2 className="text-2xl font-extralight text-charcoal tracking-tight mb-8">
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group block">
                  <div className="aspect-square bg-stone-100 flex items-center justify-center">
                    <Eye size={36} className="text-stone-300 group-hover:text-gold/50 transition-colors" strokeWidth={1} />
                  </div>
                  <div className="mt-3">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gold">{p.brand}</p>
                    <p className="text-sm font-light text-charcoal group-hover:text-gold transition-colors truncate">{p.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
