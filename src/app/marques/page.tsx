"use client";

import { useMemo, useState } from "react";
import {
  Glasses,
  MessageCircle,
  ShieldCheck,
  Store,
  Search,
  Sparkles,
  Crown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import BrandLogoSwipe from "@/components/BrandLogoSwipe";
import BrandList from "@/components/BrandList";
import Footer from "@/components/Footer";
import { allProducts, brands } from "@/lib/data";

type BrandRequestForm = {
  brand: string;
  monture: string;
  couleur: string;
  forme: string;
};

type ServiceHighlight = {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: React.ReactNode;
  external?: boolean;
  gradient: string;
};

const WHATSAPP_NUMBER = "213555852457";

export default function BrandsPage() {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [brandQuery, setBrandQuery] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [requestForm, setRequestForm] = useState<BrandRequestForm>({
    brand: "",
    monture: "",
    couleur: "",
    forme: "",
  });

  const brandCards = useMemo(
    () =>
      brands.map((brand) => {
        const products = allProducts.filter((product) => product.brand === brand.name);
        const cover =
          products.find((product) => product.image !== "/products/placeholder.jpg") ?? products[0];

        return {
          brand,
          coverImage: cover?.image,
          hasPhoto: Boolean(cover && cover.image !== "/products/placeholder.jpg"),
          count: products.length,
        };
      }),
    []
  );

  const filteredBrandCards = useMemo(() => {
    const q = brandQuery.trim().toLowerCase();
    if (!q) return brandCards;
    return brandCards.filter(({ brand }) => brand.name.toLowerCase().includes(q));
  }, [brandCards, brandQuery]);

  const serviceHighlights: ServiceHighlight[] = [
    {
      title: "Essai virtuel 3D",
      description: "Testez n'importe quelle monture depuis chez vous.",
      href: "/virtual-try-on",
      cta: "Lancer l'essai",
      icon: <Glasses size={18} />,
      gradient: "linear-gradient(135deg, #06d3f7, #4f8cff)",
    },
    {
      title: "Trouver une boutique",
      description: "Localisez le point de vente le plus proche.",
      href: "/store-locator",
      cta: "Voir les adresses",
      icon: <Store size={18} />,
      gradient: "linear-gradient(135deg, #f472b6, #a855f7)",
    },
    {
      title: "Conseil WhatsApp",
      description: "Réponse en moins de 30 minutes.",
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      cta: "Discuter",
      icon: <MessageCircle size={18} />,
      external: true,
      gradient: "linear-gradient(135deg, #2ed68a, #06d3f7)",
    },
    {
      title: "Ajustement boutique",
      description: "Contrôle technique gratuit en boutique.",
      href: "/size-guide",
      cta: "Voir le guide",
      icon: <ShieldCheck size={18} />,
      gradient: "linear-gradient(135deg, #fbbf24, #fb7185)",
    },
  ];

  const updateForm = (field: keyof BrandRequestForm, value: string) => {
    setRequestForm((prev) => ({ ...prev, [field]: value }));
  };

  const openBrandRequest = (brandName: string) => {
    setIsRequestOpen(true);
    setRequestSent(false);
    setRequestError("");
    setRequestForm({ brand: brandName, monture: "", couleur: "", forme: "" });
    if (typeof window !== "undefined") {
      setTimeout(() => {
        document.getElementById("brand-request")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  const sendBrandRequestWhatsApp = () => {
    const isValid =
      requestForm.brand.trim() &&
      requestForm.monture.trim() &&
      requestForm.couleur.trim() &&
      requestForm.forme.trim();
    if (!isValid) {
      setRequestSent(false);
      setRequestError("Veuillez remplir marque, monture, couleur et forme avant l'envoi.");
      return;
    }
    setRequestError("");

    const message = [
      "Nouvelle demande marque · New Look Optic",
      `Marque: ${requestForm.brand}`,
      `Monture: ${requestForm.monture}`,
      `Couleur: ${requestForm.couleur}`,
      `Forme: ${requestForm.forme}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setRequestSent(true);
  };

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      {/* HERO */}
      <section className="relative overflow-hidden py-14 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#fdf2ff] via-white to-[#f0f9ff]" />
        <div
          className="glow-orb"
          style={{ width: 400, height: 400, left: "5%", top: "-10%", background: "rgba(244,114,182,0.18)" }}
        />
        <div
          className="glow-orb"
          style={{ width: 380, height: 380, right: "5%", bottom: "-10%", background: "rgba(6,211,247,0.18)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[new BreadcrumbItem("Nos Marques")]} />
          <div className="text-center mt-6">
            <p className="section-eyebrow text-ink-soft justify-center">
              <Crown size={14} className="text-[var(--neon-amber)]" />
              {brands.length}+ griffes premium
            </p>
            <h1 className="mt-4 text-4xl lg:text-6xl font-light text-ink leading-[1.05]">
              <span className="gradient-text font-semibold">Toutes les marques</span> que vous adorez
            </h1>
            <p className="mt-3 text-ink-soft max-w-2xl mx-auto">
              De Dior à GIVENCHY en passant par KENZO, Polaroid et Skechers — explorez notre univers
              de griffes premium 100% authentiques.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        {/* Logo swiper section */}
        <section className="rounded-3xl bg-white border border-[var(--neon-violet)]/10 shadow-md shadow-[var(--neon-violet)]/5 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--neon-violet)] font-semibold">
                Logo Swiper
              </p>
              <h2 className="mt-2 text-2xl lg:text-3xl font-light text-ink">
                Glissez parmi nos griffes
              </h2>
              <p className="mt-2 text-sm text-ink-soft max-w-xl">
                Navigation fluide, indicateurs en tirets — pour explorer nos marques comme vous le faites sur les meilleurs sites optiques.
              </p>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={brandQuery}
                onChange={(e) => setBrandQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full sm:w-80 rounded-full border border-[var(--neon-violet)]/15 outline-none focus:border-[var(--neon-violet)]"
                placeholder="Rechercher une marque..."
              />
            </div>
          </div>

          <BrandLogoSwipe
            items={filteredBrandCards.map(({ brand, hasPhoto, count }) => ({
              name: brand.name,
              logo: brand.logo,
              hasPhoto,
              count,
              href: `/collections/all?brand=${encodeURIComponent(brand.name)}`,
            }))}
            onRequestBrand={openBrandRequest}
          />
        </section>

        {/* Brand cards grid */}
        <section className="mt-14">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="section-eyebrow text-ink-soft">
                <Sparkles size={14} className="text-[var(--neon-violet)]" />
                Vitrine
              </p>
              <h2 className="mt-2 text-2xl lg:text-3xl font-light text-ink">
                Vitrine des marques
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredBrandCards.map(({ brand, coverImage, hasPhoto, count }, i) => {
              if (hasPhoto) {
                return (
                  <Link
                    key={brand.name}
                    href={`/collections/all?brand=${encodeURIComponent(brand.name)}`}
                    className="group relative rounded-3xl overflow-hidden bg-white border border-[var(--neon-violet)]/10 hover:border-[var(--neon-violet)]/30 transition-all"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {coverImage && (
                        <Image
                          src={coverImage}
                          alt=""
                          aria-hidden
                          fill
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/15" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={brand.logo}
                          alt={`Logo ${brand.name}`}
                          width={320}
                          height={96}
                          className="max-w-[60%] max-h-16 object-contain drop-shadow-2xl"
                        />
                      </div>
                      <div className="absolute top-3 left-3 chip bg-white/90 text-ink">
                        {count} ref{count > 1 ? "s" : ""}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-ink group-hover:gradient-text">
                        {brand.name}
                      </p>
                      {brand.description && (
                        <p className="text-xs text-muted mt-0.5 line-clamp-2">
                          {brand.description}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              }

              return (
                <button
                  key={brand.name}
                  onClick={() => openBrandRequest(brand.name)}
                  className="group rounded-3xl overflow-hidden bg-gradient-to-br from-[#fafbff] to-white border-2 border-dashed border-[var(--neon-violet)]/25 hover:border-[var(--neon-violet)]/45 transition-all"
                >
                  <div className="aspect-[4/3] flex flex-col items-center justify-center gap-3 p-5">
                    <Image
                      src={brand.logo}
                      alt={`Logo ${brand.name}`}
                      width={320}
                      height={96}
                      className="max-w-[80%] max-h-12 object-contain"
                    />
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--neon-emerald)]/15 text-[var(--neon-emerald)] text-[10px] tracking-[0.18em] uppercase font-semibold">
                      <MessageCircle size={11} /> Demande WhatsApp
                    </span>
                  </div>
                  <div className="p-4 text-center border-t border-[var(--neon-violet)]/10">
                    <p className="text-sm font-semibold text-ink">{brand.name}</p>
                    <p className="text-[11px] text-muted">Photo bientôt en ligne</p>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredBrandCards.length === 0 && (
            <p className="mt-8 text-center text-muted">
              Aucune marque trouvée. Essayez un autre nom.
            </p>
          )}
        </section>

        {/* Services */}
        <section className="mt-16">
          <div className="text-center mb-7">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--neon-violet)] font-semibold">
              Nos services
            </p>
            <h2 className="mt-2 text-2xl lg:text-3xl font-light text-ink">
              Pour vous accompagner avant et après l&apos;achat
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceHighlights.map((service) => {
              const card = (
                <div className="relative h-full rounded-3xl overflow-hidden p-6 bg-white border border-[var(--neon-violet)]/10 transition-all">
                  <div
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-30 blur-2xl"
                    style={{ background: service.gradient }}
                  />
                  <div className="relative">
                    <span
                      className="w-11 h-11 grid place-items-center rounded-2xl text-white"
                      style={{ background: service.gradient }}
                    >
                      {service.icon}
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">{service.title}</h3>
                    <p className="text-sm text-ink-soft mt-1.5 leading-snug">
                      {service.description}
                    </p>
                    <p className="mt-4 text-[11px] tracking-[0.22em] uppercase font-semibold gradient-text">
                      {service.cta} →
                    </p>
                  </div>
                </div>
              );

              if (service.external) {
                return (
                  <a
                    key={service.title}
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {card}
                  </a>
                );
              }
              return (
                <Link key={service.title} href={service.href}>
                  {card}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Brand request form */}
        {isRequestOpen && (
          <section
            id="brand-request"
            className="mt-16 rounded-3xl border border-[var(--neon-emerald)]/30 bg-gradient-to-br from-[var(--neon-emerald)]/5 to-[var(--neon-cyan)]/5 p-6 lg:p-9 animate-fade-in"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--neon-emerald)] font-semibold">
                  Demande WhatsApp Auto
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">
                  Demande pour {requestForm.brand || "une marque"}
                </h2>
                <p className="text-sm text-ink-soft mt-1">
                  Remplissez les infos, le message WhatsApp est généré automatiquement.
                </p>
              </div>
              <button
                onClick={() => setIsRequestOpen(false)}
                className="text-muted hover:text-[var(--neon-rose)]"
              >
                Fermer
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              {(
                [
                  ["brand", "Marque", "Nom de la marque"],
                  ["monture", "Monture", "Ex: 138 mm / référence"],
                  ["couleur", "Couleur", "Ex: Noir mat"],
                  ["forme", "Forme", "Ex: Carré, Rond, Aviator"],
                ] as const
              ).map(([key, label, ph]) => (
                <label key={key} className="block text-sm">
                  <span className="text-ink-soft">{label}</span>
                  <input
                    value={requestForm[key]}
                    onChange={(e) => updateForm(key, e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[var(--neon-emerald)]/20 px-3 py-2.5 outline-none focus:border-[var(--neon-emerald)]"
                    placeholder={ph}
                  />
                </label>
              ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
              <button onClick={sendBrandRequestWhatsApp} className="btn-primary">
                <MessageCircle size={14} />
                Envoyer sur WhatsApp
              </button>
              {requestError && (
                <p className="text-sm text-[var(--neon-rose)]">{requestError}</p>
              )}
              {requestSent && (
                <p className="text-sm text-[var(--neon-emerald)]">
                  ✓ Message WhatsApp ouvert avec vos infos
                </p>
              )}
            </div>
          </section>
        )}
      </div>

      <BrandList />
      <Footer />
    </main>
  );
}
