"use client";

import { MapPin, Phone, Clock, Compass, Navigation } from "lucide-react";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { stores } from "@/lib/data";

const accents = [
  { from: "#1fb9c3", to: "#5aa7ff" },
  { from: "#7bb6ff", to: "#9acbff" },
  { from: "#1aa99c", to: "#7cc8ff" },
];

export default function StoreLocatorPage() {
  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Nos Boutiques")]} />
        <div className="text-center mt-6 mb-12">
          <p className="section-eyebrow text-ink-soft justify-center">
            <Compass size={14} className="text-[var(--neon-cyan)]" />
            Nos points de vente
          </p>
          <h1 className="mt-4 text-4xl lg:text-6xl font-light text-ink leading-[1.05]">
            Trouvez la <span className="gradient-text font-semibold">boutique</span> la plus proche
          </h1>
          <p className="mt-3 text-ink-soft max-w-xl mx-auto">
            Une boutique a Sidi Aiche, opticiens diplomes et accueil chaleureux pour vous conseiller.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store, i) => {
            const c = accents[i % accents.length];
            return (
              <div
                key={store.id}
                className="group relative rounded-3xl overflow-hidden border border-[var(--neon-violet)]/10 bg-white transition-all"
              >
                <div
                  className="relative h-44 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                  }}
                >
                  <div className="absolute inset-0 opacity-25">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                  </div>
                  <MapPin
                    size={56}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-xl"
                    strokeWidth={1.5}
                  />
                  <div className="absolute top-3 left-3 chip bg-white/85 text-ink">
                    {store.city}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-ink">{store.name}</h2>
                  <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
                    <li className="flex items-start gap-3">
                      <MapPin size={15} className="text-[var(--neon-rose)] mt-0.5" />
                      {store.address}
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone size={15} className="text-[var(--neon-cyan)]" />
                      <a
                        href={`tel:${store.phone.replace(/\s/g, "")}`}
                        className="hover:text-[var(--neon-violet)]"
                      >
                        {store.phone}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock size={15} className="text-[var(--neon-amber)] mt-0.5" />
                      {store.hours}
                    </li>
                  </ul>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + " " + store.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs tracking-[0.22em] uppercase font-semibold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                      boxShadow: `0 12px 24px -10px ${c.from}`,
                    }}
                  >
                    <Navigation size={14} />
                    Itinéraire Google Maps
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </main>
  );
}
