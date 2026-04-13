import Link from "next/link";
import { ChevronRight } from "lucide-react";

export class BreadcrumbItem {
  constructor(
    public label: string,
    public href?: string,
  ) {}
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-stone-400 py-4 overflow-x-auto">
      <Link href="/" className="hover:text-gold transition-colors shrink-0">Accueil</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2 shrink-0">
          <ChevronRight size={12} />
          {item.href ? (
            <Link href={item.href} className="hover:text-gold transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-charcoal">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
