import Link from "next/link";
import { Phone, Clock, MapPin } from "lucide-react";

export class FooterConfig {
  static readonly brandName = "NEW LOOK OPTIC";
  static readonly tagline = "Opticien de Luxe \u00b7 Alg\u00e9rie";
  static readonly ctaTitle = "Sublimez Votre Regard Aujourd\u2019hui";
  static readonly ctaSubtitle =
    "Rejoignez plus de 5000 clients qui ont choisi l\u2019excellence avec New Look Optic.";
  static readonly phone = "0555 12 34 56";
  static readonly hours = "Sam-Jeu : 9h-18h";
  static readonly location = "Alg\u00e9rie \ud83c\udde9\ud83c\uddff";

  static readonly categoryLinks = [
    { label: "Tous les Produits", href: "/collections/all" },
    { label: "Lunettes de Soleil", href: "/collections/solaire" },
    { label: "Lunettes Optiques", href: "/collections/optique" },
    { label: "Lentilles de Contact", href: "/collections/lentilles" },
    { label: "Lunettes de Sport", href: "/collections/sport" },
    { label: "Accessoires", href: "/collections/accessoires" },
  ];

  static readonly serviceLinks = [
    { label: "Livraison 24-48h", href: "#" },
    { label: "Garantie 2 ans", href: "#" },
    { label: "Paiement s\u00e9curis\u00e9", href: "#" },
    { label: "Support expert", href: "#" },
  ];

  static readonly socials = [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  ];
}

export default function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-stone-100 to-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-extralight text-charcoal tracking-tight">
            {FooterConfig.ctaTitle}
          </h2>
          <p className="mt-6 text-stone-500 max-w-xl mx-auto">
            {FooterConfig.ctaSubtitle}
          </p>
          <div className="mt-10">
            <Link
              href="/collections/all"
              className="inline-flex items-center justify-center px-10 py-4 bg-gold text-white text-sm tracking-[0.2em] uppercase hover:bg-gold-dark transition-all duration-300"
            >
              D\u00e9couvrir la Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-stone-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <Link href="/" className="block mb-4">
                <span className="text-xl font-light tracking-[0.3em] text-white">
                  {FooterConfig.brandName}
                </span>
                <br />
                <span className="text-[10px] tracking-[0.4em] text-gold uppercase">
                  {FooterConfig.tagline}
                </span>
              </Link>
              <div className="flex gap-3 mt-6">
                {FooterConfig.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-stone-700 flex items-center justify-center text-stone-500 hover:text-gold hover:border-gold transition-colors text-xs tracking-widest uppercase"
                      aria-label={s.label}
                    >
                      {s.label.charAt(0)}
                    </a>
                  ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-white mb-6">
                Cat\u00e9gories
              </h3>
              <ul className="space-y-3">
                {FooterConfig.categoryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-gold transition-colors"
                    >
                      \u2192 {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-white mb-6">
                Services
              </h3>
              <ul className="space-y-3">
                {FooterConfig.serviceLinks.map((link) => (
                  <li key={link.label}>
                    <span className="text-sm">{link.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-stone-800">
                <p className="text-xs tracking-[0.2em] uppercase text-stone-600 mb-2">
                  Paiement
                </p>
                <p className="text-sm">Esp\u00e8ces \u00b7 BaridiMob \u00b7 Edahabia</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-white mb-6">
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-gold shrink-0" />
                  <a
                    href={`tel:${FooterConfig.phone.replace(/\s/g, "")}`}
                    className="hover:text-gold transition-colors"
                  >
                    {FooterConfig.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Clock size={16} className="text-gold shrink-0" />
                  {FooterConfig.hours}
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-gold shrink-0" />
                  {FooterConfig.location}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-600">
              \u00a9 2026 {FooterConfig.brandName} \u00b7 Alg\u00e9rie
            </p>
            <div className="flex gap-6">
              <Link href="/pages/about" className="text-xs text-stone-600 hover:text-gold transition-colors">
                \u00c0 Propos
              </Link>
              <Link href="/pages/contact" className="text-xs text-stone-600 hover:text-gold transition-colors">
                Contact
              </Link>
              <Link href="/pages/cgv" className="text-xs text-stone-600 hover:text-gold transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
