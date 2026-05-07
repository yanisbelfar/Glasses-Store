"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

export type BrandLogoSwipeItem = {
  name: string;
  logo: string;
  href: string;
  hasPhoto: boolean;
  count?: number;
};

type BrandLogoSwipeProps = {
  items: BrandLogoSwipeItem[];
  onRequestBrand: (brandName: string) => void;
};

type PointerState = {
  isDragging: boolean;
  startX: number;
  startLeft: number;
};

export default function BrandLogoSwipe({ items, onRequestBrand }: BrandLogoSwipeProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const pointerState = useRef<PointerState>({ isDragging: false, startX: 0, startLeft: 0 });

  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const node = sliderRef.current;
    if (!node) return;

    const update = () => {
      const pageWidth = Math.max(node.clientWidth, 1);
      const pages = Math.max(1, Math.ceil(node.scrollWidth / pageWidth));
      const idx = Math.min(pages - 1, Math.round(node.scrollLeft / pageWidth));
      setTotalPages(pages);
      setActivePage(idx);
      setCanPrev(node.scrollLeft > 8);
      setCanNext(node.scrollLeft + node.clientWidth < node.scrollWidth - 8);
    };

    update();
    node.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(node);
    return () => {
      node.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [items.length]);

  const scrollByPage = (dir: -1 | 1) => {
    const node = sliderRef.current;
    if (!node) return;
    node.scrollBy({ left: dir * node.clientWidth * 0.92, behavior: "smooth" });
  };

  const jumpToPage = (i: number) => {
    const node = sliderRef.current;
    if (!node) return;
    node.scrollTo({ left: node.clientWidth * i, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const node = sliderRef.current;
    if (!node) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerState.current = { isDragging: true, startX: e.clientX, startLeft: node.scrollLeft };
    node.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const node = sliderRef.current;
    if (!node || !pointerState.current.isDragging) return;
    const delta = e.clientX - pointerState.current.startX;
    node.scrollLeft = pointerState.current.startLeft - delta;
  };
  const stopDrag = () => {
    pointerState.current.isDragging = false;
  };

  if (items.length === 0) {
    return (
      <div className="mt-6 rounded-none border-2 border-dashed border-[var(--neon-violet)]/25 px-6 py-10 text-center text-sm text-muted">
        Aucune marque ne correspond à votre recherche.
      </div>
    );
  }

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted">
          Swipe horizontal · {items.length} marques
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            className="w-10 h-10 grid place-items-center rounded-full border border-[var(--neon-violet)]/15 text-ink hover:border-[var(--neon-violet)] hover:text-[var(--neon-violet)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            className="w-10 h-10 grid place-items-center rounded-full border border-[var(--neon-violet)]/15 text-ink hover:border-[var(--neon-violet)] hover:text-[var(--neon-violet)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onPointerLeave={stopDrag}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-3 snap-x snap-mandatory touch-pan-y cursor-grab active:cursor-grabbing"
      >
        {items.map((item, i) => {
          const card = (
            <div
              className="min-w-[180px] sm:min-w-[200px] lg:min-w-[230px] snap-start rounded-none border border-[var(--neon-violet)]/10 bg-white px-5 py-6 text-center hover:border-[var(--neon-violet)]/30 hover:shadow-lg hover:shadow-[var(--neon-violet)]/10 transition-all"
              style={{
                background: i % 4 === 0 ? "linear-gradient(180deg, #ffffff 0%, #f0fefe 100%)"
                  : i % 4 === 1 ? "linear-gradient(180deg, #ffffff 0%, #fff5fb 100%)"
                  : i % 4 === 2 ? "linear-gradient(180deg, #ffffff 0%, #fef9f3 100%)"
                  : "linear-gradient(180deg, #ffffff 0%, #f3fff9 100%)",
              }}
            >
              <div className="h-16 sm:h-20 flex items-center justify-center px-2">
                <Image
                  src={item.logo}
                  alt={`Logo ${item.name}`}
                  width={320}
                  height={96}
                  className="max-h-full w-auto max-w-full object-contain"
                />
              </div>
              <p className="mt-3 text-[11px] tracking-[0.2em] uppercase text-ink font-semibold">
                {item.name}
              </p>
              {item.count !== undefined && (
                <p className="text-[10px] text-muted mt-0.5">
                  {item.count} référence{item.count > 1 ? "s" : ""}
                </p>
              )}
              {!item.hasPhoto && (
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-[var(--neon-emerald)]">
                  <MessageCircle size={11} /> Demande
                </div>
              )}
            </div>
          );

          if (item.hasPhoto) {
            return (
              <Link key={item.name} href={item.href} className="block">
                {card}
              </Link>
            );
          }
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onRequestBrand(item.name)}
              className="text-left"
            >
              {card}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => jumpToPage(i)}
            className={`${
              i === activePage
                ? "w-10 bg-gradient-to-r from-[var(--neon-violet)] to-[var(--neon-magenta)]"
                : "w-5 bg-[var(--neon-violet)]/20 hover:bg-[var(--neon-violet)]/40"
            } h-[3px] rounded-full transition-all`}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
