// ============================================
// Data Classes — each feature = a class
// ============================================

export type ProductBadge = "best-seller" | "nouveau" | "tendance";
export type ProductGender = "homme" | "femme" | "unisexe" | "enfant";

export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public image: string,
    public category: string,
    public badge?: ProductBadge,
    public description?: string,
    public brand?: string,
    public colors?: ProductColor[],
    public sizes?: string[],
    public shape?: string,
    public material?: string,
    public gender?: ProductGender,
    public images?: string[],
    public lensType?: string,
    public frameWidth?: number,
  ) {}

  get formattedPrice(): string {
    return `${this.price.toLocaleString("fr-DZ")} DA`;
  }

  get slug(): string {
    return this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
  }
}

export class ProductColor {
  constructor(
    public name: string,
    public hex: string,
    public image?: string,
  ) {}
}

export class Category {
  constructor(
    public id: string,
    public name: string,
    public slug: string,
    public productCount: number,
    public image: string,
    public description: string
  ) {}
}

export class Testimonial {
  constructor(
    public id: string,
    public name: string,
    public city: string,
    public rating: number,
    public comment: string,
    public verified: boolean = true
  ) {}

  get initials(): string {
    return this.name.charAt(0).toUpperCase();
  }
}

export class Brand {
  constructor(
    public id: string,
    public name: string,
    public logo: string,
    public slug: string,
    public description?: string,
  ) {}
}

export class Store {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public city: string,
    public phone: string,
    public hours: string,
    public lat: number,
    public lng: number,
  ) {}
}

export class SizeGuideEntry {
  constructor(
    public faceShape: string,
    public recommended: string[],
    public frameWidth: string,
    public description: string,
  ) {}
}

// ============================================
// Source importee depuis src/data/liste_lunettes_import.txt
// ============================================

type InventorySection = "homme" | "femme" | "enfant";

const importedStoreInventory: Record<InventorySection, string[]> = {
  homme: [
    "Gauss",
    "New Man",
    "Arschè",
    "SENS",
    "DESPADA",
    "Polaroid",
    "ATELLO",
    "ELITE",
    "oscar",
    "OPEX",
    "Georges RECH",
    "Marco-Joy",
  ],
  femme: [
    "Kareen walker",
    "Marco Joy",
    "Zinea cavalo",
    "opexcel",
    "SOLO",
    "CREMIEUX",
    "POLSKA",
    "Ana white",
    "Ritzy",
    "M.S.",
    "Polaroid",
    "Nice look",
    "DESPada",
    "oscar",
    "GIVENCHY",
    "KENZO",
  ],
  enfant: [
    "M.S.",
    "Ondaou",
    "Cascata",
    "Ben. X. Fantasia",
    "Espera",
    "Sundoo",
    "eye zook",
    "Ozen",
    "star wars",
    "Lacina plus",
    "Flirt",
    "Nice look",
    "Fiesta",
    "Anticall",
    "Impala",
    "Eye zook",
    "Bibi shop",
    "B.S Vision",
    "New look",
    "Summit",
    "Massimo",
    "Gucci",
    "optique",
    "Skechers",
    "Tudor",
    "Premium time",
    "Sivas",
    "Bambino",
  ],
};

const inventorySectionConfig: Record<
  InventorySection,
  {
    categoryLabel: "Homme" | "Femme" | "Enfant";
    gender: ProductGender;
    priceBase: number;
    priceStep: number;
    frameWidthBase: number;
    sizes: string[];
  }
> = {
  homme: {
    categoryLabel: "Homme",
    gender: "homme",
    priceBase: 18500,
    priceStep: 1100,
    frameWidthBase: 136,
    sizes: ["M (53mm)", "L (55mm)", "XL (58mm)"],
  },
  femme: {
    categoryLabel: "Femme",
    gender: "femme",
    priceBase: 19500,
    priceStep: 1200,
    frameWidthBase: 132,
    sizes: ["S (50mm)", "M (53mm)", "L (55mm)"],
  },
  enfant: {
    categoryLabel: "Enfant",
    gender: "enfant",
    priceBase: 9500,
    priceStep: 700,
    frameWidthBase: 122,
    sizes: ["XS (44mm)", "S (46mm)", "M (48mm)"],
  },
};

const sectionOrder: InventorySection[] = ["homme", "femme", "enfant"];

