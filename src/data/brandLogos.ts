const brandLogoByKey: Record<string, string> = {
  aboriginal: "/brands/logos/aboriginal.svg",
  atello: "/brands/logos/atello.svg",
  baus: "/brands/logos/baus.svg",
  cooperco: "/brands/logos/cooper-and-co.svg",
  cooperandco: "/brands/logos/cooper-and-co.svg",
  einar: "/brands/logos/einar.svg",
  eyewearaz: "/brands/logos/eyewear-a-z.svg",
  eyewearritzy: "/brands/logos/eyewear-ritzy.svg",
  laneacavallo: "/brands/logos/lanea-cavallo.svg",
  lineacavalo: "/brands/logos/linea-cavalo.svg",
  marwitzberlin: "/brands/logos/marwitz-berlin.svg",
  novatislunette: "/brands/logos/novatis-lunette.svg",
  reserve: "/brands/logos/reserve.svg",
  vela: "/brands/logos/vela.svg",
};

export function normalizeBrandKey(value: string): string {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

export function resolveBrandLogo(brandName: string): string {
  const normalized = normalizeBrandKey(brandName);
  return brandLogoByKey[normalized] ?? "/brands/logos/brand-generic.svg";
}
