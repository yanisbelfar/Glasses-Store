"use client";

import {
  Glasses,
  Shield,
  Truck,
  Users,
  ScanFace,
  Sparkles,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { allProducts, productImageCatalog } from "@/lib/data";

export class HeroConfig {
  static readonly eyebrow = "Collection 2026 · Édition Limitée";
  static readonly headline = "L'art de voir le monde";
  static readonly headlineGradient = "en haute définition.";
  static readonly subheadline =
    "Plus de 60 marques exclusives, conseil personnalise et essai virtuel 3D. Decouvrez la nouvelle ere de l'optique a Sidi Aiche.";
  static readonly ctaPrimary = "Explorer la Collection";
  static readonly ctaSecondary = "Essayer en 3D";
  static readonly trustBadges = [
    { icon: "shield", label: "100%", sub: "Authentique", color: "var(--neon-violet)" },
    { icon: "glasses", label: "60+", sub: "Marques Premium", color: "var(--neon-magenta)" },
    { icon: "users", label: "5000+", sub: "Clients Satisfaits", color: "var(--neon-amber)" },
  ];
}

const iconMap = { truck: Truck, shield: Shield, glasses: Glasses, users: Users };

const rotatingHeadlines = [
  "en haute définition.",
  "avec style.",
  "sans compromis.",
  "comme jamais avant.",
];

export default function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setInterval(() => {
      setHeadlineIndex((i) => (i + 1) % rotatingHeadlines.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const cy = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setTilt({ x: cx * 6, y: cy * -6 });
  };

  // pick 3 hero images from catalog for the floating mosaic
  const heroImages =
    productImageCatalog.length >= 5
      ? [
          productImageCatalog[1].path,
          productImageCatalog[15].path,
          productImageCatalog[30].path,
          productImageCatalog[44].path,
          productImageCatalog[8].path,
        ]
      : productImageCatalog.slice(0, 5).map((e) => e.path);

  const totalProducts = allProducts.length;

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden text-ink pt-32 pb-20">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-[#e6f9f9]" />
      <div className="absolute inset-0 -z-10">
        <div className="aurora animate-mesh" />
        <div className="noise opacity-30" />
        {/* grid */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)",
          }}
        />
        {/* glow orbs */}
        <div
          className="glow-orb animate-float-soft"
          style={{
            width: 380,
            height: 380,
            left: "8%",
            top: "20%",
            background: "rgba(0, 180, 180, 0.35)",
          }}
        />
        <div
          className="glow-orb animate-float-soft"
          style={{
            width: 420,
            height: 420,
            right: "5%",
            bottom: "10%",
            background: "rgba(0, 212, 212, 0.35)",
            animationDelay: "1.2s",
          }}
        />
        <div
          className="glow-orb animate-float-soft"
          style={{
            width: 280,
            height: 280,
            right: "30%",
            top: "55%",
            background: "rgba(0, 196, 196, 0.35)",
            animationDelay: "2.4s",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
          {/* LEFT: Copy */}
          <div className="text-center lg:text-left">
            <p className="section-eyebrow text-ink-soft mb-6 justify-center lg:justify-start">
              <Sparkles size={14} className="text-[var(--neon-amber)]" />
              {HeroConfig.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.05] tracking-tight">
              {HeroConfig.headline}
              <br />
              <span className="inline-flex items-center gap-2">
                <span className="gradient-text font-semibold">
                  {rotatingHeadlines[headlineIndex]}
                </span>
                <span className="inline-block w-1 h-12 bg-[var(--neon-cyan)] rounded-none animate-blink-caret align-middle" />
              </span>
            </h1>
            <p className="mt-7 text-base lg:text-lg text-ink-soft leading-relaxed max-w-xl mx-auto lg:mx-0">
              {HeroConfig.subheadline}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/collections/all" className="btn-primary">
                {HeroConfig.ctaPrimary}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/virtual-try-on"
                className="inline-flex items-center justify-center gap-2 px-7 py-[0.85rem] rounded-full text-[0.78rem] tracking-[0.22em] uppercase font-semibold text-ink border border-[var(--neon-violet)]/30 bg-white/80 backdrop-blur-md hover:bg-white hover:border-[var(--neon-cyan)] transition-all"
              >
                <ScanFace size={16} />
                {HeroConfig.ctaSecondary}
              </Link>
              <Link
                href="/marques"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs tracking-[0.22em] uppercase text-ink-soft hover:text-ink"
              >
                <PlayCircle size={16} />
                Voir nos Marques
              </Link>
            </div>

            {/* live counter */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto lg:mx-0">
              {HeroConfig.trustBadges.map((badge, idx) => {
                const Icon = iconMap[badge.icon as keyof typeof iconMap];
                return (
                  <div
                    key={badge.label}
                    className="relative rounded-none p-4 border border-[var(--neon-violet)]/15 bg-white/80 backdrop-blur-md hover:bg-white transition-colors group"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div
                      className="absolute -top-3 left-4 w-8 h-8 grid place-items-center rounded-full text-white shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${badge.color}, rgba(255,255,255,0.4))`,
                        boxShadow: `0 8px 22px -10px ${badge.color}`,
                      }}
                    >
                      <Icon size={14} strokeWidth={2.2} />
                    </div>
                    <p className="mt-3 text-2xl font-semibold gradient-text">
                      {badge.label}
                    </p>
                    <p className="mt-0.5 text-[10px] tracking-[0.2em] uppercase text-ink-soft">
                      {badge.sub}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Image mosaic */}
          <div className="hidden lg:block">
            <div
              className="relative w-full h-[560px]"
              onMouseMove={onMouseMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              style={{
                perspective: "1200px",
              }}
            >
              {/* Halo ring */}
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div
                  className="w-[520px] h-[520px] rounded-full border border-white/10 animate-ring-rotate"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 70%, rgba(90,167,255,0.35), transparent 100%)",
                    mask: "radial-gradient(transparent 220px, black 222px)",
                    WebkitMask: "radial-gradient(transparent 220px, black 222px)",
                  }}
                />
              </div>

              {/* Big card */}
              <div
                className="absolute left-1/2 top-1/2 w-[330px] aspect-[4/5] -translate-x-1/2 -translate-y-1/2 rounded-none overflow-hidden shadow-2xl border border-white/20 transition-transform duration-300"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  background:
                    "linear-gradient(135deg, rgba(123,182,255,0.35), rgba(111,220,255,0.25))",
                }}
              >
                <img
                  src={heroImages[0]}
                  alt="Lunette featured"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-ink">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--neon-violet)]">
                    Édition signature
                  </p>
                  <p className="text-lg font-semibold">Newtis · Verres progressifs</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="chip bg-white/80 text-ink">Nouveau</span>
                    <span className="chip bg-[var(--neon-cyan)]/20 text-[var(--neon-violet)]">
                      ★ 4.9 / 5
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div
                className="absolute top-4 right-4 w-44 aspect-square rounded-none overflow-hidden border border-[var(--neon-violet)]/20 shadow-xl animate-float-soft"
                style={{ animationDelay: "0.4s" }}
              >
                <img src={heroImages[1]} alt="" className="w-full h-full object-cover" />
              </div>
              <div
                className="absolute bottom-6 left-2 w-40 aspect-square rounded-none overflow-hidden border border-[var(--neon-violet)]/20 shadow-xl animate-float-soft"
                style={{ animationDelay: "1.2s" }}
              >
                <img src={heroImages[2]} alt="" className="w-full h-full object-cover" />
              </div>
              <div
                className="absolute top-12 left-0 w-32 aspect-[4/3] rounded-none overflow-hidden border border-[var(--neon-violet)]/20 shadow-xl animate-float-soft"
                style={{ animationDelay: "2s" }}
              >
                <img src={heroImages[3]} alt="" className="w-full h-full object-cover" />
              </div>
              <div
                className="absolute bottom-2 right-12 w-32 aspect-[4/3] rounded-none overflow-hidden border border-[var(--neon-violet)]/20 shadow-xl animate-float-soft"
                style={{ animationDelay: "1.6s" }}
              >
                <img src={heroImages[4]} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Stat bubble */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[var(--neon-violet)]/20 text-[10px] tracking-[0.25em] uppercase text-ink">
                {totalProducts}+ modèles disponibles
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
