import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SareeProduct, Currency, BlouseOption, CartItem } from '../types';
import { formatPrice, calculateDiscount } from '../utils/format';
import { X, Heart, ShoppingBag, ShieldCheck, Award, Clock, Sparkles, Check, ChevronRight, Scissors, Gift, Info } from 'lucide-react';

interface ProductDetailModalProps {
  product: SareeProduct | null;
  currency: Currency;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedImageKey, setSelectedImageKey] = useState<'drape' | 'pallu' | 'border' | 'lifestyle'>('drape');
  const [blouseOption, setBlouseOption] = useState<BlouseOption>('unstitched');
  const [blouseSize, setBlouseSize] = useState<CartItem['blouseSize']>('Unstitched');
  const [fallPico, setFallPico] = useState(true);
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Blouse extra pricing in INR
  const blouseSurcharge: Record<BlouseOption, number> = {
    unstitched: 0,
    boat_neck: 1800,
    deep_back: 1500,
    regal_full_sleeve: 2400,
  };

  const unitTotalINR = product.price + blouseSurcharge[blouseOption] + (giftPackaging ? 500 : 0);
  const discountPercent = calculateDiscount(product.originalPrice, product.price);

  const handleAdd = () => {
    onAddToCart({
      product,
      quantity,
      blouseOption,
      blouseSize,
      fallPicoIncluded: fallPico,
      giftPackaging,
      giftMessage: giftPackaging ? giftMessage : undefined,
    });
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 700);
  };

  const imageList = [
    { key: 'drape', label: 'Full Drape', url: product.images.drape },
    { key: 'pallu', label: 'Pallu & Weft', url: product.images.pallu },
    { key: 'border', label: 'Zari Border', url: product.images.border },
    { key: 'lifestyle', label: 'Editorial Look', url: product.images.lifestyle },
  ] as const;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl bg-[#14110f] border border-[#332a24] rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0c0a09]/80 border border-[#332a24] text-[#a8a29e] hover:text-[#f5f2eb] hover:border-[#d4af37] flex items-center justify-center transition-all cursor-pointer shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Multi-Angle High-Resolution Visual Gallery */}
          <div className="md:w-1/2 p-6 flex flex-col bg-[#0c0a09]">
            {/* Active Display Image with Zoom Effect */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#16120f] border border-[#26201b] mb-4 group">
              <img
                src={product.images[selectedImageKey]}
                alt={`${product.title} - ${selectedImageKey}`}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 bg-[#0c0a09]/80 backdrop-blur-md border border-[#332a24] text-[10px] uppercase tracking-wider text-[#d4af37] px-2.5 py-1 rounded-full">
                {product.weaveType} Weave
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-4 gap-2.5">
              {imageList.map((img) => (
                <button
                  key={img.key}
                  onClick={() => setSelectedImageKey(img.key)}
                  className={`relative aspect-square rounded-xl overflow-hidden border transition-all cursor-pointer ${
                    selectedImageKey === img.key
                      ? 'border-[#d4af37] ring-2 ring-[#d4af37]/30 shadow-md'
                      : 'border-[#26201b] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-black/70 text-[9px] text-center text-[#d6d3d1] py-0.5 truncate">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Artisan Vignette under image */}
            <div className="mt-5 p-4 rounded-xl bg-[#181512] border border-[#2b241d] flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#26201a] border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="text-left">
                <p className="text-[11px] text-[#a8a29e] uppercase tracking-wider">Artisan Pedigree</p>
                <p className="text-xs font-medium text-[#f5f2eb]">{product.artisanStory.weaverName}</p>
                <p className="text-[11px] text-[#78716c]">{product.artisanStory.hoursToWeave} Loom-Hours • {product.artisanStory.village}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Customization, Specifications, and Purchase Flow */}
          <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[92vh] flex flex-col justify-between">
            <div>
              {/* Header Info */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#d4af37]">
                  {product.originRegion}
                </span>
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="flex items-center gap-1.5 text-xs text-[#a8a29e] hover:text-[#d4af37] cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-[#b91c1c] text-[#b91c1c]' : 'text-[#a8a29e]'
                    }`}
                  />
                  <span>{isWishlisted ? 'Saved to Vault' : 'Save to Vault'}</span>
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#fbf8f2] leading-tight mb-2">
                {product.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#a8a29e] mb-4">{product.subtitle}</p>

              {/* Price & Discount */}
              <div className="flex items-baseline gap-3 mb-6 p-3.5 rounded-xl bg-[#1a1613] border border-[#2b241d]">
                <span className="text-2xl sm:text-3xl font-display-regal font-semibold text-[#fbf8f2]">
                  {formatPrice(unitTotalINR * quantity, currency)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-[#78716c] line-through">
                    {formatPrice(product.originalPrice * quantity, currency)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#b91c1c]/20 text-[#f87171] border border-[#b91c1c]/40">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#d6d3d1] font-light leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Blouse Stitching Customization */}
              <div className="mb-6 p-4 rounded-xl bg-[#1a1613] border border-[#332a24]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#f5f2eb]">
                      Blouse Customization
                    </span>
                  </div>
                  <span className="text-[11px] text-[#a8a29e]">Running fabric included</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { id: 'unstitched', label: 'Unstitched Fabric', surcharge: 0 },
                    { id: 'boat_neck', label: 'Designer Boat Neck', surcharge: 1800 },
                    { id: 'deep_back', label: 'Classic Deep Back + Latkan', surcharge: 1500 },
                    { id: 'regal_full_sleeve', label: 'Regal Full Sleeve', surcharge: 2400 },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setBlouseOption(opt.id as BlouseOption);
                        if (opt.id === 'unstitched') setBlouseSize('Unstitched');
                        else if (blouseSize === 'Unstitched') setBlouseSize('M (36)');
                      }}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                        blouseOption === opt.id
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f5f2eb] font-medium'
                          : 'border-[#292524] text-[#a8a29e] hover:border-[#44382e]'
                      }`}
                    >
                      <p className="leading-snug">{opt.label}</p>
                      <p className="text-[10px] text-[#d4af37] mt-1">
                        {opt.surcharge === 0 ? 'Complimentary' : `+${formatPrice(opt.surcharge, currency)}`}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Size Selector if Tailored */}
                {blouseOption !== 'unstitched' && (
                  <div className="mt-3 pt-3 border-t border-[#292524]">
                    <label className="block text-[11px] uppercase tracking-wider text-[#a8a29e] mb-1.5">
                      Select Tailored Bust Size (Inches)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(['XS (32)', 'S (34)', 'M (36)', 'L (38)', 'XL (40)', 'Custom Tailored'] as const).map(
                        (sz) => (
                          <button
                            key={sz}
                            onClick={() => setBlouseSize(sz)}
                            className={`py-1 px-2.5 rounded text-xs transition-all ${
                              blouseSize === sz
                                ? 'bg-[#d4af37] text-[#0c0a09] font-bold'
                                : 'bg-[#12100e] border border-[#2b241d] text-[#d6d3d1] hover:border-[#d4af37]'
                            }`}
                          >
                            {sz}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Complimentary Finishing & Gifting Add-ons */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#161310] border border-[#2b241d] cursor-pointer hover:border-[#3d332a]">
                  <input
                    type="checkbox"
                    checked={fallPico}
                    onChange={(e) => setFallPico(e.target.checked)}
                    className="w-4 h-4 accent-[#d4af37] rounded"
                  />
                  <div className="flex-1 text-left">
                    <p className="text-xs font-medium text-[#f5f2eb]">Pre-Finished Fall & Pico</p>
                    <p className="text-[10px] text-[#a8a29e]">Hand-stitched cotton fall and edge locking (Complimentary)</p>
                  </div>
                  <span className="text-[11px] text-[#22c55e] font-semibold">FREE</span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#161310] border border-[#2b241d] cursor-pointer hover:border-[#3d332a]">
                  <input
                    type="checkbox"
                    checked={giftPackaging}
                    onChange={(e) => setGiftPackaging(e.target.checked)}
                    className="w-4 h-4 accent-[#d4af37] rounded"
                  />
                  <div className="flex-1 text-left">
                    <p className="text-xs font-medium text-[#f5f2eb]">Royal Velvet Keepsake Box & Personalized Card</p>
                    <p className="text-[10px] text-[#a8a29e]">Embossed gold foil casing, wrapped in unbleached muslin</p>
                  </div>
                  <span className="text-[11px] text-[#d4af37] font-semibold">+{formatPrice(500, currency)}</span>
                </label>

                {giftPackaging && (
                  <textarea
                    placeholder="Enter your handwritten personalized calligraphy note..."
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    rows={2}
                    className="w-full bg-[#12100e] border border-[#332a24] rounded-lg p-2.5 text-xs text-[#f5f2eb] placeholder-[#78716c] focus:outline-none focus:border-[#d4af37]"
                  />
                )}
              </div>

              {/* Technical Specifications Accordion / Quick List */}
              <div className="border-t border-[#292524] pt-4 mb-6">
                <h4 className="text-xs uppercase tracking-wider text-[#a8a29e] mb-3 font-semibold">
                  Artisan Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2 rounded bg-[#16120f] border border-[#241f1a]">
                    <span className="text-[10px] text-[#78716c] uppercase block">Fabric</span>
                    <span className="text-[#f5f2eb] font-medium">{product.fabric}</span>
                  </div>
                  <div className="p-2 rounded bg-[#16120f] border border-[#241f1a]">
                    <span className="text-[10px] text-[#78716c] uppercase block">Zari Type</span>
                    <span className="text-[#f5f2eb] font-medium">{product.zariType}</span>
                  </div>
                  <div className="p-2 rounded bg-[#16120f] border border-[#241f1a]">
                    <span className="text-[10px] text-[#78716c] uppercase block">Length</span>
                    <span className="text-[#f5f2eb] font-medium">{product.drapeLengthMeters} Meters with Blouse</span>
                  </div>
                  <div className="p-2 rounded bg-[#16120f] border border-[#241f1a]">
                    <span className="text-[10px] text-[#78716c] uppercase block">Origin</span>
                    <span className="text-[#f5f2eb] font-medium">{product.originRegion}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Quantity & Add to Cart */}
            <div className="pt-4 border-t border-[#292524] flex items-center gap-4">
              {/* Quantity selector */}
              <div className="flex items-center rounded-xl bg-[#1c1815] border border-[#332a24] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-sm text-[#f5f2eb] hover:text-[#d4af37]"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono font-medium text-[#f5f2eb]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="w-8 h-8 flex items-center justify-center text-sm text-[#f5f2eb] hover:text-[#d4af37]"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                id="add-to-bag-modal-btn"
                onClick={handleAdd}
                className="flex-1 py-4 px-6 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c29b2b] text-[#0c0a09] font-semibold text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-[#0c0a09]" />
                    <span>Added to Royal Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#0c0a09]" />
                    <span>Add to Royal Bag • {formatPrice(unitTotalINR * quantity, currency)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
