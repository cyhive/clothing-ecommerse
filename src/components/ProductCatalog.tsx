import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SareeProduct, Currency, FilterState } from '../types';
import { formatPrice, calculateDiscount } from '../utils/format';
import { Heart, Eye, ShoppingBag, SlidersHorizontal, X, Check, Star, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductCatalogProps {
  products: SareeProduct[];
  currency: Currency;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: SareeProduct) => void;
  onQuickAddToCart: (product: SareeProduct) => void;
  initialWeaveFilter?: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAddToCart,
  initialWeaveFilter,
}) => {
  const [filterState, setFilterState] = useState<FilterState>({
    search: '',
    weaveType: initialWeaveFilter || 'All',
    occasion: 'All',
    colorFamily: 'All',
    maxPrice: 100000,
    sortBy: 'featured',
  });

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  // Sync initial weave filter if passed externally
  React.useEffect(() => {
    if (initialWeaveFilter) {
      setFilterState((prev) => ({ ...prev, weaveType: initialWeaveFilter }));
    }
  }, [initialWeaveFilter]);

  const weaveTypes = ['All', 'Banarasi', 'Kanjeevaram', 'Chanderi', 'Paithani', 'Tussar Silk', 'Organza', 'Patola'];
  const occasions = ['All', 'Bridal Heritage', 'Festive Soirée', 'Cocktail & Evening', 'Royal Reception', 'Daytime Grace'];
  const colorFamilies = ['All', 'Crimson & Ruby', 'Peacock & Emerald', 'Champagne & Gold', 'Royal Plum', 'Blush & Rose', 'Ochre & Mustard'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        if (
          filterState.search &&
          !p.title.toLowerCase().includes(filterState.search.toLowerCase()) &&
          !p.subtitle.toLowerCase().includes(filterState.search.toLowerCase()) &&
          !p.originRegion.toLowerCase().includes(filterState.search.toLowerCase()) &&
          !p.fabric.toLowerCase().includes(filterState.search.toLowerCase())
        ) {
          return false;
        }
        // Weave
        if (filterState.weaveType !== 'All' && p.weaveType !== filterState.weaveType) {
          return false;
        }
        // Occasion
        if (filterState.occasion !== 'All' && p.occasion !== filterState.occasion) {
          return false;
        }
        // Color
        if (filterState.colorFamily !== 'All' && p.colorFamily !== filterState.colorFamily) {
          return false;
        }
        // Price
        if (p.price > filterState.maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'price-low') return a.price - b.price;
        if (filterState.sortBy === 'price-high') return b.price - a.price;
        if (filterState.sortBy === 'rating') return b.rating - a.rating;
        if (filterState.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, filterState]);

  const handleQuickAdd = (p: SareeProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAddToCart(p);
    setQuickAddedId(p.id);
    setTimeout(() => setQuickAddedId(null), 1500);
  };

  const clearFilters = () => {
    setFilterState({
      search: '',
      weaveType: 'All',
      occasion: 'All',
      colorFamily: 'All',
      maxPrice: 100000,
      sortBy: 'featured',
    });
  };

  const hasActiveFilters =
    filterState.weaveType !== 'All' ||
    filterState.occasion !== 'All' ||
    filterState.colorFamily !== 'All' ||
    filterState.search !== '' ||
    filterState.maxPrice < 100000;

  return (
    <section id="catalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#292524] gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Handloom Archive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display-regal text-[#fbf8f2]">
            Curated Heirloom Sarees
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a29e] mt-1 font-light">
            Showing {filteredProducts.length} certified pure handloom creations
          </p>
        </div>

        {/* Action Controls: Search, Filter Toggle, Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search weaves, zari, motifs..."
              value={filterState.search}
              onChange={(e) => setFilterState({ ...filterState, search: e.target.value })}
              className="w-48 sm:w-60 bg-[#161310] border border-[#332a24] rounded-full py-2 pl-4 pr-8 text-xs text-[#f5f2eb] placeholder-[#78716c] focus:outline-none focus:border-[#d4af37] transition-all"
            />
            {filterState.search && (
              <button
                onClick={() => setFilterState({ ...filterState, search: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#f5f2eb]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Drawer Toggle */}
          <button
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className={`flex items-center gap-2 py-2 px-4 rounded-full border text-xs uppercase tracking-wider transition-all cursor-pointer ${
              hasActiveFilters
                ? 'bg-[#d4af37] text-[#0c0a09] border-[#d4af37] font-semibold'
                : 'bg-[#181512] text-[#d6d3d1] border-[#332a24] hover:border-[#d4af37]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {hasActiveFilters && '• Active'}</span>
          </button>

          {/* Sort Select */}
          <select
            value={filterState.sortBy}
            onChange={(e) => setFilterState({ ...filterState, sortBy: e.target.value as any })}
            className="bg-[#181512] border border-[#332a24] rounded-full py-2 px-4 text-xs text-[#d6d3d1] focus:outline-none focus:border-[#d4af37] cursor-pointer"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">New Arrivals</option>
          </select>
        </div>
      </div>

      {/* Quick Weave Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {weaveTypes.map((wt) => (
          <button
            key={wt}
            onClick={() => setFilterState({ ...filterState, weaveType: wt })}
            className={`whitespace-nowrap py-1.5 px-4 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer ${
              filterState.weaveType === wt
                ? 'bg-[#d4af37] text-[#0c0a09] font-medium shadow-md shadow-[#d4af37]/20'
                : 'bg-[#16120f] border border-[#2b241d] text-[#a8a29e] hover:text-[#f5f2eb] hover:border-[#44382e]'
            }`}
          >
            {wt === 'All' ? 'All Weaves' : wt}
          </button>
        ))}
      </div>

      {/* Expandable Filter Drawer Panel */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8 rounded-2xl bg-[#14110f] border border-[#332a24] p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#292524]">
              <h4 className="text-sm font-display-regal uppercase tracking-wider text-[#f5f2eb]">
                Refine Curated Collection
              </h4>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#d4af37] hover:underline flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Occasion Filter */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a8a29e] mb-2.5">
                  Occasion & Ceremony
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setFilterState({ ...filterState, occasion: occ })}
                      className={`text-[11px] py-1 px-3 rounded-lg border transition-all ${
                        filterState.occasion === occ
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]'
                          : 'border-[#292524] text-[#a8a29e] hover:border-[#44382e]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Family Filter */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a8a29e] mb-2.5">
                  Color Palette
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {colorFamilies.map((col) => (
                    <button
                      key={col}
                      onClick={() => setFilterState({ ...filterState, colorFamily: col })}
                      className={`text-[11px] py-1 px-3 rounded-lg border transition-all ${
                        filterState.colorFamily === col
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]'
                          : 'border-[#292524] text-[#a8a29e] hover:border-[#44382e]'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs uppercase tracking-wider text-[#a8a29e]">
                    Max Price
                  </label>
                  <span className="text-xs font-mono text-[#d4af37]">
                    Up to {formatPrice(filterState.maxPrice, currency)}
                  </span>
                </div>
                <input
                  type="range"
                  min={20000}
                  max={100000}
                  step={5000}
                  value={filterState.maxPrice}
                  onChange={(e) => setFilterState({ ...filterState, maxPrice: Number(e.target.value) })}
                  className="w-full accent-[#d4af37] cursor-pointer bg-[#292524] h-1.5 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-[#78716c] mt-1">
                  <span>{formatPrice(20000, currency)}</span>
                  <span>{formatPrice(100000, currency)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 rounded-2xl border border-dashed border-[#332a24] bg-[#14110f] p-8">
          <p className="text-lg font-serif-luxury text-[#fbf8f2] mb-2">No master drapes match your filter combination.</p>
          <p className="text-xs text-[#a8a29e] mb-5">Try relaxing your price range or clearing occasion selections.</p>
          <button
            onClick={clearFilters}
            className="py-2.5 px-6 rounded-full bg-[#d4af37] text-[#0c0a09] text-xs uppercase tracking-wider font-semibold hover:bg-[#e5c158]"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          const isHovered = hoveredProductId === product.id;
          const discountPercent = calculateDiscount(product.originalPrice, product.price);

          return (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer rounded-2xl bg-[#15120f] border border-[#2b241d] hover:border-[#d4af37]/50 transition-all duration-500 shadow-xl overflow-hidden flex flex-col justify-between"
            >
              {/* Product Media Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#0c0a09]">
                {/* Main image vs Secondary Hover Angle */}
                <img
                  src={isHovered ? product.images.pallu : product.images.drape}
                  alt={product.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                />

                {/* Subtle dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#15120f] via-transparent to-black/20 pointer-events-none" />

                {/* Badges on top */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.isBestseller && (
                    <span className="bg-[#b91c1c] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow">
                      Bestseller
                    </span>
                  )}
                  {product.isNewArrival && (
                    <span className="bg-[#1e3a8a] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow">
                      New In Loom
                    </span>
                  )}
                  {product.isHeritage && (
                    <span className="bg-[#1c1917]/80 backdrop-blur-md border border-[#d4af37]/40 text-[#d4af37] text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded shadow">
                      Heirloom
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#12100e]/80 backdrop-blur-md border border-[#332a24] hover:border-[#d4af37] flex items-center justify-center transition-all group-hover:scale-105 cursor-pointer shadow-lg z-10"
                  aria-label="Toggle Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted ? 'fill-[#b91c1c] text-[#b91c1c]' : 'text-[#f5f2eb] hover:text-[#d4af37]'
                    }`}
                  />
                </button>

                {/* Quick Action Overlay (Slide-up on Desktop) */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#1c1815]/90 backdrop-blur-md border border-[#3d332a] hover:border-[#d4af37] text-xs text-[#f5f2eb] font-medium flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Quick View</span>
                  </button>

                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="py-2 px-3 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0c0a09] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg"
                    title="Quick Add to Bag"
                  >
                    {quickAddedId === product.id ? (
                      <Check className="w-4 h-4 text-[#0c0a09]" />
                    ) : (
                      <ShoppingBag className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Scarcity pill */}
                {product.stockCount <= 3 && (
                  <div className="absolute bottom-3 left-3 text-[10px] text-[#fca5a5] bg-[#450a0a]/80 backdrop-blur-sm border border-[#7f1d1d] px-2 py-0.5 rounded group-hover:opacity-0 transition-opacity">
                    Only {product.stockCount} drapes woven
                  </div>
                )}
              </div>

              {/* Product Information */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#a8a29e] mb-1">
                    <span className="uppercase tracking-wider font-mono text-[10px] text-[#d4af37]">
                      {product.weaveType} • {product.originRegion.split(',')[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                      <span className="text-[#f5f2eb] font-medium">{product.rating}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-serif-luxury font-semibold text-[#fbf8f2] group-hover:text-[#d4af37] transition-colors leading-snug line-clamp-1 mb-1">
                    {product.title}
                  </h3>

                  <p className="text-xs text-[#78716c] line-clamp-1 mb-3">
                    {product.subtitle}
                  </p>
                </div>

                {/* Pricing & Silk Mark Guarantee */}
                <div className="pt-3 border-t border-[#241f1a] flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-medium text-[#fbf8f2]">
                      {formatPrice(product.price, currency)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-[#78716c] line-through">
                        {formatPrice(product.originalPrice, currency)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-[#a8a29e]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className="hidden sm:inline">Pure Silk</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
