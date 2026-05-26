export type Category = {
  id: string
  label: string
  /** Couleur de fond du monogramme (foncée, à associer à une lettre blanche). */
  tint: string
  /** Petit label gris à droite du titre de section. */
  subtitle?: string
}

export type Product = {
  id: string
  name: string
  category: string
  description: string
  price: number
  /** URL d'image. Vide = afficher le monogramme (1re lettre du nom). */
  image?: string
  /** Étiquette type "SIGNATURE", "POPULAIRE", "NOUVEAU". Optionnel. */
  badge?: string
  available: boolean
}

export const categories: Category[] = [
  { id: 'burgers', label: 'Burgers', tint: '#5a3a28', subtitle: 'smash & signature' },
  { id: 'tacos', label: 'Tacos', tint: '#a14a2a', subtitle: 'à la française' },
  { id: 'sandwichs', label: 'Sandwichs', tint: '#8b6f3f', subtitle: 'frais du jour' },
  { id: 'kebabs', label: 'Kebabs', tint: '#6b3527', subtitle: 'marinade maison' },
  { id: 'poulet', label: 'Poulet', tint: '#8a5a2a', subtitle: 'spécialité 07' },
  { id: 'accompagnements', label: 'Accompagnements', tint: '#b8843e', subtitle: 'croustillants' },
  { id: 'desserts', label: 'Desserts', tint: '#a5586d', subtitle: 'fait maison' },
  { id: 'boissons', label: 'Boissons', tint: '#3a5a55', subtitle: 'rafraîchissants' },
]

