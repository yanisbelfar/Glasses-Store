import { testimonials } from "@/lib/data";
import { Star } from "lucide-react";

export class TestimonialsConfig {
  static readonly sectionTitle = "Ils Nous Font Confiance";
  static readonly sectionSubtitle =
    "Plus de 5000 clients satisfaits \u00e0 travers l\u2019Alg\u00e9rie";
}

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.4em] uppercase mb-4">
            T\u00e9moignages
          </p>
          <h2 className="text-3xl lg:text-5xl font-extralight text-white tracking-tight">
            {TestimonialsConfig.sectionTitle}
          </h2>
          <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
            {TestimonialsConfig.sectionSubtitle}
          </p>
          <div className="mt-6 w-16 h-px bg-gold mx-auto" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="border border-stone-700/50 bg-stone-900/30 backdrop-blur-sm p-8"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-gold fill-gold"
                  />
                ))}
              </div>
              {/* Quote */}
              <p className="text-stone-300 text-sm leading-relaxed italic">
                &ldquo;{t.comment}&rdquo;
              </p>
              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 text-gold flex items-center justify-center text-sm font-light">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-light">{t.name}</p>
                  <p className="text-stone-500 text-xs">
                    {t.city} {t.verified && "\u2022 Client(e) v\u00e9rifi\u00e9(e)"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
