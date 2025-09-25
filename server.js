import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Mock Database
let products = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'Latest Apple flagship with A17 Pro chip, 256GB storage',
    category: 'Smartphones',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800',
    shops: [
      { name: 'TechMart', price: 1299, currency: 'USD', logo: '🏪', visitUrl: '#' },
      { name: 'GadgetStore', price: 1249, currency: 'USD', logo: '🛒', visitUrl: '#' },
      { name: 'ElectroHub', price: 1279, currency: 'USD', logo: '⚡', visitUrl: '#' }
    ],
    specifications: {
      'Display': '6.7-inch Super Retina XDR',
      'Chip': 'A17 Pro',
      'Storage': '256GB',
      'Camera': 'Triple 48MP system'
    }
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android phone with S Pen, 512GB storage',
    category: 'Smartphones',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800',
    shops: [
      { name: 'TechMart', price: 1199, currency: 'USD', logo: '🏪', visitUrl: '#' },
      { name: 'MobileWorld', price: 1179, currency: 'USD', logo: '📱', visitUrl: '#' },
      { name: 'ElectroHub', price: 1209, currency: 'USD', logo: '⚡', visitUrl: '#' }
    ],
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Chip': 'Snapdragon 8 Gen 3',
      'Storage': '512GB',
      'Camera': 'Quad camera with 200MP main'
    }
  },
  {
    id: '3',
    name: 'MacBook Pro 14-inch M3',
    description: 'Professional laptop with M3 chip, 16GB RAM, 512GB SSD',
    category: 'Laptops',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    shops: [
      { name: 'AppleStore', price: 1999, currency: 'USD', logo: '🍎', visitUrl: '#' },
      { name: 'TechMart', price: 1949, currency: 'USD', logo: '🏪', visitUrl: '#' },
      { name: 'ComputerWorld', price: 1979, currency: 'USD', logo: '💻', visitUrl: '#' }
    ],
    specifications: {
      'Chip': 'Apple M3',
      'RAM': '16GB unified memory',
      'Storage': '512GB SSD',
      'Display': '14.2-inch Liquid Retina XDR'
    }
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Premium noise-canceling wireless headphones',
    category: 'Audio',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    shops: [
      { name: 'AudioHub', price: 399, currency: 'USD', logo: '🎧', visitUrl: '#' },
      { name: 'SoundStore', price: 379, currency: 'USD', logo: '🔊', visitUrl: '#' },
      { name: 'TechMart', price: 389, currency: 'USD', logo: '🏪', visitUrl: '#' }
    ],
    specifications: {
      'Type': 'Over-ear wireless',
      'Noise Canceling': 'Industry-leading ANC',
      'Battery': 'Up to 30 hours',
      'Features': 'Touch controls, multipoint connection'
    }
  },
  {
    id: '5',
    name: 'Dell XPS 15 Laptop',
    description: 'High-performance laptop with Intel i7, 32GB RAM',
    category: 'Laptops',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    shops: [
      { name: 'DellDirect', price: 2299, currency: 'USD', logo: '🖥️', visitUrl: '#' },
      { name: 'ComputerWorld', price: 2249, currency: 'USD', logo: '💻', visitUrl: '#' },
      { name: 'TechMart', price: 2279, currency: 'USD', logo: '🏪', visitUrl: '#' }
    ],
    specifications: {
      'Processor': 'Intel Core i7-13700H',
      'RAM': '32GB DDR5',
      'Storage': '1TB SSD',
      'Display': '15.6-inch OLED 3.5K'
    }
  },
  {
    id: '6',
    name: 'iPad Air 5th Gen',
    description: 'Versatile tablet with M1 chip, perfect for creativity',
    category: 'Tablets',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800',
    shops: [
      { name: 'AppleStore', price: 599, currency: 'USD', logo: '🍎', visitUrl: '#' },
      { name: 'TabletHub', price: 579, currency: 'USD', logo: '📱', visitUrl: '#' },
      { name: 'TechMart', price: 589, currency: 'USD', logo: '🏪', visitUrl: '#' }
    ],
    specifications: {
      'Chip': 'Apple M1',
      'Display': '10.9-inch Liquid Retina',
      'Storage': '256GB',
      'Features': 'Touch ID, Apple Pencil support'
    }
  },
  {
    id: '7',
    name: 'Nintendo Switch OLED',
    description: 'Gaming console with vibrant OLED display',
    category: 'Gaming',
    image: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=800',
    shops: [
      { name: 'GameStore', price: 349, currency: 'USD', logo: '🎮', visitUrl: '#' },
      { name: 'ElectroHub', price: 339, currency: 'USD', logo: '⚡', visitUrl: '#' },
      { name: 'TechMart', price: 349, currency: 'USD', logo: '🏪', visitUrl: '#' }
    ],
    specifications: {
      'Display': '7-inch OLED screen',
      'Storage': '64GB internal',
      'Features': 'Dock included, Joy-Con controllers',
      'Battery': 'Up to 9 hours'
    }
  },
  {
    id: '8',
    name: 'Canon EOS R5 Camera',
    description: 'Professional mirrorless camera with 45MP sensor',
    category: 'Cameras',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    shops: [
      { name: 'CameraHub', price: 3899, currency: 'USD', logo: '📷', visitUrl: '#' },
      { name: 'PhotoStore', price: 3849, currency: 'USD', logo: '📸', visitUrl: '#' },
      { name: 'TechMart', price: 3879, currency: 'USD', logo: '🏪', visitUrl: '#' }
    ],
    specifications: {
      'Sensor': '45MP Full-Frame CMOS',
      'Video': '8K RAW recording',
      'Image Stabilization': 'In-body IS',
      'Autofocus': '1053 AF points'
    }
  },
  {
    id: '9',
    name: 'Samsung 65" QLED TV',
    description: '4K QLED Smart TV with HDR and gaming features',
    category: 'TVs',
    image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=800',
    shops: [
      { name: 'ElectroHub', price: 1299, currency: 'USD', logo: '⚡', visitUrl: '#' },
      { name: 'TVWorld', price: 1249, currency: 'USD', logo: '📺', visitUrl: '#' },
      { name: 'TechMart', price: 1279, currency: 'USD', logo: '🏪', visitUrl: '#' }
    ],
    specifications: {
      'Display': '65-inch QLED 4K',
      'HDR': 'HDR10+ support',
      'Smart TV': 'Tizen OS',
      'Gaming': '120Hz, VRR support'
    }
  },
  {
    id: '10',
    name: 'Apple Watch Series 9',
    description: 'Advanced smartwatch with health monitoring',
    category: 'Wearables',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    shops: [
      { name: 'AppleStore', price: 399, currency: 'USD', logo: '🍎', visitUrl: '#' },
      { name: 'WearableHub', price: 379, currency: 'USD', logo: '⌚', visitUrl: '#' },
      { name: 'TechMart', price: 389, currency: 'USD', logo: '🏪', visitUrl: '#' }
    ],
    specifications: {
      'Chip': 'S9 SiP',
      'Display': '45mm Always-On Retina',
      'Health': 'Blood oxygen, ECG, temperature',
      'Battery': 'Up to 18 hours'
    }
  }
];

