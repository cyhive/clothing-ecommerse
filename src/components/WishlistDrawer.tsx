import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SareeProduct, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: SareeProduct[];
  currency: Currency;
  onRemoveWishlist: (id: string) => void;
  onMoveToCart: (product: SareeProduct) => void;
  onSelectProduct: (product: SareeProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onRemoveWishlist,
  onMoveToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-screen max-w-md bg-[#13100e] border-l border-[#332a24] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#292524] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-[#b91c1c] fill-[#b91c1c]" />
                <h3 className="text-base font-display-regal font-semibold uppercase tracking-wider text-[#f5f2eb]">
                  Saved Weaves ({wishlistProducts.length})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#1c1815] border border-[#332a24] text-[#a8a29e] hover:text-[#f5f2eb] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlistProducts.length === 0 ? (
                <div className="py-24 text-center">
                  <Heart className="w-12 h-12 text-[#332a24] mx-auto mb-3" />
                  <p className="text-sm font-serif-luxury text-[#fbf8f2] mb-1">Your wishlist is empty.</p>
                  <p className="text-xs text-[#78716c] mb-6">Tap the heart icon on any drape to save it for later.</p>
                  <button
                    onClick={onClose}
                    className="py-2.5 px-6 rounded-full bg-[#d4af37] text-[#0c0a09] text-xs font-semibold uppercase tracking-wider"
                  >
                    Browse Weaves
                  </button>
                </div>
              ) : (
                wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl bg-[#181412] border border-[#2b241d] flex gap-3.5 group"
                  >
                    <img
                      src={product.images.drape}
                      alt={product.title}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="w-20 h-24 rounded-xl object-cover object-top shrink-0 cursor-pointer border border-[#2e2720]"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4
                            onClick={() => {
                              onSelectProduct(product);
                              onClose();
                            }}
                            className="text-xs font-serif-luxury font-bold text-[#fbf8f2] truncate hover:text-[#d4af37] cursor-pointer"
                          >
                            {product.title}
                          </h4>
                          <button
                            onClick={() => onRemoveWishlist(product.id)}
                            className="text-[#78716c] hover:text-[#ef4444] transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-[#a8a29e] mt-0.5">{product.weaveType} • {product.fabric}</p>
                        <p className="text-xs font-semibold text-[#d4af37] mt-1 font-display-regal">
                          {formatPrice(product.price, currency)}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          onMoveToCart(product);
                          onRemoveWishlist(product.id);
                        }}
                        className="py-1.5 px-3 rounded-xl bg-[#26201a] border border-[#3d332a] hover:border-[#d4af37] text-xs text-[#d4af37] font-medium flex items-center justify-center gap-1.5 transition-all mt-2 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
