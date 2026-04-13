import { categories } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export class CategoriesConfig {
  static readonly sectionTitle = "Explorez par Cat\u00e9gorie";
  static readonly sectionSubtitle =
    "Trouvez la monture parfaite pour chaque occasion et chaque style";
}

export default function Categories() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.4em] uppercase mb-4">
            Notre Univers
          </p>
          <h2 className="text-3xl lg:text-5xl font-extralight text-charcoal tracking-tight">
            {CategoriesConfig.sectionTitle}
          </h2>
          <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
            {CategoriesConfig.sectionSubtitle}
          </p>
          <div className="mt-6 w-16 h-px bg-gold mx-auto" />
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              className="group relative overflow-hidden bg-white border border-stone-200 hover:border-gold/50 transition-all duration-500"
            >
              <div className="p-8 lg:p-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-light text-charcoal tracking-wide uppercase group-hover:text-gold transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-stone-400 mt-2">{cat.description}</p>
                    <p className="text-xs tracking-[0.2em] text-gold mt-4">
                      {cat.productCount} produits
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-stone-300 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300 mt-1 shrink-0"
                  />
                </div>
              </div>
              {/* Bottom gold line on hover */}
              <div className="h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
