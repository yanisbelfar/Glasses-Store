"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { stores } from "@/lib/data";

export default function StoreLocatorPage() {
  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Nos Boutiques")]} />
        <div className="text-center mt-6 mb-12">
          <h1 className="text-3xl lg:text-4xl font-extralight text-charcoal">
            Nos Boutiques
          </h1>
          <p className="text-sm text-stone-400 mt-3 max-w-xl mx-auto">
            Retrouvez-nous dans nos boutiques à travers l&apos;Algérie. Notre équipe d&apos;opticiens
            diplômés vous accueille pour un conseil personnalisé.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store) => (
            <div key={store.name} className="border border-stone-200 p-6 hover:border-gold/30 transition-colors">
              <div className="w-full h-48 bg-stone-100 flex items-center justify-center mb-6">
                <MapPin size={32} className="text-stone-300" strokeWidth={1} />
              </div>
              <h2 className="text-lg font-light text-charcoal mb-4">{store.name}</h2>
              <div className="space-y-3 text-sm text-stone-500">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gold flex-shrink-0" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>{store.hours}</span>
                </div>
              </div>
              <button className="mt-6 w-full py-3 border border-charcoal text-charcoal text-xs tracking-[0.2em] uppercase hover:bg-charcoal hover:text-white transition-colors">
                Itinéraire
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
