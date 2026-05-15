import { productImageCatalog } from "@/data/productImages";
import { resolveBrandLogo } from "@/data/brandLogos";

export { productImageCatalog };

// ============================================
// Data Classes - each feature = a class
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

// Inventaire vide — les marques sont ajoutées ici au fur et à mesure de l'ajout des photos
const importedStoreInventory: Record<InventorySection, string[]> = {
  homme: [],
  femme: [],
  enfant: [],
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

function cleanBrandLabel(label: string): string {
  let cleaned = label.trim().replace(/\s+/g, " ");

  // If a file label combines multiple mentions (e.g. "Atello + Miki Ninn"),
  // keep the leading brand token for consistent brand filtering.
  if (cleaned.includes("+")) {
    cleaned = cleaned.split("+")[0].trim();
  }

  // Remove trailing catalog numbering (e.g. "Atello 001", "Einar 001.1").
  cleaned = cleaned.replace(/\s+\d+(?:[.,-]\d+)*$/g, "");

  cleaned = cleaned.replace(/[._-]+$/g, "").replace(/\s+/g, " ").trim();

  return cleaned.length > 0 ? cleaned : label.trim();
}

function pickImageEntry(cycleIndex: number): { path: string; label: string; brandLabel: string } | null {
  if (productImageCatalog.length === 0) {
    return null;
  }

  const entry = productImageCatalog[cycleIndex % productImageCatalog.length];

  return {
    path: entry.path,
    label: entry.label.trim(),
    brandLabel: cleanBrandLabel(entry.label),
  };
}

function buildSalesDescription(
  modelName: string,
  category: "Homme" | "Femme" | "Enfant",
  shape: string,
  material: string,
  lensType: string,
  frameWidth: number,
): string {
  const profilePitch: Record<typeof category, string> = {
    Homme:
      "pensée pour une allure structurée et professionnelle, avec un maintien stable du matin au soir",
    Femme:
      "travaillée pour valoriser les traits du visage avec une présence élégante mais facile à porter au quotidien",
    Enfant:
      "conçue pour un usage actif avec un port confortable, léger et rassurant pour la journée d'école",
  };

  const usageByShape: Record<string, string> = {
    Aviator: "Idéale pour adoucir les visages anguleux tout en gardant un style affirmé.",
    "Carré": "Parfaite pour une ligne nette et moderne qui donne du caractère au regard.",
    Rond: "Excellente pour un rendu doux et tendance, très apprécié en usage quotidien.",
    Rectangulaire: "Très bon choix pour allonger visuellement le regard et renforcer la présence du visage.",
    Pilote: "Une option premium au style signature, polyvalente entre tenue casual et habillée.",
    Oversize: "Apporte une couverture visuelle généreuse et un style mode immédiatement identifiable.",
    Browline: "Superbe compromis entre élégance rétro et finition contemporaine.",
    Papillon: "Accentue la ligne du regard avec une touche chic et féminine.",
  };

  const shapeUsage = usageByShape[shape] ??
    "Un modèle équilibré qui s'adapte facilement à différents styles de visage.";

  return `${modelName} est une monture ${shape.toLowerCase()} en ${material.toLowerCase()}, ${profilePitch[category]}. ` +
    `Largeur de monture ${frameWidth} mm, verres ${lensType.toLowerCase()} et finition soignée pour un confort durable. ` +
    shapeUsage;
}

function buildProductsFromInventory(): Product[] {
  const products: Product[] = [];
  let nextId = 1;

  sectionOrder.forEach((section) => {
    const config = inventorySectionConfig[section];
    const names = dedupeByNormalizedName(importedStoreInventory[section]);

    names.forEach((name, sectionIndex) => {
      const cycleIndex = nextId - 1;
      const imageEntry = pickImageEntry(cycleIndex);
      const productImage = imageEntry?.path ?? "/products/placeholder.jpg";
      const productImages = imageEntry ? [imageEntry.path] : ["/products/placeholder.jpg"];
      const productBrand = name;
      const shape = shapeCycle[cycleIndex % shapeCycle.length];
      const material = materialCycle[cycleIndex % materialCycle.length];
      const lensType = lensCycle[cycleIndex % lensCycle.length];
      const frameWidth = config.frameWidthBase + (sectionIndex % 6) * 2;
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
          productImage,
          config.categoryLabel,
          badge,
          buildSalesDescription(name, config.categoryLabel, shape, material, lensType, frameWidth),
          productBrand,
          colors,
          config.sizes,
          shape,
          material,
          config.gender,
          productImages,
          lensType,
          frameWidth,
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

// ============================================
// Produits Soleil (Helen Keller, Horien) depuis le catalogue photos
// ============================================

function buildSoleilProducts(): Product[] {
  const products: Product[] = [];

  // Group images by brand label
  const byBrand = new Map<string, typeof productImageCatalog>();
  for (const entry of productImageCatalog) {
    const brand = entry.label;
    // Only include images explicitly tagged Soleil, or untagged entries from known soleil-only brands
    if (entry.type === 'Vue') continue;
    if (!entry.type && brand === 'Despada') continue;
    if (!byBrand.has(brand)) byBrand.set(brand, []);
    byBrand.get(brand)!.push(entry);
  }

  const soleilShapes = ["Aviator", "Oversize", "Pilote", "Carré", "Papillon", "Rond"];
  const soleilMaterials = ["Métal", "Acétate", "Acétate/Métal"];
  const soleilColors: Array<Array<{ name: string; hex: string }>> = [
    [{ name: "Noir", hex: "#1a1a1a" }, { name: "Or", hex: "#c8a96e" }],
    [{ name: "Havane", hex: "#654b3a" }, { name: "Brun", hex: "#8b5e3c" }],
    [{ name: "Noir Mat", hex: "#1f2f34" }, { name: "Argent", hex: "#b0b8c1" }],
    [{ name: "Bleu", hex: "#1a4a7a" }, { name: "Vert", hex: "#2d5a27" }],
  ];

  let idOffset = 5000;

  for (const [brand, images] of byBrand) {
    images.forEach((img, idx) => {
      const shape = soleilShapes[idx % soleilShapes.length];
      const material = soleilMaterials[idx % soleilMaterials.length];
      const colors = soleilColors[idx % soleilColors.length].map(
        (c) => new ProductColor(c.name, c.hex)
      );
      const price = brand === "Helen Keller" ? 22500 + (idx % 8) * 800 : 18500 + (idx % 6) * 700;
      const badge: ProductBadge | undefined = idx === 0 ? "best-seller" : idx === 1 ? "nouveau" : undefined;

      products.push(
        new Product(
          String(idOffset++),
          `${brand} — Lunettes Soleil ${String(idx + 1).padStart(2, "0")}`,
          price,
          img.path,
          "Soleil",
          badge,
          `Lunettes de soleil ${brand}, monture ${shape.toLowerCase()} en ${material.toLowerCase()}. Style premium, protection UV400. Disponible en boutique Newlook Optic Sidi Aiche.`,
          brand,
          colors,
          ["S", "M", "L"],
          shape,
          material,
          "unisexe" as ProductGender,
          [img.path],
          "Soleil UV400",
          138,
        )
      );
    });
  }

  return products;
}

function buildVueProducts(): Product[] {
  const products: Product[] = [];
  const vueMaterials = ["Métal", "Acétate", "Acétate/Métal", "Titane"];
  const vueColors: Array<Array<{ name: string; hex: string }>> = [
    [{ name: "Noir", hex: "#1a1a1a" }, { name: "Argent", hex: "#b0b8c1" }],
    [{ name: "Havane", hex: "#654b3a" }, { name: "Or", hex: "#c8a96e" }],
    [{ name: "Gris", hex: "#6b7280" }, { name: "Bleu", hex: "#1a4a7a" }],
    [{ name: "Bordeaux", hex: "#7c2d3e" }, { name: "Nude", hex: "#c4a882" }],
  ];

  // All Vue-typed entries, plus untyped Despada (backward compat)
  const despada = productImageCatalog.filter((e) => e.type === 'Vue' || (!e.type && e.label === 'Despada'));
  let idOffset = 6000;

  despada.forEach((img, idx) => {
    const material = vueMaterials[idx % vueMaterials.length];
    const colors = vueColors[idx % vueColors.length].map(
      (c) => new ProductColor(c.name, c.hex)
    );
    const badge: ProductBadge | undefined = idx === 0 ? "best-seller" : idx === 1 ? "nouveau" : undefined;

    products.push(
      new Product(
        String(idOffset++),
        `${img.label} — Lunettes de Vue ${String(idx + 1).padStart(2, "0")}`,
        (img.label === "Despada" ? 12500 : img.label === "John Varvatos" ? 28000 : 15500) + (idx % 8) * 600,
        img.path,
        "Vue",
        badge,
        `Lunettes de vue ${img.label}, monture en ${material.toLowerCase()}. Confort optimal et style contemporain. Disponible en boutique Newlook Optic Sidi Aiche.`,
        img.label,
        colors,
        ["S", "M", "L"],
        undefined,
        material,
        "unisexe" as ProductGender,
        [img.path],
        "Correction",
        135,
      )
    );
  });

  return products;
}

export const allProducts: Product[] = [...buildSoleilProducts(), ...buildVueProducts()];

export const featuredProducts = allProducts.slice(0, 3);
export const popularProducts = allProducts.slice(3, 11);

const categoryDefinitions = [
  {
    id: "1",
    name: "Lunettes Soleil",
    slug: "soleil",
    sourceCategory: "Soleil",
    image: "/categories/soleil.jpg",
    description: "Lunettes de soleil Helen Keller et Horien",
  },
  {
    id: "2",
    name: "Lunettes de Vue",
    slug: "vue",
    sourceCategory: "Vue",
    image: "/categories/vue.jpg",
    description: "Lunettes de vue Despada, MS Eyewear, John Varvatos",
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

// Category visual accents (gradients for futuristic theme)
export const categoryAccents: Record<string, { from: string; to: string; glow: string; tag: string; emoji: string }> = {
  soleil: {
    from: "#f59e0b",
    to: "#f97316",
    glow: "rgba(245, 158, 11, 0.4)",
    tag: "Soleil · UV400",
    emoji: "☀",
  },
  vue: {
    from: "#4AABDB",
    to: "#6DC4ED",
    glow: "rgba(74, 171, 219, 0.35)",
    tag: "Vue · Correction",
    emoji: "👓",
  },
  all: {
    from: "#1fb9c3",
    to: "#00c4c4",
    glow: "rgba(74, 171, 219, 0.35)",
    tag: "Toutes les collections",
    emoji: "✦",
  },
};

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
    resolveBrandLogo(brandName),
    safeSlug,
    `Collection ${brandName}`,
  );
});

export const stores: Store[] = [
  new Store(
    "1",
    "Newlook Optic Sidi Aiche",
    "Centre ville, Sidi Aiche",
    "Sidi Aiche",
    "+213 555 85 24 57",
    "Sam-Jeu: 9h-18h, Ven: 9h-12h",
    36.545,
    4.687,
  ),
];

export const sizeGuide: SizeGuideEntry[] = [
  new SizeGuideEntry("Ovale", ["Aviator", "Carré", "Browline"], "M (135-140mm)", "Les visages ovales sont polyvalents et supportent la plupart des formes."),
  new SizeGuideEntry("Rond", ["Rectangulaire", "Carré", "Browline"], "M-L (138-145mm)", "Choisissez des montures angulaires pour structurer les traits."),
  new SizeGuideEntry("Carré", ["Rond", "Aviator", "Oversize"], "L (140-150mm)", "Des lignes plus douces équilibrent les visages carrés."),
  new SizeGuideEntry("Coeur", ["Aviator", "Rond", "Pilote"], "S-M (130-140mm)", "Preferez des montures qui apportent de la largeur en partie basse."),
  new SizeGuideEntry("Rectangulaire", ["Oversize", "Rond", "Papillon"], "M (135-142mm)", "Des montures plus hautes reduisent l'effet de longueur du visage."),
];

export const testimonials: Testimonial[] = [
  new Testimonial("1", "Amira B.", "Sidi Aiche", 5, "J'ai trouve rapidement la monture que je cherchais. Service rapide et fiable."),
  new Testimonial("2", "Karim M.", "Sidi Aiche", 5, "La categorie Homme est claire et les references sont bien presentes."),
  new Testimonial("3", "Sofia L.", "Sidi Aiche", 5, "Tres pratique pour filtrer les modeles et envoyer une demande personnalisee."),
  new Testimonial("4", "Mehdi T.", "Sidi Aiche", 5, "Le choix Enfant est complet et la demande de monture est simple a remplir."),
  new Testimonial("5", "Yasmine K.", "Sidi Aiche", 5, "Navigation simple, produits conformes et experience fluide."),
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

// Lens configurator options
export class LensOption {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public icon: string,
  ) {}
}

export const lensOptions: LensOption[] = [
  new LensOption("standard", "Verres Standard", "Verres correcteurs minéral simple, traitement de base.", 0, "circle"),
  new LensOption("antireflet", "Anti-Reflet Premium", "Élimine les reflets, idéal pour la conduite et l'écran.", 4500, "shield"),
  new LensOption("bluelock", "Filtre Lumière Bleue", "Protège vos yeux des écrans pour un confort prolongé.", 6500, "monitor"),
  new LensOption("photochromique", "Photochromique", "S'adapte automatiquement à la lumière du soleil.", 9500, "sun"),
  new LensOption("progressif", "Progressifs Sur-Mesure", "Vision à toutes distances, parfaitement personnalisés.", 18000, "layers"),
];

// Face shape quiz
export class FaceShapeQuestion {
  constructor(
    public id: string,
    public question: string,
    public options: { label: string; shapes: string[] }[],
  ) {}
}

export const faceShapeQuestions: FaceShapeQuestion[] = [
  new FaceShapeQuestion("1", "Quelle est la forme générale de votre visage ?", [
    { label: "Plus long que large, traits doux", shapes: ["Ovale"] },
    { label: "Aussi long que large, mâchoire douce", shapes: ["Rond"] },
    { label: "Mâchoire et front anguleux", shapes: ["Carré"] },
    { label: "Front large, menton fin", shapes: ["Coeur"] },
  ]),
  new FaceShapeQuestion("2", "Comment décririez-vous votre front ?", [
    { label: "Large et haut", shapes: ["Coeur", "Carré"] },
    { label: "Moyen et équilibré", shapes: ["Ovale", "Rectangulaire"] },
    { label: "Étroit et arrondi", shapes: ["Rond"] },
    { label: "Pas sûr(e)", shapes: ["Ovale"] },
  ]),
  new FaceShapeQuestion("3", "Quel est l'aspect de votre menton ?", [
    { label: "Pointu et fin", shapes: ["Coeur"] },
    { label: "Carré et marqué", shapes: ["Carré", "Rectangulaire"] },
    { label: "Rond et doux", shapes: ["Rond", "Ovale"] },
    { label: "Allongé", shapes: ["Rectangulaire"] },
  ]),
];

// Appointment slots data
export class AppointmentSlot {
  constructor(
    public id: string,
    public day: string,
    public date: string,
    public hours: string[],
  ) {}
}

export const appointmentSlots: AppointmentSlot[] = [
  new AppointmentSlot("1", "Sam", "10 Mai", ["09:00", "10:30", "14:00", "16:30"]),
  new AppointmentSlot("2", "Dim", "11 Mai", ["09:30", "11:00", "15:00", "17:00"]),
  new AppointmentSlot("3", "Lun", "12 Mai", ["10:00", "12:00", "14:30", "16:00"]),
  new AppointmentSlot("4", "Mar", "13 Mai", ["09:00", "11:30", "15:30", "17:30"]),
  new AppointmentSlot("5", "Mer", "14 Mai", ["10:30", "13:00", "15:00", "16:30"]),
];

export const megaMenuData: MegaMenuCategory[] = [
  new MegaMenuCategory("Lunettes Soleil", "/collections/soleil", [
    { label: "Toutes les lunettes soleil", href: "/collections/soleil" },
    { label: "Helen Keller", href: "/collections/soleil?brand=Helen+Keller" },
    { label: "Horien", href: "/collections/soleil?brand=Horien" },
    { label: "MS Eyewear", href: "/collections/soleil?brand=MS+Eyewear" },
    { label: "John Varvatos", href: "/collections/soleil?brand=John+Varvatos" },
  ]),
  new MegaMenuCategory("Lunettes de Vue", "/collections/vue", [
    { label: "Toutes les lunettes de vue", href: "/collections/vue" },
    { label: "Despada", href: "/collections/vue?brand=Despada" },
    { label: "MS Eyewear", href: "/collections/vue?brand=MS+Eyewear" },
    { label: "John Varvatos", href: "/collections/vue?brand=John+Varvatos" },
  ]),
  new MegaMenuCategory("Marques", "/marques", [
    { label: "Helen Keller", href: "/collections/all?brand=Helen+Keller" },
    { label: "Horien", href: "/collections/all?brand=Horien" },
    { label: "Despada", href: "/collections/all?brand=Despada" },
    { label: "MS Eyewear", href: "/collections/all?brand=MS+Eyewear" },
    { label: "John Varvatos", href: "/collections/all?brand=John+Varvatos" },
    { label: "Voir toutes les marques", href: "/marques" },
  ]),
];