"use client";

import { useState } from "react";
import { faceShapeQuestions, sizeGuide, allProducts } from "@/lib/data";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Compass, Sparkles, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function FaceShapePage() {
  const [step, setStep] = useState(0);
  const [tally, setTally] = useState<Record<string, number>>({});

  const isDone = step >= faceShapeQuestions.length;
  const winningShape = isDone
    ? Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Ovale"
    : null;
  const guideEntry = winningShape ? sizeGuide.find((g) => g.faceShape === winningShape) : null;
  const recommendedProducts = guideEntry
    ? allProducts.filter((p) => p.shape && guideEntry.recommended.includes(p.shape)).slice(0, 6)
    : [];

  const choose = (shapes: string[]) => {
    setTally((prev) => {
      const next = { ...prev };
      shapes.forEach((s) => {
        next[s] = (next[s] ?? 0) + 1;
      });
      return next;
    });
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setTally({});
  };

  const progress = (step / faceShapeQuestions.length) * 100;

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Quiz forme du visage")]} />

        <div className="text-center mt-6 mb-10">
          <p className="section-eyebrow text-ink-soft justify-center">
            <Compass size={14} className="text-[var(--neon-violet)]" />
            Quiz · Forme du visage
          </p>
          <h1 className="mt-4 text-4xl lg:text-6xl font-light text-ink leading-[1.05]">
            Trouvez la <span className="gradient-text font-semibold">monture</span> qui vous va vraiment
          </h1>
          <p className="mt-3 text-ink-soft max-w-xl mx-auto">
            3 questions, 60 secondes. On vous propose ensuite les formes qui flattent vos traits
            naturels — basé sur les recommandations de nos opticiens.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-[var(--neon-violet)]/15 bg-white shadow-xl shadow-[var(--neon-violet)]/10 p-8 lg:p-12">
          <div
            className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-gradient-to-br from-[var(--neon-violet)] to-[var(--neon-magenta)] blur-3xl opacity-25 pointer-events-none"
          />
          {/* Progress */}
          <div className="relative flex items-center justify-between mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-muted">
              {isDone ? "Résultat" : `Question ${step + 1} / ${faceShapeQuestions.length}`}
            </p>
            <div className="flex-1 mx-4 h-1.5 bg-[#f5f7ff] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--neon-violet)] via-[var(--neon-magenta)] to-[var(--neon-cyan)] transition-all duration-500"
                style={{ width: `${isDone ? 100 : progress}%` }}
              />
            </div>
            {(step > 0 || isDone) && (
              <button
                onClick={reset}
                className="text-xs text-muted hover:text-[var(--neon-rose)] inline-flex items-center gap-1"
              >
                <RotateCcw size={12} /> Reprendre
              </button>
            )}
          </div>

          {!isDone ? (
            <div className="relative animate-fade-in">
              <h2 className="text-2xl lg:text-3xl font-semibold text-ink leading-tight">
                {faceShapeQuestions[step].question}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 mt-7">
                {faceShapeQuestions[step].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => choose(opt.shapes)}
                    className="group text-left p-5 rounded-2xl border border-[var(--neon-violet)]/15 bg-white hover:border-[var(--neon-violet)]/40 hover:bg-[var(--neon-violet)]/4 transition-all"
                  >
                    <p className="text-base text-ink font-medium">{opt.label}</p>
                    <p className="text-xs text-[var(--neon-violet)] tracking-[0.2em] uppercase mt-2 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Choisir <ArrowRight size={12} />
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative animate-fade-in">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--neon-amber)]/15 text-[var(--neon-amber)] text-xs font-semibold">
                  <Sparkles size={12} /> Diagnostic terminé
                </span>
                <h2 className="mt-5 text-3xl lg:text-4xl font-semibold text-ink">
                  Votre visage est plutôt{" "}
                  <span className="gradient-text">{winningShape}</span>
                </h2>
                {guideEntry && (
                  <p className="mt-3 text-ink-soft max-w-2xl mx-auto">
                    {guideEntry.description}
                  </p>
                )}
              </div>

              {guideEntry && (
                <div className="mt-8 grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                  {guideEntry.recommended.map((shape) => (
                    <div
                      key={shape}
                      className="rounded-2xl p-4 border border-[var(--neon-violet)]/15 bg-gradient-to-br from-[#fafbff] to-white text-center"
                    >
                      <p className="text-[10px] tracking-[0.25em] uppercase text-muted">
                        Forme recommandée
                      </p>
                      <p className="mt-1 text-xl font-semibold text-ink">{shape}</p>
                    </div>
                  ))}
                </div>
              )}

              {recommendedProducts.length > 0 && (
                <div className="mt-12">
                  <p className="text-sm tracking-[0.22em] uppercase text-muted mb-5">
                    Modèles parfaits pour vous
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {recommendedProducts.slice(0, 3).map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <Link href="/collections/all" className="btn-primary">
                      Voir toutes les recommandations
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
