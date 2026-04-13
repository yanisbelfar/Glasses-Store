"use client";

import { Camera, Upload, RotateCcw, Monitor, Smartphone, Eye } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { allProducts } from "@/lib/data";

export class VirtualTryOnConfig {
  static readonly title = "Essai Virtuel";
  static readonly subtitle = "Essayez vos lunettes depuis chez vous grâce à notre technologie d'essai virtuel.";
  static readonly modes = [
    { key: "webcam", icon: "camera", label: "Webcam en direct" },
    { key: "photo", icon: "upload", label: "Importer une photo" },
  ] as const;
}

export default function VirtualTryOnPage() {
  const [selectedProduct, setSelectedProduct] = useState(allProducts[0]?.id ?? "");
  const [mode, setMode] = useState<"webcam" | "photo">("webcam");

  const sunglasses = allProducts.filter((p) => p.category === "Solaire").slice(0, 8);
  const iconMap = { camera: Camera, upload: Upload };

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Essai Virtuel")]} />
        <div className="text-center mt-6 mb-10">
          <h1 className="text-3xl lg:text-4xl font-extralight text-charcoal">
            {VirtualTryOnConfig.title}
          </h1>
          <p className="text-sm text-stone-400 mt-3 max-w-xl mx-auto">
            {VirtualTryOnConfig.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Camera Preview */}
          <div>
            {/* Mode Selector */}
            <div className="flex gap-3 mb-4">
              {VirtualTryOnConfig.modes.map((m) => {
                const Icon = iconMap[m.icon as keyof typeof iconMap];
                return (
                  <button
                    key={m.key}
                    onClick={() => setMode(m.key)}
                    className={`flex items-center gap-2 px-5 py-2 text-xs tracking-[0.15em] uppercase border transition-colors ${
                      mode === m.key
                        ? "border-gold text-gold bg-gold/5"
                        : "border-stone-200 text-stone-500 hover:border-gold hover:text-gold"
                    }`}
                  >
                    <Icon size={14} />
                    {m.label}
                  </button>
                );
              })}
            </div>

            {/* Preview Area */}
            <div className="aspect-[4/3] bg-stone-900 flex flex-col items-center justify-center relative">
              {mode === "webcam" ? (
                <>
                  <Camera size={48} className="text-stone-600 mb-4" strokeWidth={1} />
                  <p className="text-stone-400 text-sm mb-2">Accès caméra requis</p>
                  <p className="text-stone-500 text-xs mb-6">
                    Cliquez pour activer votre webcam
                  </p>
                  <button className="px-8 py-3 bg-gold text-white text-xs tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors">
                    Activer la caméra
                  </button>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <button className="w-8 h-8 bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                      <RotateCcw size={14} />
                    </button>
                    <button className="w-8 h-8 bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                      <Monitor size={14} />
                    </button>
                    <button className="w-8 h-8 bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                      <Smartphone size={14} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Upload size={48} className="text-stone-600 mb-4" strokeWidth={1} />
                  <p className="text-stone-400 text-sm mb-2">Importez votre photo</p>
                  <p className="text-stone-500 text-xs mb-6">
                    Format JPG ou PNG, photo de face recommandée
                  </p>
                  <label className="px-8 py-3 bg-gold text-white text-xs tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors cursor-pointer">
                    Choisir un fichier
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Product Selector */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4">
              Choisissez un modèle
            </p>
            <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
              {sunglasses.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProduct(p.id)}
                  className={`border p-3 text-left transition-colors ${
                    selectedProduct === p.id
                      ? "border-gold bg-gold/5"
                      : "border-stone-200 hover:border-gold/40"
                  }`}
                >
                  <div className="aspect-square bg-stone-100 flex items-center justify-center mb-2">
                    <Eye size={20} className="text-stone-300" strokeWidth={1} />
                  </div>
                  <p className="text-[10px] text-stone-400 truncate">{p.brand}</p>
                  <p className="text-xs text-charcoal truncate">{p.name}</p>
                </button>
              ))}
            </div>
            <Link
              href="/collections/solaire"
              className="block text-center mt-4 text-xs text-gold hover:underline"
            >
              Voir tous les modèles →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
