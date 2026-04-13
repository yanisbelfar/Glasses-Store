// ============================================
// Data Classes — each feature = a class
// ============================================

export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public image: string,
    public category: string,
    public badge?: "best-seller" | "nouveau" | "tendance",
    public description?: string,
    public brand?: string,
    public colors?: ProductColor[],
    public sizes?: string[],
    public shape?: string,
    public material?: string,
    public gender?: "homme" | "femme" | "unisexe",
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
// Sample Data
// ============================================

export const allProducts: Product[] = [
  new Product("1", "Ray-Ban Aviator Classic", 32000, "/products/aviator.jpg", "Solaire", "best-seller", "Le modèle iconique qui traverse les décennies", "Ray-Ban",
    [new ProductColor("Or/Vert", "#b8860b"), new ProductColor("Argent/Bleu", "#c0c0c0"), new ProductColor("Noir/Gris", "#1c1917")],
    ["S (50mm)", "M (55mm)", "L (58mm)", "XL (62mm)"], "Aviator", "Métal", "unisexe",
    ["/products/aviator.jpg", "/products/aviator-2.jpg", "/products/aviator-3.jpg"], "Classique G-15", 140),
  new Product("2", "Gucci GG0061S", 58000, "/products/gucci.jpg", "Solaire", "nouveau", "Élégance italienne, protection maximale", "Gucci",
    [new ProductColor("Noir/Gris", "#1c1917"), new ProductColor("Havane/Marron", "#8B4513")],
    ["M (56mm)", "L (58mm)"], "Carré", "Acétate", "femme",
    ["/products/gucci.jpg", "/products/gucci-2.jpg"], "Dégradé", 145),
  new Product("3", "Tom Ford FT5401", 45000, "/products/tomford.jpg", "Optique", "tendance", "Raffinement et confort au quotidien", "Tom Ford",
    [new ProductColor("Noir", "#1c1917"), new ProductColor("Havane", "#8B4513"), new ProductColor("Bleu", "#1e3a5f")],
    ["S (51mm)", "M (54mm)"], "Rectangulaire", "Acétate", "homme",
    ["/products/tomford.jpg", "/products/tomford-2.jpg"], "Correcteur", 138),
  new Product("4", "Dior SoStellaire1", 62000, "/products/dior.jpg", "Solaire", undefined, "L'audace Dior en lunettes de soleil", "Dior",
    [new ProductColor("Noir/Gris", "#1c1917"), new ProductColor("Rose/Violet", "#c77daa")],
    ["M (59mm)"], "Oversize", "Acétate", "femme",
    ["/products/dior.jpg"], "Dégradé", 150),
  new Product("5", "Prada PR 17WS", 48000, "/products/prada.jpg", "Solaire", undefined, "Sophistication intemporelle", "Prada",
    [new ProductColor("Noir", "#1c1917"), new ProductColor("Écaille", "#704214")],
    ["M (49mm)", "L (51mm)"], "Rond", "Acétate", "femme",
    ["/products/prada.jpg"], "Classique", 140),
  new Product("6", "Oakley Holbrook", 22000, "/products/oakley.jpg", "Sport", undefined, "Performance et style urbain", "Oakley",
    [new ProductColor("Noir mat", "#292524"), new ProductColor("Bleu/Prizm", "#1e3a5f")],
    ["M (55mm)", "L (57mm)"], "Carré", "O-Matter", "homme",
    ["/products/oakley.jpg"], "Prizm", 137),
  new Product("7", "Cartier CT0270S", 95000, "/products/cartier.jpg", "Solaire", "best-seller", "Le summum du luxe", "Cartier",
    [new ProductColor("Or/Vert", "#b8860b"), new ProductColor("Or/Marron", "#d4a843")],
    ["M (58mm)"], "Pilote", "Métal", "unisexe",
    ["/products/cartier.jpg"], "Classique", 140),
  new Product("8", "Persol PO3019S", 35000, "/products/persol.jpg", "Solaire", undefined, "L'artisanat italien depuis 1917", "Persol",
    [new ProductColor("Havane/Vert", "#8B4513"), new ProductColor("Noir/Bleu", "#1c1917")],
    ["S (52mm)", "M (55mm)"], "Rectangulaire", "Acétate", "unisexe",
    ["/products/persol.jpg"], "Crystal", 145),
  new Product("9", "Versace VE4361", 38000, "/products/versace.jpg", "Solaire", "tendance", "Audace et glamour", "Versace",
    [new ProductColor("Noir/Or", "#1c1917"), new ProductColor("Rouge/Gris", "#b22222")],
    ["M (53mm)"], "Rond", "Acétate", "femme",
    ["/products/versace.jpg"], "Dégradé", 140),
  new Product("10", "Hugo Boss 1451/S", 28000, "/products/boss.jpg", "Optique", undefined, "Élégance professionnelle", "Hugo Boss",
    [new ProductColor("Noir mat", "#292524"), new ProductColor("Bleu nuit", "#1e3a5f")],
    ["M (54mm)", "L (56mm)"], "Rectangulaire", "Métal", "homme",
    ["/products/boss.jpg"], "Correcteur", 142),
  new Product("11", "Carrera 1047/S", 19500, "/products/carrera.jpg", "Sport", undefined, "Esprit racing, design audacieux", "Carrera",
    [new ProductColor("Noir/Blanc", "#1c1917"), new ProductColor("Bleu/Blanc", "#1e3a5f")],
    ["M (58mm)", "L (62mm)"], "Aviator", "Métal", "homme",
    ["/products/carrera.jpg"], "Polarisé", 140),
  new Product("12", "Ray-Ban Wayfarer", 28000, "/products/wayfarer.jpg", "Solaire", "best-seller", "Le classique absolu", "Ray-Ban",
    [new ProductColor("Noir/Vert G-15", "#1c1917"), new ProductColor("Havane/Marron", "#8B4513"), new ProductColor("Bleu/Gris", "#1e3a5f")],
    ["S (50mm)", "M (52mm)", "L (54mm)"], "Carré", "Acétate", "unisexe",
    ["/products/wayfarer.jpg"], "Classique G-15", 142),
  new Product("13", "Ray-Ban Clubmaster", 30000, "/products/clubmaster.jpg", "Solaire", "tendance", "L'esprit vintage revisité", "Ray-Ban",
    [new ProductColor("Noir/Or", "#1c1917"), new ProductColor("Écaille/Or", "#704214")],
    ["S (49mm)", "M (51mm)"], "Browline", "Acétate/Métal", "unisexe",
    ["/products/clubmaster.jpg"], "Classique G-15", 138),
  new Product("14", "Ray-Ban Round Metal", 26000, "/products/round.jpg", "Solaire", undefined, "L'icône du style bohème", "Ray-Ban",
    [new ProductColor("Or/Vert", "#b8860b"), new ProductColor("Argent/Bleu", "#c0c0c0")],
    ["S (47mm)", "M (50mm)", "L (53mm)"], "Rond", "Métal", "unisexe",
    ["/products/round.jpg"], "Classique", 135),
  new Product("15", "Dior Blacksuit", 55000, "/products/dior-blacksuit.jpg", "Optique", "nouveau", "Minimalisme Dior Homme", "Dior",
    [new ProductColor("Noir", "#1c1917"), new ProductColor("Havane", "#8B4513")],
    ["M (52mm)", "L (54mm)"], "Rectangulaire", "Acétate", "homme",
    ["/products/dior-blacksuit.jpg"], "Correcteur", 140),
  new Product("16", "Chanel CH5414", 68000, "/products/chanel.jpg", "Solaire", "nouveau", "L'élégance à la française", "Chanel",
    [new ProductColor("Noir", "#1c1917"), new ProductColor("Beige", "#f5f0e8")],
    ["M (54mm)"], "Papillon", "Acétate", "femme",
    ["/products/chanel.jpg"], "Dégradé", 140),
];