// Pour ajouter une photo réelle : range-la dans public/products/<id>.jpg
// puis ajoute la ligne `image: '/products/<id>.jpg',` dans l'objet du produit.
// Sinon, le monogramme (1re lettre + couleur de la catégorie) est utilisé.
// Badges possibles : 'SIGNATURE', 'POPULAIRE', 'NOUVEAU'.
export const products: Product[] = [
  {
    id: 'burger-simple',
    name: 'Burger Simple',
    category: 'burgers',
    description: 'Pain, steak, salade et sauce maison',
    price: 100,
    image: '/products/burger-simple.jpg',
    available: true,
  },
  {
    id: 'tiss-burger',
    name: 'Tiss Burger',
    category: 'burgers',
    description: 'Notre burger signature 07FOOD',
    price: 150,
    badge: 'SIGNATURE',
    image: '/products/tiss-burger.jpg',
    available: true,
  },
  {
    id: 'tacos',
    name: 'Tacos',
    category: 'tacos',
    description: 'Tortilla, viande, fromage fondu, sauce',
    price: 150,
    image: '/products/tacos.jpg',
    available: true,
  },
  {
    id: 'sandwich',
    name: 'Sandwich',
    category: 'sandwichs',
    description: 'Pain frais et garniture du jour',
    price: 50,
    image: '/products/sandwich.jpg',
    available: true,
  },
  {
    id: 'sandwich-07',
    name: 'Sandwich 07',
    category: 'sandwichs',
    description: 'Notre sandwich signature 07FOOD',
    price: 70,
    badge: 'SIGNATURE',
    image: '/products/sandwich-07.jpg',
    available: true,
  },
  {
    id: 'sandwich-mix',
    name: 'Sandwich Mix',
    category: 'sandwichs',
    description: 'Mélange de garnitures généreuses',
    price: 70,
    image: '/products/sandwich-mix.jpg',
    available: true,
  },
  {
    id: 'kebab',
    name: 'Kebab',
    category: 'kebabs',
    description: 'Pain, viande grillée, crudités, sauce',
    price: 50,
    image: '/products/kebab.jpg',
    available: true,
  },
  {
    id: 'kebab-07',
    name: 'Kebab 07',
    category: 'kebabs',
    description: 'Notre kebab signature 07FOOD',
    price: 70,
    badge: 'SIGNATURE',
    image: '/products/kebab-07.jpg',
    available: true,
  },
  {
    id: 'kebab-mix',
    name: 'Kebab Mix',
    category: 'kebabs',
    description: 'Mélange de viandes grillées',
    price: 70,
    image: '/products/kebab-mix.jpg',
    available: true,
  },
  {
    id: 'shawarma',
    name: 'Shawarma',
    category: 'kebabs',
    description: 'Viande marinée, pain libanais, légumes',
    price: 100,
    badge: 'POPULAIRE',
    image: '/products/shawarma.jpg',
    available: true,
  },
  {
    id: 'poulet-complet',
    name: 'Poulet Complet',
    category: 'poulet',
    description: 'Poulet entier grillé et accompagnement',
    price: 400,
    image: '/products/poulet-complet.jpg',
    available: true,
  },
  {
    id: 'demi-poulet',
    name: '½ Poulet',
    category: 'poulet',
    description: 'Demi-poulet grillé et accompagnement',
    price: 300,
    image: '/products/demi-poulet.jpg',
    available: true,
  },
  {
    id: 'quart-poulet',
    name: '¼ Poulet',
    category: 'poulet',
    description: 'Quart de poulet grillé et accompagnement',
    price: 150,
    badge: 'POPULAIRE',
    image: '/products/quart-poulet.jpg',
    available: true,
  },
  {
    id: 'ndoukess',
    name: 'Ndoukess',
    category: 'poulet',
    description: 'Spécialité maison à base de poulet',
    price: 100,
    image: '/products/ndoukess.jpg',
    available: true,
  },
  {
    id: 'plat-frites',
    name: 'Plat de Frites',
    category: 'accompagnements',
    description: 'Frites dorées et croustillantes',
    price: 50,
    image: '/products/plat-frites.jpg',
    available: true,
  },
  {
    id: 'dessert-special',
    name: 'Dessert Spécial',
    category: 'desserts',
    description: 'Dessert maison du jour',
    price: 90,
    image: '/products/dessert.jpg',
    available: true,
  },
  {
    id: 'dessert',
    name: 'Dessert',
    category: 'desserts',
    description: 'Notre dessert simple, toujours frais',
    price: 70,
    image: '/products/dessert-special.jpg',
    available: true,
  },
  {
    id: 'jus-mangue',
    name: 'Jus de Mangue',
    category: 'boissons',
    description: 'Jus de mangue frais pressé',
    price: 150,
    image: '/products/jus-mangue.jpg',
    available: true,
  },
  {
    id: 'jus-banane',
    name: 'Jus de Banane',
    category: 'boissons',
    description: 'Jus de banane onctueux',
    price: 150,
    image: '/products/jus-banane.jpg',
    available: true,
  },
  {
    id: 'jus-avocat',
    name: "Jus d'Avocat",
    category: 'boissons',
    description: "Jus d'avocat crémeux",
    price: 150,
    image: '/products/jus-avocat.jpg',
    available: true,
  },
  {
    id: 'jus-ananas',
    name: "Jus d'Ananas",
    category: 'boissons',
    description: "Jus d'ananas frais",
    price: 150,
    image: '/products/jus-ananas.jpg',
    available: true,
  },
  {
    id: 'mojito-fruits-rouges',
    name: 'Mojito Fruits Rouges',
    category: 'boissons',
    description: 'Fruits rouges, menthe fraîche, citron',
    price: 150,
    badge: 'POPULAIRE',
    image: '/products/mojito-fruits-rouges.jpg',
    available: true,
  },
  {
    id: 'mojito-classique',
    name: 'Mojito Classique',
    category: 'boissons',
    description: 'Menthe fraîche et citron, rafraîchissant',
    price: 100,
    image: '/products/mojito-classique.jpg',
    available: true,
  },
  {
    id: 'milkshake-chocolat',
    name: 'Milkshake Chocolat',
    category: 'boissons',
    description: 'Milkshake onctueux au chocolat',
    price: 100,
    image: '/products/milkshake-chocolat.jpg',
    available: true,
  },
  {
    id: 'milkshake-fraise',
    name: 'Milkshake Fraise',
    category: 'boissons',
    description: 'Milkshake gourmand à la fraise',
    price: 100,
    image: '/products/milkshake-fraise.jpg',
    available: true,
  },
  {
    id: 'bissap',
    name: 'Bissap',
    category: 'boissons',
    description: 'Boisson rafraîchissante à base de fleur d’hibiscus',
    price: 20,
    image: '/products/bissap.jpg',
    available: true,
  },
  {
    id: 'tejmakhett',
    name: 'Tejmakhett',
    category: 'boissons',
    description: 'Boisson traditionnelle mauritanienne',
    price: 20,
    image: '/products/tejmakhett.jpg',
    available: true,
  },
]
