"use client";

import { useState } from "react";
import { appointmentSlots, stores } from "@/lib/data";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { CalendarDays, Clock, MapPin, User, Phone, Mail, Sparkles, Check } from "lucide-react";

const services = [
  { id: "exam", label: "Examen visuel complet", duration: "45 min" },
  { id: "fitting", label: "Essayage & ajustement", duration: "30 min" },
  { id: "advice", label: "Conseil styliste", duration: "20 min" },
  { id: "lens", label: "Configuration verres", duration: "30 min" },
];

export default function AppointmentPage() {
  const [store, setStore] = useState(stores[0].id);
  const [service, setService] = useState(services[0].id);
  const [day, setDay] = useState(appointmentSlots[0].id);
  const [hour, setHour] = useState(appointmentSlots[0].hours[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const dayObj = appointmentSlots.find((d) => d.id === day);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      return;
    }
    setConfirmed(true);
  };

  return (
    <main className="flex-1 pt-28 lg:pt-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumbs items={[new BreadcrumbItem("Rendez-vous")]} />

        <div className="text-center mt-6 mb-10">
          <p className="section-eyebrow text-ink-soft justify-center">
            <CalendarDays size={14} className="text-[var(--neon-emerald)]" />
            Prendre Rendez-vous
          </p>
          <h1 className="mt-4 text-4xl lg:text-6xl font-light text-ink leading-[1.05]">
            Rencontrez nos <span className="gradient-text font-semibold">opticiens experts</span>
          </h1>
          <p className="mt-3 text-ink-soft max-w-xl mx-auto">
            Bilan visuel, essayage, conseil styliste — réservez votre créneau en boutique en moins de 60 secondes.
          </p>
        </div>

        {confirmed ? (
          <div className="rounded-3xl border border-[var(--neon-emerald)]/30 bg-gradient-to-br from-[var(--neon-emerald)]/10 via-white to-[var(--neon-cyan)]/10 p-10 text-center animate-scale-in">
            <span className="inline-grid place-items-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--neon-emerald)] to-[var(--neon-cyan)] text-white">
              <Check size={36} />
            </span>
            <h2 className="mt-5 text-3xl font-semibold text-ink">
              Votre rendez-vous est <span className="gradient-text">confirmé</span> !
            </h2>
            <p className="mt-3 text-ink-soft max-w-xl mx-auto">
              {name}, on vous attend {dayObj?.day} {dayObj?.date} à {hour} dans la boutique{" "}
              {stores.find((s) => s.id === store)?.name}. Un SMS de confirmation va arriver au {phone}.
            </p>
            <button onClick={() => setConfirmed(false)} className="btn-ghost mt-6">
              Modifier le rendez-vous
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid lg:grid-cols-[1.1fr_1fr] gap-7">
            {/* Left: choices */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-[var(--neon-violet)]/15 bg-white p-6 shadow-md shadow-[var(--neon-violet)]/5">
                <p className="text-xs tracking-[0.25em] uppercase text-muted">1. Boutique</p>
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  {stores.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStore(s.id)}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        store === s.id
                          ? "border-[var(--neon-violet)] bg-[var(--neon-violet)]/5"
                          : "border-[var(--neon-violet)]/10 hover:border-[var(--neon-violet)]/30"
                      }`}
                    >
                      <p className="font-semibold text-ink flex items-center gap-2">
                        <MapPin size={14} className="text-[var(--neon-rose)]" />
                        {s.city}
                      </p>
                      <p className="text-xs text-muted">{s.address}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[var(--neon-violet)]/15 bg-white p-6 shadow-md shadow-[var(--neon-violet)]/5">
                <p className="text-xs tracking-[0.25em] uppercase text-muted">2. Service</p>
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setService(s.id)}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        service === s.id
                          ? "border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/8"
                          : "border-[var(--neon-violet)]/10 hover:border-[var(--neon-cyan)]/30"
                      }`}
                    >
                      <p className="font-semibold text-ink">{s.label}</p>
                      <p className="text-xs text-muted">~ {s.duration}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[var(--neon-violet)]/15 bg-white p-6 shadow-md shadow-[var(--neon-violet)]/5">
                <p className="text-xs tracking-[0.25em] uppercase text-muted">3. Date & créneau</p>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {appointmentSlots.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        setDay(d.id);
                        setHour(d.hours[0]);
                      }}
                      className={`min-w-[88px] px-3 py-3 rounded-2xl border text-center transition-all ${
                        day === d.id
                          ? "border-[var(--neon-magenta)] bg-[var(--neon-magenta)]/8"
                          : "border-[var(--neon-violet)]/10 hover:border-[var(--neon-magenta)]/30"
                      }`}
                    >
                      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">
                        {d.day}
                      </p>
                      <p className="text-base font-semibold text-ink mt-1">{d.date}</p>
                    </button>
                  ))}
                </div>
                {dayObj && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {dayObj.hours.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setHour(h)}
                        className={`py-2.5 rounded-full text-sm border transition-all ${
                          hour === h
                            ? "border-[var(--neon-violet)] bg-[var(--neon-violet)] text-white"
                            : "border-[var(--neon-violet)]/15 text-ink-soft hover:border-[var(--neon-violet)]/40"
                        }`}
                      >
                        <Clock size={12} className="inline mr-1" />
                        {h}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: contact + summary */}
            <div className="lg:sticky lg:top-32 self-start space-y-5">
              <div className="rounded-3xl border border-[var(--neon-violet)]/15 bg-white p-6 shadow-md shadow-[var(--neon-violet)]/5">
                <p className="text-xs tracking-[0.25em] uppercase text-muted">4. Vos coordonnées</p>
                <div className="mt-4 space-y-3">
                  <label className="block text-sm">
                    <span className="flex items-center gap-2 text-ink-soft mb-1.5">
                      <User size={13} className="text-[var(--neon-violet)]" /> Prénom & nom
                    </span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-[var(--neon-violet)]/15 px-4 py-3 outline-none focus:border-[var(--neon-violet)] transition-colors"
                      placeholder="Ex : Yanis B."
                      required
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="flex items-center gap-2 text-ink-soft mb-1.5">
                      <Phone size={13} className="text-[var(--neon-cyan)]" /> Téléphone
                    </span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-[var(--neon-violet)]/15 px-4 py-3 outline-none focus:border-[var(--neon-cyan)] transition-colors"
                      placeholder="+213 ..."
                      required
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="flex items-center gap-2 text-ink-soft mb-1.5">
                      <Mail size={13} className="text-[var(--neon-magenta)]" /> Email (optionnel)
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-[var(--neon-violet)]/15 px-4 py-3 outline-none focus:border-[var(--neon-magenta)] transition-colors"
                      placeholder="vous@email.com"
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-[#04061a] via-[#0e0a2a] to-[#04061a] text-white p-6">
                <p className="text-xs tracking-[0.3em] uppercase text-white/55">
                  Récapitulatif
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-white/65">Boutique</span>
                    <span className="font-semibold">
                      {stores.find((s) => s.id === store)?.city}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/65">Service</span>
                    <span className="font-semibold">
                      {services.find((s) => s.id === service)?.label}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/65">Date</span>
                    <span className="font-semibold">
                      {dayObj?.day} {dayObj?.date}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/65">Heure</span>
                    <span className="font-semibold gradient-text">{hour}</span>
                  </li>
                </ul>
                <button type="submit" className="btn-primary w-full mt-6">
                  <Sparkles size={14} />
                  Confirmer mon rendez-vous
                </button>
                <p className="text-[10px] text-white/55 text-center mt-3">
                  Annulation gratuite jusqu&apos;à 2h avant le RDV
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </main>
  );
}
