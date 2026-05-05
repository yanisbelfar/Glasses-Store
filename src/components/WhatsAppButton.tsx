"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/213555852457"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 group"
      aria-label="Contacter sur WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-glow" />
      <span className="relative w-14 h-14 grid place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-500/40 group-hover:scale-110 transition-transform">
        <MessageCircle size={20} />
      </span>
      <span className="absolute left-16 top-1/2 -translate-y-1/2 hidden group-hover:block text-xs whitespace-nowrap bg-white text-ink px-3 py-1.5 rounded-full shadow-md">
        Conseil immédiat
      </span>
    </a>
  );
}
