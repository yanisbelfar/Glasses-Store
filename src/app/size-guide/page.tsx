"use client";

import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { sizeGuide } from "@/lib/data";

export default function SizeGuidePage() {
  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Guide des Tailles")]} />
        <div className="text-center mt-6 mb-12">
          <h1 className="text-3xl lg:text-4xl font-extralight text-charcoal">
            Guide des Tailles
          </h1>
          <p className="text-sm text-stone-400 mt-3 max-w-xl mx-auto">
            Trouvez la monture parfaite adaptée à la forme de votre visage et à votre morphologie.
          </p>
        </div>

        {/* How to Measure */}
        <section className="mb-12 border border-stone-200 p-8">
          <h2 className="text-xl font-light text-charcoal mb-4">Comment mesurer ?</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm text-stone-500">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold mb-2">Largeur de monture</p>
              <p>Mesurez d&apos;une charnière à l&apos;autre. C&apos;est la mesure la plus importante pour le confort.</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold mb-2">Largeur de verre</p>
              <p>Le diamètre horizontal du verre, souvent indiqué sur la branche intérieure (ex : 52□18).</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold mb-2">Longueur de branche</p>
              <p>De la charnière à l&apos;extrémité. Généralement entre 135mm et 150mm.</p>
            </div>
          </div>
        </section>

        {/* Face Shape Guide */}
        <section>
          <h2 className="text-xl font-light text-charcoal mb-6">
            Forme du visage & monture recommandée
          </h2>
          <div className="space-y-4">
            {sizeGuide.map((entry) => (
              <div
                key={entry.faceShape}
                className="border border-stone-200 p-6 hover:border-gold/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-light text-charcoal">
                      Visage {entry.faceShape}
                    </h3>
                    <p className="text-sm text-stone-400 mt-1">{entry.description}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs tracking-[0.2em] uppercase text-gold mb-1">
                      Formes recommandées
                    </p>
                    <div className="flex flex-wrap sm:justify-end gap-2">
                      {entry.recommended.map((shape) => (
                        <span
                          key={shape}
                          className="px-3 py-1 bg-stone-100 text-xs text-stone-600"
                        >
                          {shape}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-stone-400 mt-2">
                      Taille idéale : {entry.frameWidth}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
