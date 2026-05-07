import Link from "next/link";
import {
  Phone,
  Clock,
  MapPin,
  Sparkles,
  Send,
  Heart,
  Mail,
} from "lucide-react";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
  </svg>
);

export class FooterConfig {
  static readonly brandName = "NEWLOOK OPTIC SIDI AICHE";
  static readonly tagline = "Opticien · Sidi Aiche";
  static readonly ctaTitle = "Prêt à voir le monde autrement ?";
  static readonly ctaSubtitle =
    "Rejoignez plus de 5000 clients qui ont choisi Newlook Optic Sidi Aiche pour leur regard. Conseil personnalise par nos experts optiques.";
  static readonly phone = "+213 555 85 24 57";
  static readonly hours = "Sam-Jeu : 9h-18h · Ven : 9h-12h";
  static readonly location = "Sidi Aiche";

  static readonly categoryLinks = [
    { label: "Tous les Produits", href: "/collections/all" },
    { label: "Lunettes Homme", href: "/collections/homme" },
    { label: "Lunettes Femme", href: "/collections/femme" },
    { label: "Lunettes Enfant", href: "/collections/enfant" },
    { label: "Toutes les marques", href: "/marques" },
  ];

  static readonly toolLinks = [
    { label: "Essai virtuel 3D", href: "/virtual-try-on" },
    { label: "Quiz forme du visage", href: "/face-shape" },
    { label: "Configurateur verres", href: "/lens-configurator" },
    { label: "Comparateur", href: "/compare" },
    { label: "Prendre RDV", href: "/appointment" },
  ];

  static readonly socials = [
    { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
    { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
    { label: "Twitter", href: "https://twitter.com", Icon: TwitterIcon },
  ];
}

export default function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#e0f5f5] via-white to-[#d0f0f0]" />
        <div className="aurora opacity-50" />
        <div className="noise opacity-30" />

        <div className="relative max-w-4xl mx-auto px-4 text-center text-ink">
          <p className="section-eyebrow text-ink-soft justify-center">
            <Sparkles size={14} className="text-[var(--neon-amber)]" />
            Votre regard mérite l&apos;exception
          </p>
          <h2 className="mt-5 text-4xl lg:text-6xl font-light tracking-tight">
            {FooterConfig.ctaTitle.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="gradient-text font-semibold">
              {FooterConfig.ctaTitle.split(" ").slice(-2).join(" ")}
            </span>
          </h2>
          <p className="mt-6 text-ink-soft max-w-xl mx-auto leading-relaxed">
            {FooterConfig.ctaSubtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/collections/all" className="btn-primary">
              Découvrir la collection
              <Send size={14} />
            </Link>
            <a
              href="https://wa.me/213555852457"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-[0.85rem] rounded-full text-[0.78rem] tracking-[0.22em] uppercase font-semibold text-ink border border-[var(--neon-violet)]/30 bg-white/80 backdrop-blur-md hover:bg-white hover:border-[var(--neon-emerald)] transition-all"
            >
              <Phone size={14} />
              Conseil WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#e6f9f9] text-ink-soft relative overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(123,182,255,0.6), rgba(111,220,255,0.6), rgba(154,203,255,0.6), transparent)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-3 mb-4">
                <span className="w-11 h-11 grid place-items-center rounded-none bg-gradient-to-br from-[var(--neon-violet)] via-[var(--neon-magenta)] to-[var(--neon-cyan)] text-white">
                  <Sparkles size={20} />
                </span>
                <div>
                  <span className="text-lg font-semibold tracking-[0.22em] gradient-text">
                    {FooterConfig.brandName}
                  </span>
                  <p className="text-[10px] tracking-[0.32em] text-ink-soft uppercase mt-0.5">
                    {FooterConfig.tagline}
                  </p>
                </div>
              </Link>
              <p className="text-sm text-ink-soft leading-relaxed max-w-md">
                Opticien moderne a Sidi Aiche. Plus de 60 marques, conseil personnalise,
                essai virtuel 3D et conseil personnalise. Votre regard, notre signature.
              </p>
              <div className="flex gap-2 mt-6">
                {FooterConfig.socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full grid place-items-center border border-[var(--neon-violet)]/25 text-ink-soft hover:text-ink hover:border-[var(--neon-violet)] hover:bg-[var(--neon-violet)]/10 transition-all"
                    aria-label={label}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-ink mb-5">
                Catégories
              </h3>
              <ul className="space-y-2.5">
                {FooterConfig.categoryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft hover:text-[var(--neon-cyan)] transition-colors"
                    >
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-ink mb-5">
                Outils
              </h3>
              <ul className="space-y-2.5">
                {FooterConfig.toolLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft hover:text-[var(--neon-magenta)] transition-colors"
                    >
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-ink mb-5">
                Contact
              </h3>
              <ul className="space-y-3 text-sm text-ink-soft">
                <li className="flex items-start gap-3">
                  <Phone size={15} className="text-[var(--neon-cyan)] mt-0.5" />
                  <a
                    href={`tel:${FooterConfig.phone.replace(/\s/g, "")}`}
                    className="hover:text-ink transition-colors"
                  >
                    {FooterConfig.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={15} className="text-[var(--neon-violet)] mt-0.5" />
                  <span>contact@newlookoptic.dz</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={15} className="text-[var(--neon-amber)] mt-0.5" />
                  {FooterConfig.hours}
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="text-[var(--neon-rose)] mt-0.5" />
                  {FooterConfig.location}
                </li>
              </ul>
              <div className="mt-5 pt-5 border-t border-[var(--neon-violet)]/15">
                <p className="text-[10px] tracking-[0.25em] uppercase text-ink-soft mb-2">
                  Paiement
                </p>
                <p className="text-xs text-ink-soft">
                  Espèces · BaridiMob · Edahabia · CCP
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--neon-violet)]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-ink-soft inline-flex items-center gap-1.5">
              © 2026 {FooterConfig.brandName} · Fait avec
              <Heart size={11} className="text-[var(--neon-rose)]" fill="currentColor" />
              a Sidi Aiche
            </p>
            <div className="flex gap-5">
              <Link href="/pages/about" className="text-xs text-ink-soft hover:text-ink transition-colors">
                À Propos
              </Link>
              <Link href="/pages/contact" className="text-xs text-ink-soft hover:text-ink transition-colors">
                Contact
              </Link>
              <Link href="/pages/cgv" className="text-xs text-ink-soft hover:text-ink transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </footer>
     </>
  );
}
