import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export class BreadcrumbItem {
  constructor(
    public label: string,
    public href?: string,
  ) {}
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted py-2 overflow-x-auto no-scrollbar">
      <Link
        href="/"
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full hover:bg-[var(--neon-violet)]/8 hover:text-[var(--neon-violet)] transition-colors shrink-0"
      >
        <Home size={11} />
        Accueil
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5 shrink-0">
          <ChevronRight size={11} className="text-muted/50" />
          {item.href ? (
            <Link
              href={item.href}
              className="px-2.5 py-1 rounded-full hover:bg-[var(--neon-violet)]/8 hover:text-[var(--neon-violet)] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-[var(--neon-violet)]/8 text-[var(--neon-violet)] font-semibold">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
