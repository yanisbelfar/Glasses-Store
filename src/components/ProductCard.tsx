"use client";

import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { Product } from "@/lib/data";
import { useStore } from "@/lib/store";

const accentByCategory: Record<string, { from: string; to: string; ring: string }> = {
  Soleil: { from: "#4AABDB", to: "#6DC4ED", ring: "rgba(74,171,219,0.35)" },
  Homme: { from: "#4AABDB", to: "#6DC4ED", ring: "rgba(74,171,219,0.35)" },
  Femme: { from: "#4AABDB", to: "#6DC4ED", ring: "rgba(74,171,219,0.35)" },
  Enfant: { from: "#4AABDB", to: "#6DC4ED", ring: "rgba(74,171,219,0.35)" },
};

function badgeStyle(badge?: Product["badge"]) {
  switch (badge) {
    case "best-seller":
      return {
        label: "★ Best Seller",
        className: "bg-gradient-to-r from-[var(--neon-amber)] to-[var(--neon-rose)]",
      };
    case "nouveau":
      return {
        label: "✦ Nouveau",
        className: "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)]",
      };
    case "tendance":
      return {
        label: "Tendance",
        className: "bg-gradient-to-r from-[var(--neon-violet)] to-[var(--neon-magenta)]",
      };
    default:
      return null;
  }
}

export default function ProductCard({
  product,
  size = "md",
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
}) {
  const { state, dispatch } = useStore();
  const isWished = state.wishlist.includes(product.id);
  const accent = accentByCategory[product.category] ?? accentByCategory.Homme;
  const badge = badgeStyle(product.badge);

  const titleClass =
    size === "lg" ? "text-lg font-semibold" : size === "sm" ? "text-xs font-medium" : "text-sm font-semibold";

  return (
    <div
      className="product-card group relative tilt-3d"
      style={{ ["--ring" as string]: accent.ring }}
    >
      {/* Image area */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="image-wrap aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* color accent overlay */}
          <div
            className="absolute -inset-2 opacity-0 group-hover:opacity-50 transition-opacity duration-500 mix-blend-soft-light pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
            }}
          />
          {/* hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>

      {/* Floating badges */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
        <div className="flex flex-col gap-1.5 pointer-events-auto">
          {badge && (
            <span
              className={`chip text-white shadow-lg shadow-[var(--ring)] ${badge.className}`}
            >
              {badge.label}
            </span>
          )}
          <span
            className="chip bg-white/85 backdrop-blur text-ink-soft"
            style={{ color: accent.from }}
          >
            {product.brand}
          </span>
        </div>
        <div className="flex flex-col gap-1.5 pointer-events-auto">
          <button
            onClick={() => dispatch({ type: "TOGGLE_WISHLIST", productId: product.id })}
            className={`w-9 h-9 grid place-items-center rounded-full shadow-md transition-all ${
              isWished
                ? "bg-gradient-to-br from-[var(--neon-rose)] to-[var(--neon-magenta)] text-white"
                : "bg-white/85 backdrop-blur text-ink-soft hover:text-[var(--neon-rose)]"
            }`}
            aria-label="Favoris"
            type="button"
          >
            <Heart size={15} fill={isWished ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => dispatch({ type: "OPEN_QUICK_VIEW", productId: product.id })}
            className="w-9 h-9 grid place-items-center rounded-full bg-white/85 backdrop-blur text-ink-soft hover:text-[var(--neon-violet)] shadow-md transition-all opacity-0 group-hover:opacity-100"
            aria-label="Aperçu rapide"
            type="button"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Bottom info — marque uniquement */}
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <Link href={`/products/${product.id}`}>
          <p
            className="text-sm font-bold tracking-[0.12em] uppercase text-ink group-hover:text-[#4AABDB] transition-colors"
          >
            {product.brand}
          </p>
        </Link>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
      />
    </div>
  );
}