export const featuredProducts = allProducts.slice(0, 3);
export const popularProducts = allProducts.slice(3, 11);

export const categories: Category[] = [
  new Category("1", "Lunettes de Soleil", "solaire", 86, "/categories/solaire.jpg", "Protection et style sous le soleil"),
  new Category("2", "Lunettes Optiques", "optique", 64, "/categories/optique.jpg", "Vision nette, design élégant"),
  new Category("3", "Lentilles de Contact", "lentilles", 32, "/categories/lentilles.jpg", "Confort invisible, liberté totale"),
  new Category("4", "Lunettes de Sport", "sport", 28, "/categories/sport.jpg", "Performance et résistance"),
  new Category("5", "Collection Enfant", "enfant", 45, "/categories/enfant.jpg", "Style et solidité pour les petits"),
  new Category("6", "Accessoires", "accessoires", 38, "/categories/accessoires.jpg", "Étuis, cordons et entretien"),
];

export const brands: Brand[] = [
  new Brand("1", "Ray-Ban", "/brands/rayban.png", "ray-ban", "Le leader mondial des lunettes de soleil"),
  new Brand("2", "Gucci", "/brands/gucci.png", "gucci", "Luxe italien depuis 1921"),
  new Brand("3", "Dior", "/brands/dior.png", "dior", "Haute couture et lunetterie"),
  new Brand("4", "Prada", "/brands/prada.png", "prada", "Sophistication milanaise"),
  new Brand("5", "Tom Ford", "/brands/tomford.png", "tom-ford", "Élégance hollywoodienne"),
  new Brand("6", "Cartier", "/brands/cartier.png", "cartier", "Joaillier et opticien de luxe"),
  new Brand("7", "Oakley", "/brands/oakley.png", "oakley", "Performance sportive"),
  new Brand("8", "Versace", "/brands/versace.png", "versace", "Glamour et audace"),
  new Brand("9", "Persol", "/brands/persol.png", "persol", "Artisanat italien depuis 1917"),
  new Brand("10", "Carrera", "/brands/carrera.png", "carrera", "Style racing"),
  new Brand("11", "Hugo Boss", "/brands/boss.png", "hugo-boss", "Élégance professionnelle"),
  new Brand("12", "Chanel", "/brands/chanel.png", "chanel", "L'élégance à la française"),
];

