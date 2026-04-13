import { Glasses, Shield, Truck, Users } from "lucide-react";
import Link from "next/link";

export class HeroConfig {
  static readonly headline = "L\u2019art de voir le monde avec \u00e9l\u00e9gance";
  static readonly subheadline =
    "D\u00e9couvrez notre collection exclusive de lunettes de luxe. Marques prestigieuses, authenticit\u00e9 garantie, livraison express partout en Alg\u00e9rie.";
  static readonly ctaPrimary = "Explorer la Collection";
  static readonly ctaSecondary = "Nos Marques";
  static readonly trustBadges = [
    { icon: "truck", label: "24-48h", sub: "Livraison Express" },
    { icon: "shield", label: "100%", sub: "Authentique" },
    { icon: "glasses", label: "2 Ans", sub: "Garantie Officielle" },
    { icon: "users", label: "5000+", sub: "Clients Satisfaits" },
  ];
}

const iconMap = { truck: Truck, shield: Shield, glasses: Glasses, users: Users };

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-charcoal via-charcoal-light to-stone-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <p className="text-gold text-sm tracking-[0.4em] uppercase mb-6 font-light">
              Collection Exclusive
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight text-white leading-tight tracking-tight">
              {HeroConfig.headline}
            </h1>
            <p className="mt-8 text-lg text-stone-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {HeroConfig.subheadline}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/collections/all"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-white text-sm tracking-[0.2em] uppercase hover:bg-gold-dark transition-all duration-300 rounded-none"
              >
                {HeroConfig.ctaPrimary}
              </Link>
              <Link
                href="/marques"
                className="inline-flex items-center justify-center px-8 py-4 border border-stone-600 text-stone-300 text-sm tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-all duration-300 rounded-none"
              >
                {HeroConfig.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 border border-gold/20 rotate-6" />
              <div className="absolute inset-4 border border-gold/10 -rotate-3" />
              <div className="absolute inset-8 bg-gradient-to-br from-gold/10 to-transparent flex items-center justify-center">
                <Glasses className="w-32 h-32 text-gold/40" strokeWidth={0.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {HeroConfig.trustBadges.map((badge) => {
            const Icon = iconMap[badge.icon as keyof typeof iconMap];
            return (
              <div
                key={badge.label}
                className="flex flex-col items-center text-center p-6 border border-stone-700/50 bg-stone-900/30 backdrop-blur-sm"
              >
                <Icon size={24} className="text-gold mb-3" strokeWidth={1.5} />
                <span className="text-2xl font-light text-white">{badge.label}</span>
                <span className="text-xs tracking-[0.2em] uppercase text-stone-500 mt-1">
                  {badge.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
