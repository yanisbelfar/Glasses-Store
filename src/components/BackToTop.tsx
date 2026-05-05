"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      setVisible(scrolled > 400);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const dash = (progress / 100) * circumference;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 grid place-items-center rounded-full bg-gradient-to-br from-[var(--neon-violet)] to-[var(--neon-magenta)] text-white shadow-2xl shadow-[var(--neon-violet)]/40 hover:scale-110 hover:rotate-3 transition-all"
      aria-label="Retour en haut"
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" width="56" height="56">
        <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <ArrowUp size={18} />
    </button>
  );
}
