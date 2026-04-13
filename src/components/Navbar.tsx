"use client";

import { useState } from "react";
import { Menu, X, Search, ShoppingBag, Phone } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Solaire", href: "/collections/solaire" },
  { label: "Optique", href: "/collections/optique" },
  { label: "Lentilles", href: "/collections/lentilles" },
  { label: "Sport", href: "/collections/sport" },
  { label: "Marques", href: "/marques" },
];

export class NavbarController {
  static readonly brandName = "NEW LOOK OPTIC";
  static readonly phone = "0555 12 34 56";
  static readonly promoBanner = "Livraison Gratuite dès 2 articles | Paiement à la livraison";
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-widest uppercase text-stone-600 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <a
                href={`tel:${NavbarController.phone.replace(/\s/g, "")}`}
                className="hidden sm:flex items-center gap-2 text-sm text-stone-600 hover:text-gold transition-colors"
              >
                <Phone size={16} />
                <span className="hidden md:inline">{NavbarController.phone}</span>
              </a>
              <button className="p-2 text-charcoal hover:text-gold transition-colors" aria-label="Rechercher">
                <Search size={20} />
              </button>
              <button className="p-2 text-charcoal hover:text-gold transition-colors relative" aria-label="Panier">
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-stone-100">
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm tracking-[0.2em] uppercase text-stone-700 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
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