export const stores: Store[] = [
  new Store("1", "New Look Optic - Alger Centre", "12 Rue Didouche Mourad", "Alger", "0555 12 34 56", "Sam-Jeu: 9h-18h, Ven: 9h-12h", 36.7538, 3.0588),
  new Store("2", "New Look Optic - Oran", "45 Boulevard de la Soummam", "Oran", "0555 78 90 12", "Sam-Jeu: 9h-18h", 35.6969, -0.6331),
  new Store("3", "New Look Optic - Constantine", "8 Avenue Aouati Mostefa", "Constantine", "0555 34 56 78", "Sam-Jeu: 9h-18h", 36.3650, 6.6147),
];

export const sizeGuide: SizeGuideEntry[] = [
  new SizeGuideEntry("Ovale", ["Aviator", "Carré", "Browline"], "M (135-140mm)", "Les visages ovales sont polyvalents — presque tous les styles conviennent."),
  new SizeGuideEntry("Rond", ["Rectangulaire", "Carré", "Browline"], "M-L (138-145mm)", "Optez pour des montures angulaires pour structurer votre visage."),
  new SizeGuideEntry("Carré", ["Rond", "Aviator", "Oversize"], "L (140-150mm)", "Adoucissez vos traits avec des montures arrondies."),
  new SizeGuideEntry("Coeur", ["Aviator", "Rond", "Pilote"], "S-M (130-140mm)", "Équilibrez un front large avec des montures plus larges en bas."),
  new SizeGuideEntry("Rectangulaire", ["Oversize", "Rond", "Papillon"], "M (135-142mm)", "Ajoutez de la largeur avec de grandes montures."),
];

export const testimonials: Testimonial[] = [
  new Testimonial("1", "Amira B.", "Alger", 5, "Qualité exceptionnelle et service irréprochable. Mes Ray-Ban sont authentiques et le prix est imbattable. Je recommande vivement !"),
  new Testimonial("2", "Karim M.", "Oran", 5, "Lunettes Gucci magnifiques, livrées en 48h parfaitement emballées. Le SAV est très réactif. Bravo New Look Optic !"),
  new Testimonial("3", "Sofia L.", "Constantine", 5, "Enfin un opticien en ligne de confiance en Algérie. Produits certifiés, garantie 2 ans. Je suis cliente fidèle."),
  new Testimonial("4", "Mehdi T.", "Blida", 5, "Service premium du début à la fin. Conseils personnalisés et lunettes de qualité supérieure. Merci !"),
  new Testimonial("5", "Yasmine K.", "Annaba", 5, "Magnifique sélection de marques. Ma Prada est sublime. Paiement à la livraison très pratique."),
];

// Megamenu data
export class MegaMenuCategory {
  constructor(
    public label: string,
    public href: string,
    public subcategories: { label: string; href: string }[],
  ) {}
}

export const megaMenuData: MegaMenuCategory[] = [
  new MegaMenuCategory("Lunettes de Soleil", "/collections/solaire", [
    { label: "Toutes les solaires", href: "/collections/solaire" },
    { label: "Aviator", href: "/collections/solaire?shape=Aviator" },
    { label: "Wayfarer / Carré", href: "/collections/solaire?shape=Carré" },
    { label: "Rond", href: "/collections/solaire?shape=Rond" },
    { label: "Pilote", href: "/collections/solaire?shape=Pilote" },
    { label: "Oversize", href: "/collections/solaire?shape=Oversize" },
    { label: "Polarisées", href: "/collections/solaire?lens=Polarisé" },
  ]),
  new MegaMenuCategory("Lunettes Optiques", "/collections/optique", [
    { label: "Toutes les optiques", href: "/collections/optique" },
    { label: "Rectangulaire", href: "/collections/optique?shape=Rectangulaire" },
    { label: "Rond", href: "/collections/optique?shape=Rond" },
    { label: "Browline", href: "/collections/optique?shape=Browline" },
    { label: "Anti-lumière bleue", href: "/collections/optique?lens=BlueLock" },
  ]),
  new MegaMenuCategory("Sport", "/collections/sport", [
    { label: "Toutes les sportives", href: "/collections/sport" },
    { label: "Running", href: "/collections/sport?activity=running" },
    { label: "Cyclisme", href: "/collections/sport?activity=cyclisme" },
    { label: "Ski", href: "/collections/sport?activity=ski" },
  ]),
  new MegaMenuCategory("Marques", "/marques", [
    { label: "Ray-Ban", href: "/collections/all?brand=Ray-Ban" },
    { label: "Gucci", href: "/collections/all?brand=Gucci" },
    { label: "Dior", href: "/collections/all?brand=Dior" },
    { label: "Prada", href: "/collections/all?brand=Prada" },
    { label: "Tom Ford", href: "/collections/all?brand=Tom Ford" },
    { label: "Cartier", href: "/collections/all?brand=Cartier" },
    { label: "Voir toutes les marques", href: "/marques" },
  ]),
];
