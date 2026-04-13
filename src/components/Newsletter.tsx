"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export class NewsletterConfig {
  static readonly title = "Restez Informé";
  static readonly subtitle = "Inscrivez-vous pour recevoir nos offres exclusives et les nouvelles collections en avant-première.";
  static readonly placeholder = "Votre adresse email";
  static readonly cta = "S'inscrire";
  static readonly successMessage = "Merci ! Vous recevrez bientôt nos exclusivités.";

  static validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

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
    <section className="py-20 bg-cream">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <p className="text-gold text-sm tracking-[0.4em] uppercase mb-4">Newsletter</p>
        <h2 className="text-3xl lg:text-4xl font-extralight text-charcoal tracking-tight">
          {NewsletterConfig.title}
        </h2>
        <p className="mt-4 text-stone-500 text-sm leading-relaxed">
          {NewsletterConfig.subtitle}
        </p>

        {submitted ? (
          <div className="mt-8 flex items-center justify-center gap-3 text-gold">
            <CheckCircle size={20} />
            <span className="text-sm">{NewsletterConfig.successMessage}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder={NewsletterConfig.placeholder}
                className="w-full px-4 py-3 border border-stone-200 text-sm text-charcoal bg-white outline-none focus:border-gold transition-colors placeholder:text-stone-400"
              />
              {error && <p className="text-xs text-red-500 mt-1 text-left">{error}</p>}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gold text-white text-sm tracking-[0.15em] uppercase hover:bg-gold-dark transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <Send size={14} />
              {NewsletterConfig.cta}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