let searchHistory = [];
let trendingSearches = ['iPhone', 'MacBook', 'headphones', 'gaming laptop', 'smart TV'];
let adminStats = {
  topSearches: [
    { query: 'iPhone', count: 145 },
    { query: 'laptop', count: 98 },
    { query: 'headphones', count: 76 },
    { query: 'camera', count: 54 },
    { query: 'gaming', count: 43 }
  ],
  noResultsQueries: [
    { query: 'flying car', count: 12 },
    { query: 'holographic display', count: 8 },
    { query: 'time machine', count: 5 }
  ],
  topProducts: products.slice(0, 5).map(p => ({ ...p, clickCount: Math.floor(Math.random() * 100) + 20 }))
};

// Helper functions
function fuzzyMatch(query, text) {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  if (textLower.includes(queryLower)) return 2;
  
  const queryChars = queryLower.split('');
  let textIndex = 0;
  let matches = 0;
  
  for (let char of queryChars) {
    while (textIndex < textLower.length && textLower[textIndex] !== char) {
      textIndex++;
    }
    if (textIndex < textLower.length) {
      matches++;
      textIndex++;
    }
  }
  
  return matches / queryChars.length;
}

function searchProducts(query, category = '', minPrice = 0, maxPrice = Infinity) {
  if (!query) return products;
  
  const results = products.filter(product => {
    const matchScore = Math.max(
      fuzzyMatch(query, product.name),
      fuzzyMatch(query, product.description),
      fuzzyMatch(query, product.category)
    );
    
    if (matchScore < 0.3) return false;
    
    if (category && product.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    
    const minShopPrice = Math.min(...product.shops.map(shop => shop.price));
    return minShopPrice >= minPrice && minShopPrice <= maxPrice;
  });
  
  return results.sort((a, b) => {
    const aScore = Math.max(
      fuzzyMatch(query, a.name),
      fuzzyMatch(query, a.description),
      fuzzyMatch(query, a.category)
    );
    const bScore = Math.max(
      fuzzyMatch(query, b.name),
      fuzzyMatch(query, b.description),
      fuzzyMatch(query, b.category)
    );
    return bScore - aScore;
  });
}

// API Routes
app.get('/api/search', (req, res) => {
  const { query, category, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;
  
  // Add to search history
  if (query && !searchHistory.includes(query)) {
    searchHistory.unshift(query);
    if (searchHistory.length > 10) searchHistory.pop();
  }
  
  let results = searchProducts(
    query,
    category,
    minPrice ? parseInt(minPrice) : 0,
    maxPrice ? parseInt(maxPrice) : Infinity
  );
  
  // Sorting
  if (sort === 'price_asc') {
    results.sort((a, b) => Math.min(...a.shops.map(s => s.price)) - Math.min(...b.shops.map(s => s.price)));
  } else if (sort === 'price_desc') {
    results.sort((a, b) => Math.min(...b.shops.map(s => s.price)) - Math.min(...a.shops.map(s => s.price)));
  }
  
  // Pagination
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const paginatedResults = results.slice(startIndex, startIndex + parseInt(limit));
  
  res.json({
    products: paginatedResults,
    total: results.length,
    page: parseInt(page),
    hasMore: startIndex + parseInt(limit) < results.length
  });
});

app.get('/api/suggestions', (req, res) => {
  const { query } = req.query;
  
  if (!query || query.length < 2) {
    return res.json({ suggestions: trendingSearches.slice(0, 5) });
  }
  
  const suggestions = [
    ...searchHistory.filter(item => item.toLowerCase().includes(query.toLowerCase())),
    ...trendingSearches.filter(item => item.toLowerCase().includes(query.toLowerCase())),
    ...products
      .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      .map(p => p.name)
  ].slice(0, 8);
  
  res.json({ suggestions: [...new Set(suggestions)] });
});

app.get('/api/product/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

app.get('/api/trending', (req, res) => {
  res.json({
    searches: trendingSearches,
    products: products
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
  });
});

app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json({ categories });
});

app.get('/api/admin/stats', (req, res) => {
  res.json(adminStats);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});