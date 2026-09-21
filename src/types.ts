export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export type BlouseOption = 'unstitched' | 'boat_neck' | 'deep_back' | 'regal_full_sleeve';

export interface SareeProduct {
  id: string;
  title: string;
  subtitle: string;
  fabric: string;
  weaveType: 'Banarasi' | 'Kanjeevaram' | 'Chanderi' | 'Paithani' | 'Tussar Silk' | 'Organza' | 'Patola';
  occasion: 'Bridal Heritage' | 'Festive Soirée' | 'Cocktail & Evening' | 'Royal Reception' | 'Daytime Grace';
  colorFamily: 'Crimson & Ruby' | 'Peacock & Emerald' | 'Champagne & Gold' | 'Royal Plum' | 'Blush & Rose' | 'Ochre & Mustard';
  colorHex: string;
  price: number; // in INR
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isHeritage?: boolean;
  originRegion: string;
  zariType: string;
  drapeLengthMeters: number;
  blouseIncluded: boolean;
  images: {
    drape: string;
    pallu: string;
    border: string;
    lifestyle: string;
  };
  description: string;
  artisanStory: {
    weaverName: string;
    village: string;
    hoursToWeave: number;
    techniquesUsed: string[];
  };
  careInstructions: string[];
  inStock: boolean;
  stockCount: number;
}

export interface CartItem {
  cartItemId: string;
  product: SareeProduct;
  quantity: number;
  blouseOption: BlouseOption;
  blouseSize: 'Unstitched' | 'XS (32)' | 'S (34)' | 'M (36)' | 'L (38)' | 'XL (40)' | 'Custom Tailored';
  fallPicoIncluded: boolean;
  giftPackaging: boolean;
  giftMessage?: string;
}

export interface FilterState {
  search: string;
  weaveType: string;
  occasion: string;
  colorFamily: string;
  maxPrice: number;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  occasion: string;
  sareeTitle: string;
  avatar: string;
}
