export interface Product {
  id: string
  name: string
  price: number
  salePrice?: number
  image: string
  collection: 'été' | 'hiver' | 'premium' | 'confort'
  colors: string[]
  sizes: string[]
  rating: number
  reviews: number
  description: string
  features: string[]
  inStock: boolean
  badge?: 'bestseller' | 'new' | 'sale'
}

export const products: Product[] = [
  // Collection Été - 2 produits
  {
    id: '1',
    name: 'Pyjama Été Léger',
    price: 89.99,
    salePrice: 69.99,
    image: 'summer-light',
    collection: 'été',
    colors: ['Rose', 'Jaune'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 187,
    description: 'Parfait pour les nuits chaudes. Tissu léger et respirant.',
    features: ['Tissu aéré', 'Séchage rapide', 'Léger', 'Respirant'],
    inStock: true,
    badge: 'sale',
  },
  {
    id: '2',
    name: 'Pyjama Lin Respirant',
    price: 139.99,
    image: 'linen-breeze',
    collection: 'été',
    colors: ['Rose', 'Jaune'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviews: 143,
    description: 'Lin pur pour une légèreté extrême. Parfait pour l\'été.',
    features: ['Lin 100%', 'Très léger', 'Froisse naturellement', 'Écologique'],
    inStock: true,
  },

  // Collection Hiver - 2 produits
  {
    id: '3',
    name: 'Pyjama Hiver Douillet',
    price: 159.99,
    image: 'winter-cozy',
    collection: 'hiver',
    colors: ['Rose', 'Jaune'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 312,
    description: 'Pyjama chaud et douillet pour les froides nuits d\'hiver.',
    features: ['Intérieur molletonné', 'Très chaud', 'Confortable', 'Respirant'],
    inStock: true,
  },
  {
    id: '4',
    name: 'Pyjama Hiver Cachemire',
    price: 249.99,
    image: 'cashmere-winter',
    collection: 'hiver',
    colors: ['Rose', 'Jaune'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 145,
    description: 'Cachemire véritable pour les nuits hivernales les plus douilettes.',
    features: ['Cachemire véritable', 'Extrêmement chaud', 'Luxueux', 'Durable'],
    inStock: true,
  },

  // Collection Premium - 2 produits
  {
    id: '5',
    name: 'Pyjama Soie Pure Luxe',
    price: 199.99,
    image: 'silk-luxury',
    collection: 'premium',
    colors: ['Rose', 'Jaune'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 234,
    description: 'Pyjama en soie pure 100%, doux comme un nuage. Parfait pour les nuits luxueuses.',
    features: ['Soie naturelle 100%', 'Anti-transpiration', 'Thermorégulation', 'Boutons nacre'],
    inStock: true,
    badge: 'bestseller',
  },
  {
    id: '6',
    name: 'Pyjama Coton Égyptien Premium',
    price: 149.99,
    image: 'cotton-premium',
    collection: 'premium',
    colors: ['Rose', 'Jaune'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 456,
    description: 'Coton égyptien de haute qualité pour un confort inégalé. Durable et respirant.',
    features: ['Coton égyptien', 'Très durable', 'Hypoallergénique', 'Anti-boulochage'],
    inStock: true,
    badge: 'bestseller',
  },

  // Collection Confort - 2 produits
  {
    id: '7',
    name: 'Pyjama Bambou Écologique',
    price: 129.99,
    image: 'bamboo-eco',
    collection: 'confort',
    colors: ['Rose', 'Jaune'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 289,
    description: 'Fibres de bambou écologiques et douces pour un sommeil respectueux de la nature.',
    features: ['Bambou durable', 'Écologique', 'Ultra doux', 'Thermorégulation'],
    inStock: true,
    badge: 'new',
  },
  {
    id: '8',
    name: 'Pyjama Microfibre Douce',
    price: 99.99,
    image: 'microfiber-soft',
    collection: 'confort',
    colors: ['Rose', 'Jaune'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 521,
    description: 'Microfibre extrêmement douce pour un maximum de confort.',
    features: ['Ultra doux', 'Sèche vite', 'Facile d\'entretien', 'Durable'],
    inStock: true,
  },
]

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id)
}

export const getProductsByCollection = (collection: Product['collection']): Product[] => {
  return products.filter((p) => p.collection === collection)
}

export const getBestSellers = (): Product[] => {
  return products.filter((p) => p.badge === 'bestseller').slice(0, 6)
}

export const getNewProducts = (): Product[] => {
  return products.filter((p) => p.badge === 'new')
}

export const getSaleProducts = (): Product[] => {
  return products.filter((p) => p.salePrice)
}
