import { featuredProducts, Product } from "@/lib/data";
import { Eye } from "lucide-react";
import Link from "next/link";

export class FeaturedProductsConfig {
  static readonly sectionTitle = "Nos Pi\u00e8ces d\u2019Exception";
  static readonly sectionSubtitle =
    "Une s\u00e9lection rigoureuse des plus belles montures pour un style qui vous ressemble";

  static getBadgeStyle(badge: Product["badge"]): string {
    switch (badge) {
      case "best-seller":
        return "bg-gold text-white";
      case "nouveau":
        return "bg-charcoal text-white";
      case "tendance":
        return "bg-stone-600 text-white";
      default:
        return "";
    }
  }

  static getBadgeLabel(badge: Product["badge"]): string {
    switch (badge) {
      case "best-seller":
        return "\u2605 Best Seller";
      case "nouveau":
        return "Nouveau";
      case "tendance":
        return "Tendance";
      default:
        return "";
    }
  }
}

export default function FeaturedProducts() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.4em] uppercase mb-4">
            Collection Exclusive
          </p>
          <h2 className="text-3xl lg:text-5xl font-extralight text-charcoal tracking-tight">
            {FeaturedProductsConfig.sectionTitle}
          </h2>
          <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
            {FeaturedProductsConfig.sectionSubtitle}
          </p>
          <div className="mt-6 w-16 h-px bg-gold mx-auto" />
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden bg-stone-100 aspect-[4/3]">
                {/* Placeholder image area */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 group-hover:from-stone-200 group-hover:to-stone-300 transition-colors duration-500">
                  <Eye
                    size={48}
                    className="text-stone-300 group-hover:text-gold/50 transition-colors duration-500"
                    strokeWidth={1}
                  />
                </div>
                {/* Badge */}
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-[10px] tracking-[0.2em] uppercase ${FeaturedProductsConfig.getBadgeStyle(product.badge)}`}
                  >
                    {FeaturedProductsConfig.getBadgeLabel(product.badge)}
                  </span>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-charcoal text-white text-xs tracking-[0.2em] uppercase px-6 py-3 w-full text-center">
                    Découvrir
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-xs tracking-[0.2em] uppercase text-gold mb-1">
                  {product.category}
                </p>
                <h3 className="text-lg font-light text-charcoal group-hover:text-gold transition-colors">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-sm text-stone-400 mt-1">{product.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