const shapeCycle = ["Aviator", "Carré", "Rond", "Rectangulaire", "Pilote", "Oversize", "Browline", "Papillon"];
const materialCycle = ["Métal", "Acétate", "Acétate/Métal", "O-Matter"];
const lensCycle = ["Correcteur", "Anti-reflet", "BlueLock", "Photochromique"];

const colorSets: Array<Array<{ name: string; hex: string }>> = [
  [
    { name: "Noir Mat", hex: "#1f2f34" },
    { name: "Turquoise", hex: "#1ba7b8" },
  ],
  [
    { name: "Bleu Nuit", hex: "#1f3f5f" },
    { name: "Vert Ocean", hex: "#2f8c89" },
  ],
  [
    { name: "Anthracite", hex: "#38484f" },
    { name: "Blanc Mat", hex: "#f4f8f7" },
  ],
  [
    { name: "Ecaille", hex: "#654b3a" },
    { name: "Bleu Glacier", hex: "#8dc9d1" },
  ],
];

function normalizeInventoryKey(value: string): string {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function dedupeByNormalizedName(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const rawValue of values) {
    const cleanedValue = rawValue.trim().replace(/\s+/g, " ");
    const key = normalizeInventoryKey(cleanedValue);

    if (!key || seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(cleanedValue);
  }

  return result;
}

function slugify(value: string): string {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildProductsFromInventory(): Product[] {
  const products: Product[] = [];
  let nextId = 1;

  sectionOrder.forEach((section) => {
    const config = inventorySectionConfig[section];
    const names = dedupeByNormalizedName(importedStoreInventory[section]);

    names.forEach((name, sectionIndex) => {
      const cycleIndex = nextId - 1;
      const colors = colorSets[cycleIndex % colorSets.length].map(
        (color) => new ProductColor(color.name, color.hex)
      );
      const badge: ProductBadge | undefined =
        sectionIndex === 0
          ? "best-seller"
          : sectionIndex === 1
            ? "nouveau"
            : sectionIndex === 2
              ? "tendance"
              : undefined;

      products.push(
        new Product(
          String(nextId),
          name,
          config.priceBase + sectionIndex * config.priceStep,
          "/products/placeholder.jpg",
          config.categoryLabel,
          badge,
          `Monture ${config.categoryLabel.toLowerCase()} issue de la liste magasin importee.`,
          name,
          colors,
          config.sizes,
          shapeCycle[cycleIndex % shapeCycle.length],
          materialCycle[cycleIndex % materialCycle.length],
          config.gender,
          ["/products/placeholder.jpg"],
          lensCycle[cycleIndex % lensCycle.length],
          config.frameWidthBase + (sectionIndex % 6) * 2,
        )
      );

      nextId += 1;
    });
  });

  return products;
}

// ============================================
// App Data
// ============================================

export const allProducts: Product[] = buildProductsFromInventory();

export const featuredProducts = allProducts.slice(0, 3);
export const popularProducts = allProducts.slice(3, 11);

const categoryDefinitions = [
  {
    id: "1",
    name: "Lunettes Homme",
    slug: "homme",
    sourceCategory: "Homme",
    image: "/categories/homme.jpg",
    description: "Montures masculines de la liste magasin",
  },
  {
    id: "2",
    name: "Lunettes Femme",
    slug: "femme",
    sourceCategory: "Femme",
    image: "/categories/femme.jpg",
    description: "Montures feminines de la liste magasin",
  },
  {
    id: "3",
    name: "Lunettes Enfant",
    slug: "enfant",
    sourceCategory: "Enfant",
    image: "/categories/enfant.jpg",
    description: "Montures enfant de la liste magasin",
  },
] as const;

export const categories: Category[] = categoryDefinitions.map((definition) =>
  new Category(
    definition.id,
    definition.name,
    definition.slug,
    allProducts.filter((product) => product.category === definition.sourceCategory).length,
    definition.image,
    definition.description,
  )
);

const uniqueBrandNames = Array.from(
  new Set(
    allProducts
      .map((product) => product.brand)
      .filter((brand): brand is string => Boolean(brand))
  )
);

export const brands: Brand[] = uniqueBrandNames.map((brandName, index) => {
  const rawSlug = slugify(brandName);
  const safeSlug = rawSlug.length > 0 ? rawSlug : `marque-${index + 1}`;

  return new Brand(
    String(index + 1),
    brandName,
    "/brands/placeholder.svg",
    safeSlug,
    `Collection ${brandName}`,
  );
});

export const stores: Store[] = [
  new Store("1", "New Look Optic - Alger Centre", "12 Rue Didouche Mourad", "Alger", "0555 12 34 56", "Sam-Jeu: 9h-18h, Ven: 9h-12h", 36.7538, 3.0588),
  new Store("2", "New Look Optic - Oran", "45 Boulevard de la Soummam", "Oran", "0555 78 90 12", "Sam-Jeu: 9h-18h", 35.6969, -0.6331),
  new Store("3", "New Look Optic - Constantine", "8 Avenue Aouati Mostefa", "Constantine", "0555 34 56 78", "Sam-Jeu: 9h-18h", 36.3650, 6.6147),
];

export const sizeGuide: SizeGuideEntry[] = [
  new SizeGuideEntry("Ovale", ["Aviator", "Carré", "Browline"], "M (135-140mm)", "Les visages ovales sont polyvalents et supportent la plupart des formes."),
  new SizeGuideEntry("Rond", ["Rectangulaire", "Carré", "Browline"], "M-L (138-145mm)", "Choisissez des montures angulaires pour structurer les traits."),
  new SizeGuideEntry("Carré", ["Rond", "Aviator", "Oversize"], "L (140-150mm)", "Des lignes plus douces équilibrent les visages carrés."),
  new SizeGuideEntry("Coeur", ["Aviator", "Rond", "Pilote"], "S-M (130-140mm)", "Preferez des montures qui apportent de la largeur en partie basse."),
  new SizeGuideEntry("Rectangulaire", ["Oversize", "Rond", "Papillon"], "M (135-142mm)", "Des montures plus hautes reduisent l'effet de longueur du visage."),
];

export const testimonials: Testimonial[] = [
  new Testimonial("1", "Amira B.", "Alger", 5, "J'ai trouvé rapidement la monture que je cherchais dans la liste magasin. Service rapide et fiable."),
  new Testimonial("2", "Karim M.", "Oran", 5, "La categorie Homme est claire et les references comme Gauss et OPEX sont bien presentes."),
  new Testimonial("3", "Sofia L.", "Constantine", 5, "Très pratique pour filtrer les modèles Femme et envoyer une demande personnalisée."),
  new Testimonial("4", "Mehdi T.", "Blida", 5, "Le choix Enfant est complet et la demande de monture est simple à remplir."),
  new Testimonial("5", "Yasmine K.", "Annaba", 5, "Navigation simple, produits conformes a la liste magasin et experience tres fluide."),
];

// Megamenu data
export class MegaMenuCategory {
  constructor(
    public label: string,
    public href: string,
    public subcategories: { label: string; href: string }[],
  ) {}
}

const featuredBrandLinks = brands.slice(0, 6).map((brand) => ({
  label: brand.name,
  href: `/collections/all?brand=${encodeURIComponent(brand.name)}`,
}));

export const megaMenuData: MegaMenuCategory[] = [
  new MegaMenuCategory("Lunettes Homme", "/collections/homme", [
    { label: "Toutes les montures homme", href: "/collections/homme" },
    { label: "Aviator", href: "/collections/homme?shape=Aviator" },
    { label: "Carré", href: "/collections/homme?shape=Carr%C3%A9" },
    { label: "Rectangulaire", href: "/collections/homme?shape=Rectangulaire" },
  ]),
  new MegaMenuCategory("Lunettes Femme", "/collections/femme", [
    { label: "Toutes les montures femme", href: "/collections/femme" },
    { label: "Papillon", href: "/collections/femme?shape=Papillon" },
    { label: "Rond", href: "/collections/femme?shape=Rond" },
    { label: "Oversize", href: "/collections/femme?shape=Oversize" },
  ]),
  new MegaMenuCategory("Lunettes Enfant", "/collections/enfant", [
    { label: "Toutes les montures enfant", href: "/collections/enfant" },
    { label: "Rond", href: "/collections/enfant?shape=Rond" },
    { label: "Browline", href: "/collections/enfant?shape=Browline" },
    { label: "Pilote", href: "/collections/enfant?shape=Pilote" },
  ]),
  new MegaMenuCategory("Marques", "/marques", [
    ...featuredBrandLinks,
    { label: "Voir toutes les marques", href: "/marques" },
  ]),
];