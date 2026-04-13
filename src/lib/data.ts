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
    public description?: string
  ) {}

  get formattedPrice(): string {
    return `${this.price.toLocaleString("fr-DZ")} DA`;
  }
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
    public logo: string
  ) {}
}

// ============================================
// Sample Data
// ============================================

export const featuredProducts: Product[] = [
  new Product("1", "Ray-Ban Aviator Classic", 32000, "/products/aviator.jpg", "Solaire", "best-seller", "Le modèle iconique qui traverse les décennies"),
  new Product("2", "Gucci GG0061S", 58000, "/products/gucci.jpg", "Solaire", "nouveau", "Élégance italienne, protection maximale"),
  new Product("3", "Tom Ford FT5401", 45000, "/products/tomford.jpg", "Optique", "tendance", "Raffinement et confort au quotidien"),
];

export const popularProducts: Product[] = [
  new Product("4", "Dior SoStellaire1", 62000, "/products/dior.jpg", "Solaire"),
  new Product("5", "Prada PR 17WS", 48000, "/products/prada.jpg", "Solaire"),
  new Product("6", "Oakley Holbrook", 22000, "/products/oakley.jpg", "Sport"),
  new Product("7", "Cartier CT0270S", 95000, "/products/cartier.jpg", "Luxe"),
  new Product("8", "Persol PO3019S", 35000, "/products/persol.jpg", "Solaire"),
  new Product("9", "Versace VE4361", 38000, "/products/versace.jpg", "Solaire"),
  new Product("10", "Hugo Boss 1451/S", 28000, "/products/boss.jpg", "Optique"),
  new Product("11", "Carrera 1047/S", 19500, "/products/carrera.jpg", "Sport"),
];

export const categories: Category[] = [
  new Category("1", "Lunettes de Soleil", "solaire", 86, "/categories/solaire.jpg", "Protection et style sous le soleil"),
  new Category("2", "Lunettes Optiques", "optique", 64, "/categories/optique.jpg", "Vision nette, design élégant"),
  new Category("3", "Lentilles de Contact", "lentilles", 32, "/categories/lentilles.jpg", "Confort invisible, liberté totale"),
  new Category("4", "Lunettes de Sport", "sport", 28, "/categories/sport.jpg", "Performance et résistance"),
  new Category("5", "Collection Enfant", "enfant", 45, "/categories/enfant.jpg", "Style et solidité pour les petits"),
  new Category("6", "Accessoires", "accessoires", 38, "/categories/accessoires.jpg", "Étuis, cordons et entretien"),
];

export const testimonials: Testimonial[] = [
  new Testimonial("1", "Amira B.", "Alger", 5, "Qualité exceptionnelle et service irréprochable. Mes Ray-Ban sont authentiques et le prix est imbattable. Je recommande vivement !"),
  new Testimonial("2", "Karim M.", "Oran", 5, "Lunettes Gucci magnifiques, livrées en 48h parfaitement emballées. Le SAV est très réactif. Bravo New Look Optic !"),
  new Testimonial("3", "Sofia L.", "Constantine", 5, "Enfin un opticien en ligne de confiance en Algérie. Produits certifiés, garantie 2 ans. Je suis cliente fidèle."),
  new Testimonial("4", "Mehdi T.", "Blida", 5, "Service premium du début à la fin. Conseils personnalisés et lunettes de qualité supérieure. Merci !"),
  new Testimonial("5", "Yasmine K.", "Annaba", 5, "Magnifique sélection de marques. Ma Prada est sublime. Paiement à la livraison très pratique."),
];
