"use client";

import { useState } from "react";
import { Menu, X, Search, Phone, Heart, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { megaMenuData } from "@/lib/data";

export class NavbarController {
  static readonly brandName = "NEW LOOK OPTIC";
  static readonly phone = "+213 555 85 24 57";
  static readonly promoBanner = "Conseils monture personnalisés | Réponse rapide sur WhatsApp";
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { state, dispatch } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Promo Banner */}
      <div className="bg-charcoal text-white text-center text-xs tracking-[0.2em] uppercase py-2 px-4">
        {NavbarController.promoBanner}
      </div>

      {/* Main Nav */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-charcoal hover:text-gold transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-center">
              <span className="text-xl lg:text-2xl font-light tracking-[0.3em] text-charcoal">
                {NavbarController.brandName}
              </span>
              <span className="text-[10px] tracking-[0.5em] text-gold uppercase">
                Opticien de Luxe
              </span>
            </Link>

            {/* Desktop Mega Menu Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm tracking-widest uppercase text-stone-600 hover:text-gold transition-colors duration-300"
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
                    className="flex items-center gap-1 text-sm tracking-widest uppercase text-stone-600 hover:text-gold transition-colors duration-300"
                  >
                    {cat.label.split(" ").slice(-1)}
                    <ChevronDown size={12} className={`transition-transform duration-200 ${activeMenu === cat.label ? "rotate-180" : ""}`} />
                  </Link>

                  {/* Mega Dropdown */}
                  {activeMenu === cat.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="bg-white border border-stone-200 shadow-xl min-w-[240px] py-4">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-6 py-2 text-sm text-stone-600 hover:text-gold hover:bg-cream transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${NavbarController.phone.replace(/\s/g, "")}`}
                className="hidden md:flex items-center gap-2 text-sm text-stone-600 hover:text-gold transition-colors"
              >
                <Phone size={16} />
                <span className="hidden lg:inline">{NavbarController.phone}</span>
              </a>
              <button
                onClick={() => dispatch({ type: "TOGGLE_SEARCH" })}
                className="p-2 text-charcoal hover:text-gold transition-colors"
                aria-label="Rechercher"
              >
                <Search size={20} />
              </button>
              <Link
                href="/wishlist"
                className="p-2 text-charcoal hover:text-gold transition-colors relative"
                aria-label="Favoris"
              >
                <Heart size={20} />
                {state.wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {state.wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-stone-100 max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-6 space-y-4">
              <Link href="/" onClick={() => setIsOpen(false)} className="block text-sm tracking-[0.2em] uppercase text-stone-700 hover:text-gold transition-colors">
                Accueil
              </Link>
              {megaMenuData.map((cat) => (
                <div key={cat.label}>
                  <Link
                    href={cat.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm tracking-[0.2em] uppercase text-stone-700 hover:text-gold transition-colors font-medium"
                  >
                    {cat.label}
                  </Link>
                  <div className="ml-4 mt-2 space-y-2">
                    {cat.subcategories.slice(0, 4).map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-xs tracking-[0.15em] text-stone-500 hover:text-gold transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <Link href="/store-locator" onClick={() => setIsOpen(false)} className="block text-sm tracking-[0.2em] uppercase text-stone-700 hover:text-gold transition-colors">
                  Nos Boutiques
                </Link>
                <Link href="/size-guide" onClick={() => setIsOpen(false)} className="block text-sm tracking-[0.2em] uppercase text-stone-700 hover:text-gold transition-colors">
                  Guide des Tailles
                </Link>
              </div>
              <a
                href={`tel:${NavbarController.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-gold pt-4 border-t border-stone-100"
              >
                <Phone size={16} />
                {NavbarController.phone}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
