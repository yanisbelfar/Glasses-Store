"use client";

import { useState } from "react";
import { Send, CheckCircle2, Mail, Sparkles, BellRing } from "lucide-react";

export class NewsletterConfig {
  static readonly title = "Restez en avant-première";
  static readonly subtitle =
    "Rejoignez 12 000+ amateurs d'optique : nouvelles collections, ventes privées, conseils de stylistes et invitations à nos pop-up boutiques.";
  static readonly placeholder = "Votre adresse email";
  static readonly cta = "S'inscrire";
  static readonly successMessage =
    "Merci ! Vérifiez votre boîte mail, surprise futuriste à l'intérieur.";

  static validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

const perks = [
  { icon: Sparkles, text: "Accès exclusif aux nouveautés" },
  { icon: BellRing, text: "Ventes privées 7 jours avant tous" },
  { icon: Mail, text: "Conseils stylistes mensuels" },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!NewsletterConfig.validateEmail(email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#f0fefe] via-white to-[#f0f3ff]" />
      <div
        className="glow-orb"
        style={{
          width: 380,
          height: 380,
          left: "5%",
          top: "10%",
          background: "rgba(0, 180, 180, 0.18)",
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 360,
          height: 360,
          right: "5%",
          bottom: "10%",
          background: "rgba(0, 160, 160, 0.16)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-none overflow-hidden border border-white/60 bg-white/70 backdrop-blur-xl p-10 lg:p-14 shadow-xl shadow-[var(--neon-violet)]/10">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-[var(--neon-violet)] to-[var(--neon-magenta)] blur-3xl opacity-30 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-blue)] blur-3xl opacity-25 pointer-events-none" />

          <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <p className="section-eyebrow text-ink-soft">
                <Mail size={14} className="text-[var(--neon-violet)]" />
                Newsletter
              </p>
              <h2 className="mt-4 text-3xl lg:text-5xl font-light text-ink leading-[1.05]">
                {NewsletterConfig.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="gradient-text font-semibold">
                  {NewsletterConfig.title.split(" ").slice(-1)}
                </span>
              </h2>
              <p className="mt-4 text-ink-soft leading-relaxed max-w-lg">
                {NewsletterConfig.subtitle}
              </p>
              <ul className="mt-6 space-y-2">
                {perks.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li
                      key={p.text}
                      className="flex items-center gap-3 text-sm text-ink-soft"
                    >
                      <span className="w-7 h-7 grid place-items-center rounded-full bg-gradient-to-br from-[var(--neon-violet)] to-[var(--neon-magenta)] text-white">
                        <Icon size={13} />
                      </span>
                      {p.text}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              {submitted ? (
                <div className="rounded-none p-8 bg-gradient-to-br from-[var(--neon-emerald)]/15 to-[var(--neon-cyan)]/15 border border-[var(--neon-emerald)]/30 flex flex-col items-center text-center animate-scale-in">
                  <CheckCircle2 size={48} className="text-[var(--neon-emerald)] mb-3" />
                  <p className="text-lg font-semibold text-ink">
                    {NewsletterConfig.successMessage}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-none p-6 lg:p-7 bg-white border border-white/60 shadow-lg shadow-[var(--neon-violet)]/10"
                >
                  <label className="text-[11px] tracking-[0.25em] uppercase text-muted">
                    Adresse email
                  </label>
                  <div className="mt-2 flex items-center gap-2 border-b-2 border-ink/20 focus-within:border-[var(--neon-violet)] transition-colors py-2">
                    <Mail size={16} className="text-muted" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder={NewsletterConfig.placeholder}
                      className="flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted/60"
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-[var(--neon-rose)] mt-2">{error}</p>
                  )}
                  <button type="submit" className="btn-primary w-full mt-5">
                    <Send size={14} />
                    {NewsletterConfig.cta}
                  </button>
                  <p className="text-[10px] text-muted text-center mt-3 tracking-wide">
                    Aucun spam · Désinscription en 1 clic
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
