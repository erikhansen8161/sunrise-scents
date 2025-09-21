export interface Product {
  id: string;
  name: string;
  prices: {
    '10ml': number;
    '30ml': number;
  };
  description: string;
  inspiration: string;
  image: string; // Keep for backward compatibility
  images?: string[]; // New array for multiple images (up to 5)
  category: string;
  perfumeNotes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  concentration: string;
  sizes: ('10ml' | '30ml')[];
}

export const products: Product[] = [
  {
    id: 'pink-sunrise',
    name: 'Pink Sunrise',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A delicate and feminine fragrance that captures the soft beauty of dawn.',
    inspiration: 'Inspired by Pink Chiffon by BBW',
    image: '/images/pink-sunrise.jpg',
    category: 'floral',
    perfumeNotes: {
      top: ['Pink Grapefruit', 'Bergamot', 'Mandarin'],
      heart: ['Rose Petals', 'Peony', 'Lily of the Valley'],
      base: ['White Musk', 'Sandalwood', 'Vanilla']
    },
    concentration: 'Eau de Parfum (EDP)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'sweet-haze',
    name: 'Sweet Haze',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A gourmand delight with marshmallow sweetness and creamy undertones.',
    inspiration: 'Inspired by Kyse Perfumes\' Delizia di Marshmallow',
    image: '/images/sweet-haze.jpg',
    category: 'oriental',
    perfumeNotes: {
      top: ['Sweet Orange', 'Pink Pepper'],
      heart: ['Marshmallow', 'Vanilla Orchid', 'Coconut'],
      base: ['Tonka Bean', 'White Musk', 'Amber']
    },
    concentration: 'Eau de Parfum (EDP)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'nordic-love',
    name: 'Nordic Love',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A bold and passionate fragrance with sophisticated depth.',
    inspiration: 'Inspired by Killian\'s Love Don\'t be Shy',
    image: '/images/nordic-love.jpg',
    category: 'oriental',
    perfumeNotes: {
      top: ['Neroli', 'Orange Blossom'],
      heart: ['Marshmallow', 'Iris', 'Rose'],
      base: ['Vanilla', 'Musk', 'Cinnamon']
    },
    concentration: 'Eau de Parfum (EDP)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'midnight-oud-rose',
    name: 'Midnight Oud Rose',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'An intoxicating blend of precious oud and romantic rose.',
    inspiration: 'Inspired by Kayali\'s Oudgasm Rose Oud',
    image: '/images/midnight-oud-rose.jpg',
    category: 'oriental',
    perfumeNotes: {
      top: ['Bulgarian Rose', 'Turkish Rose'],
      heart: ['Oud', 'Saffron', 'Praline'],
      base: ['Amber', 'Musk', 'Vanilla']
    },
    concentration: 'Eau de Parfum (EDP)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'sunshine-in-the-park',
    name: 'Sunshine in the Park',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A playful and bright fragrance that brings joy to any day.',
    inspiration: 'Inspired by House of Sillage\'s "Tweety Bird"',
    image: '/images/sunshine-in-the-park.jpg',
    category: 'fresh',
    perfumeNotes: {
      top: ['Lemon', 'Green Apple', 'Blackcurrant'],
      heart: ['Peach', 'Jasmine', 'Rose'],
      base: ['Cedar', 'Musk', 'Vanilla']
    },
    concentration: 'Eau de Toilette (EDT)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'herod-carriage',
    name: 'Herod Carriage',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A regal and sophisticated scent with warm spicy notes.',
    inspiration: 'Inspired by Parfums de Marly\'s Herod',
    image: '/images/herod-carriage.jpg',
    category: 'woody',
    perfumeNotes: {
      top: ['Cinnamon', 'Pepper', 'Clove'],
      heart: ['Tobacco Leaf', 'Osmanthus', 'Rose'],
      base: ['Vanilla', 'Sandalwood', 'Cedar', 'Musk']
    },
    concentration: 'Eau de Parfum (EDP)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'gotham-light',
    name: 'Gotham Light',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A mysterious and powerful fragrance with dark elegance.',
    inspiration: 'Inspired by House of Sillage\'s Dark Knight',
    image: '/images/gotham-light.jpg',
    category: 'woody',
    perfumeNotes: {
      top: ['Bergamot', 'Lemon', 'Cardamom'],
      heart: ['Lavender', 'Geranium', 'Cedar'],
      base: ['Sandalwood', 'Vetiver', 'Amber', 'Musk']
    },
    concentration: 'Eau de Parfum (EDP)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'golden-goddess',
    name: 'Golden Goddess',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A divine and luxurious fragrance fit for royalty.',
    inspiration: 'Inspired by Burberry Goddess',
    image: '/images/golden-goddess.jpg',
    category: 'floral',
    perfumeNotes: {
      top: ['Ginger', 'Lavender'],
      heart: ['Vanilla', 'Cocoa', 'Rose'],
      base: ['Sandalwood', 'Vetiver', 'Amber']
    },
    concentration: 'Eau de Parfum (EDP)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'fountain-blue',
    name: 'Fountain Blue',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A crisp and refreshing masculine fragrance with aquatic notes.',
    inspiration: 'Inspired by Dolce & Gabbana Light Blue for Men',
    image: '/images/fountain-blue.jpg',
    category: 'fresh',
    perfumeNotes: {
      top: ['Sicilian Mandarin', 'Frozen Grapefruit Peel', 'Bergamot'],
      heart: ['Rosewood', 'Pepper', 'Juniper'],
      base: ['Incense', 'Oakmoss', 'Musk']
    },
    concentration: 'Eau de Toilette (EDT)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'sunlit-blue',
    name: 'Sunlit Blue',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A luminous and airy feminine fragrance perfect for any occasion.',
    inspiration: 'Inspired by Dolce & Gabbana Light Blue for Women',
    image: '/images/sunlit-blue.jpg',
    category: 'fresh',
    perfumeNotes: {
      top: ['Sicilian Lemon', 'Apple', 'Cedar'],
      heart: ['Bamboo', 'Jasmine', 'White Rose'],
      base: ['Cedar', 'Amber', 'Musk']
    },
    concentration: 'Eau de Toilette (EDT)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'paradox-tower',
    name: 'Paradox Tower',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'An enigmatic fragrance that defies conventional boundaries.',
    inspiration: 'Inspired by Prada Paradox',
    image: '/images/paradox-tower.jpg',
    category: 'floral',
    perfumeNotes: {
      top: ['Pear', 'Tangerine', 'Bergamot'],
      heart: ['Neroli', 'Orange Blossom', 'Jasmine'],
      base: ['Amber', 'Bourbon Vanilla', 'White Musk']
    },
    concentration: 'Eau de Parfum (EDP)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'citrus-campus',
    name: 'Citrus Campus',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A vibrant and energizing citrus blend perfect for daily wear.',
    inspiration: 'Original Sunrise Scents creation',
    image: '/images/citrus-campus.jpg',
    category: 'citrus',
    perfumeNotes: {
      top: ['Lemon', 'Orange', 'Grapefruit'],
      heart: ['Lime', 'Green Tea', 'Mint'],
      base: ['White Musk', 'Cedar', 'Vetiver']
    },
    concentration: 'Eau de Toilette (EDT)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'acadia-noir',
    name: 'Acadia Noir',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A warm, rich, and elegant fragrance inspired by Carolina Herrera\'s Good Girl. Opening with indulgent notes of almond, coffee, and bright citrus, it blossoms into a floral heart of jasmine, tuberose, and rose. A decadent base of tonka, cacao, vanilla, and sandalwood lingers with depth and sophistication. The bottle, adorned with the serene waters and trees of Acadia, Maine, captures the essence of timeless natural beauty wrapped in modern elegance.',
    inspiration: 'Inspired by Carolina Herrera\'s Good Girl',
    image: '/images/acadia-noir.jpg',
    category: 'oriental',
    perfumeNotes: {
      top: ['Almond', 'Coffee', 'Bright Citrus'],
      heart: ['Jasmine', 'Tuberose', 'Rose'],
      base: ['Tonka', 'Cacao', 'Vanilla', 'Sandalwood']
    },
    concentration: 'Eau de Parfum (EDP)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'cherry-oud',
    name: 'Cherry Oud',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A rich and opulent blend of sweet cherry and exotic oud.',
    inspiration: 'Original Sunrise Scents creation',
    image: '/images/cherry-oud.jpg',
    category: 'oriental',
    perfumeNotes: {
      top: ['Black Cherry', 'Bitter Almond'],
      heart: ['Turkish Rose', 'Jasmine', 'Oud'],
      base: ['Vanilla', 'Sandalwood', 'Musk']
    },
    concentration: 'Eau de Parfum (EDP)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'bridge-of-dreams',
    name: 'Bridge of Dreams',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A dreamy and romantic fragrance that captures pure femininity.',
    inspiration: 'Inspired by Marc Jacobs Daisy Dream',
    image: '/images/bridge-of-dreams.jpg',
    category: 'floral',
    perfumeNotes: {
      top: ['Grapefruit', 'Pear', 'Blue Wisteria'],
      heart: ['Jasmine', 'Lychee', 'White Flowers'],
      base: ['Musk', 'Driftwood', 'Coconut Water']
    },
    concentration: 'Eau de Toilette (EDT)',
    sizes: ['10ml', '30ml']
  },
  {
    id: 'banana',
    name: 'Banana',
    prices: {
      '10ml': 15.00,
      '30ml': 35.00
    },
    description: 'A unique and playful fragrance with tropical banana notes.',
    inspiration: 'Original Sunrise Scents creation',
    image: '/images/banana.jpg',
    category: 'fresh',
    perfumeNotes: {
      top: ['Banana', 'Coconut', 'Lime'],
      heart: ['Tropical Flowers', 'Ylang-Ylang', 'Frangipani'],
      base: ['Vanilla', 'White Musk', 'Sandalwood']
    },
    concentration: 'Eau de Toilette (EDT)',
    sizes: ['10ml', '30ml']
  }
];