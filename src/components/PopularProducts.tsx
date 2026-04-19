import { popularProducts } from "@/lib/data";
import { Eye } from "lucide-react";
import Link from "next/link";

export class PopularProductsConfig {
  static readonly sectionTitle = "Les Plus Populaires";
  static readonly sectionSubtitle =
    "D\u00e9couvrez les montures pr\u00e9f\u00e9r\u00e9es de nos clients dans toutes nos cat\u00e9gories";
}

export default function PopularProducts() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.4em] uppercase mb-4">
            Tendances
          </p>
          <h2 className="text-3xl lg:text-5xl font-extralight text-charcoal tracking-tight">
            {PopularProductsConfig.sectionTitle}
          </h2>
          <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
            {PopularProductsConfig.sectionSubtitle}
          </p>
          <div className="mt-6 w-16 h-px bg-gold mx-auto" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden bg-stone-100 aspect-square">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-200 group-hover:from-stone-100 group-hover:to-stone-300 transition-colors duration-500">
                  <Eye
                    size={36}
                    className="text-stone-300 group-hover:text-gold/50 transition-colors duration-500"
                    strokeWidth={1}
                  />
                </div>
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-500" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400">
                  {product.category}
                </p>
                <h3 className="text-sm font-light text-charcoal mt-1 group-hover:text-gold transition-colors truncate">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* See All */}
        <div className="text-center mt-14">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-charcoal hover:text-gold border-b border-charcoal hover:border-gold pb-1 transition-colors duration-300"
          >
            Voir Tous les Produits
          </Link>
        </div>
      </div>
    </section>
  );
}
