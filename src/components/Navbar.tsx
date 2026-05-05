"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Search,
  Phone,
  Heart,
  ChevronDown,
  Sparkles,
  ShoppingBag,
  ScanFace,
  CalendarDays,
  Compass,
} from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { megaMenuData } from "@/lib/data";

export class NavbarController {
  static readonly brandName = "NEWLOOK OPTIC SIDI AICHE";
  static readonly tagline = "Opticien · Sidi Aiche";
  static readonly phone = "+213 555 85 24 57";
  static readonly promoMessages = [
    "✦ Livraison express 24-48h",
    "✶ Essai virtuel 3D depuis votre canapé",
    "★ Plus de 60 marques · 100% authentiques",
    "✧ Conseil personnalisé par WhatsApp",
  ];
}

const quickLinks = [
  { label: "Essai Virtuel", href: "/virtual-try-on", icon: ScanFace },
  { label: "Forme Visage", href: "/face-shape", icon: Compass },
  { label: "Rendez-vous", href: "/appointment", icon: CalendarDays },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { state, dispatch } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Promo strip with marquee */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#e6f2ff] via-[#d7ebff] to-[#e6f2ff] text-ink py-2">
        <div className="aurora opacity-40" />
        <div className="marquee-track text-[10px] tracking-[0.35em] uppercase">
          {[...NavbarController.promoMessages, ...NavbarController.promoMessages].map((msg, i) => (
            <span key={i} className="text-ink-soft">{msg}</span>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`transition-all duration-300 ${
          scrolled ? "py-1" : "py-2"
        } glass-strong border-b border-white/40`}
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.78)"
            : "rgba(255,255,255,0.55)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full text-ink hover:text-[var(--neon-violet)] transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <span className="relative w-10 h-10 grid place-items-center rounded-2xl bg-gradient-to-br from-[var(--neon-violet)] via-[var(--neon-magenta)] to-[var(--neon-cyan)] text-white shadow-lg shadow-[var(--neon-violet)]/30 transition-transform group-hover:rotate-3">
                <Sparkles size={18} strokeWidth={2.4} />
                <span className="absolute -inset-0.5 rounded-2xl border border-white/40" />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-base lg:text-lg font-semibold tracking-[0.2em] gradient-text">
                  NEWLOOK
                </span>
                <span className="text-[9px] tracking-[0.4em] text-ink-soft uppercase">
                  OPTIC · SIDI AICHE
                </span>
              </div>
            </Link>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="px-3 py-2 text-[11px] tracking-[0.22em] uppercase text-ink-soft hover:text-[var(--neon-violet)] transition-colors rounded-full"
              >
                Accueil
              </Link>
              {megaMenuData.map((cat) => (
                <div
                  key={cat.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(cat.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={cat.href}
                    className="flex items-center gap-1 px-3 py-2 text-[11px] tracking-[0.22em] uppercase text-ink-soft hover:text-[var(--neon-violet)] transition-colors rounded-full"
                  >
                    {cat.label.replace("Lunettes ", "")}
                    <ChevronDown
                      size={12}
                      className={`transition-transform ${activeMenu === cat.label ? "rotate-180" : ""}`}
                    />
                  </Link>
                  {activeMenu === cat.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 animate-fade-in">
                      <div className="glass-strong rounded-2xl shadow-2xl shadow-[var(--neon-violet)]/10 min-w-[260px] p-3 border border-white/60">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="flex items-center justify-between gap-3 px-4 py-2.5 text-[12px] text-ink-soft hover:text-[var(--neon-violet)] hover:bg-[rgba(123,182,255,0.18)] rounded-xl transition-all"
                          >
                            <span>{sub.label}</span>
                            <span className="opacity-0 group-hover:opacity-100 text-[10px]">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/virtual-try-on"
                className="px-3 py-2 text-[11px] tracking-[0.22em] uppercase text-ink-soft hover:text-[var(--neon-violet)] transition-colors rounded-full inline-flex items-center gap-1"
              >
                <ScanFace size={13} /> Essai
              </Link>
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-1">
              <a
                href={`tel:${NavbarController.phone.replace(/\s/g, "")}`}
                className="hidden xl:flex items-center gap-2 px-3 py-2 text-[11px] tracking-wider text-ink-soft hover:text-[var(--neon-violet)] transition-colors"
              >
                <Phone size={14} />
                {NavbarController.phone}
              </a>
              <button
                onClick={() => dispatch({ type: "TOGGLE_SEARCH" })}
                className="p-2 rounded-full text-ink hover:text-[var(--neon-violet)] hover:bg-[rgba(123,182,255,0.18)] transition-all"
                aria-label="Rechercher"
              >
                <Search size={18} />
              </button>
              <Link
                href="/wishlist"
                className="relative p-2 rounded-full text-ink hover:text-[var(--neon-rose)] hover:bg-[rgba(31,185,195,0.08)] transition-all"
                aria-label="Favoris"
              >
                <Heart size={18} />
                {state.wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-[var(--neon-rose)] to-[var(--neon-magenta)] shadow-md shadow-[var(--neon-rose)]/40">
                    {state.wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
                className="relative p-2 rounded-full text-ink hover:text-[var(--neon-violet)] hover:bg-[rgba(123,182,255,0.18)] transition-all"
                aria-label="Panier"
              >
                <ShoppingBag size={18} />
                {state.itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-[var(--neon-violet)] to-[var(--neon-cyan)] shadow-md shadow-[var(--neon-violet)]/40">
                    {state.itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Quick action ribbon (desktop) */}
          <div className="hidden lg:flex items-center justify-center gap-2 pb-2 -mt-1">
            {quickLinks.map((q) => {
              const Icon = q.icon;
              return (
                <Link
                  key={q.href}
                  href={q.href}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase text-ink-soft hover:text-[var(--neon-violet)] hover:bg-white/60 transition-all"
                >
                  <Icon size={12} />
                  {q.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden glass-strong border-t border-white/50 max-h-[80vh] overflow-y-auto animate-fade-in">
            <div className="px-6 py-6 space-y-5">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block text-sm tracking-[0.22em] uppercase text-ink hover:text-[var(--neon-violet)]"
              >
                Accueil
              </Link>
              {megaMenuData.map((cat) => (
                <div key={cat.label}>
                  <Link
                    href={cat.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm tracking-[0.22em] uppercase font-semibold gradient-text"
                  >
                    {cat.label}
                  </Link>
                  <div className="ml-3 mt-2 space-y-1.5 border-l border-[var(--neon-violet)]/30 pl-3">
                    {cat.subcategories.slice(0, 6).map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-xs text-ink-soft hover:text-[var(--neon-violet)]"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-white/40 space-y-2">
                {quickLinks.map((q) => {
                  const Icon = q.icon;
                  return (
                    <Link
                      key={q.href}
                      href={q.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-ink hover:text-[var(--neon-violet)]"
                    >
                      <Icon size={14} />
                      {q.label}
                    </Link>
                  );
                })}
                <Link
                  href="/store-locator"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm tracking-[0.2em] uppercase text-ink-soft hover:text-[var(--neon-violet)]"
                >
                  Nos Boutiques
                </Link>
                <Link
                  href="/size-guide"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm tracking-[0.2em] uppercase text-ink-soft hover:text-[var(--neon-violet)]"
                >
                  Guide des Tailles
                </Link>
              </div>
              <a
                href={`tel:${NavbarController.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm gradient-text pt-3 border-t border-white/40"
              >
                <Phone size={14} />
                {NavbarController.phone}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
