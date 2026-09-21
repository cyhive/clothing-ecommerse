import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Tag, Sparkles, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: (appliedDiscountPercent: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Surcharges mapping
  const blouseSurcharge = (item: CartItem) => {
    switch (item.blouseOption) {
      case 'boat_neck': return 1800;
      case 'deep_back': return 1500;
      case 'regal_full_sleeve': return 2400;
      default: return 0;
    }
  };

  const calculateItemPrice = (item: CartItem) => {
    return item.product.price + blouseSurcharge(item) + (item.giftPackaging ? 500 : 0);
  };

  const rawSubtotal = items.reduce((acc, item) => acc + calculateItemPrice(item) * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * (discountPercent / 100));
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  // Free shipping threshold in INR
  const freeShippingThreshold = 15000;
  const freeShippingProgress = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);

  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    const codeClean = couponCode.trim().toUpperCase();
    if (codeClean === 'ROYAL15') {
      setDiscountPercent(15);
      setCouponSuccess('15% Royal Privilege code applied successfully!');
    } else if (codeClean === 'FESTIVE10') {
      setDiscountPercent(10);
      setCouponSuccess('10% Festive Privilege applied!');
    } else {
      setCouponError('Invalid or expired privilege code. Try ROYAL15.');
    }
  };

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
          className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-screen max-w-md bg-[#13100e] border-l border-[#332a24] shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#292524] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-base font-display-regal font-semibold uppercase tracking-wider text-[#f5f2eb]">
                  Your Royal Bag ({items.reduce((sum, it) => sum + it.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#1c1815] border border-[#332a24] text-[#a8a29e] hover:text-[#f5f2eb] flex items-center justify-center transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-6 py-3.5 bg-[#181512] border-b border-[#292524]">
              <div className="flex justify-between items-center text-[11px] mb-1.5">
                <span className="text-[#a8a29e]">
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-[#22c55e] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Complimentary Worldwide Insured Delivery Unlocked!
                    </span>
                  ) : (
                    <>Add {formatPrice(remainingForFreeShipping, currency)} more for Free Shipping</>
                  )}
                </span>
                <span className="font-mono text-[#d4af37] font-semibold">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#26201b] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#d4af37] to-[#f59e0b] transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="py-20 text-center">
                  <ShoppingBag className="w-12 h-12 text-[#3d332a] mx-auto mb-4" />
                  <p className="text-sm font-serif-luxury text-[#fbf8f2] mb-1">Your bag is presently empty.</p>
                  <p className="text-xs text-[#78716c] mb-6">Discover master handlooms from our curated vault.</p>
                  <button
                    onClick={onClose}
                    className="py-2.5 px-6 rounded-full bg-[#d4af37] text-[#0c0a09] text-xs font-semibold uppercase tracking-wider"
                  >
                    Explore Vault
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const unitCost = calculateItemPrice(item);

                  return (
                    <div
                      key={item.cartItemId}
                      className="p-3.5 rounded-2xl bg-[#181412] border border-[#2b241d] flex gap-3.5 relative group"
                    >
                      {/* Image */}
                      <img
                        src={item.product.images.drape}
                        alt={item.product.title}
                        className="w-20 h-24 rounded-xl object-cover object-top shrink-0 border border-[#2e2720]"
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-serif-luxury font-bold text-[#fbf8f2] leading-snug truncate">
                              {item.product.title}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.cartItemId)}
                              className="text-[#78716c] hover:text-[#ef4444] transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-[10px] text-[#a8a29e] mt-0.5">
                            {item.product.weaveType} • {item.blouseOption === 'unstitched' ? 'Unstitched Blouse' : `Blouse: ${item.blouseSize}`}
                          </p>

                          {item.giftPackaging && (
                            <span className="inline-block text-[9px] text-[#d4af37] bg-[#241c14] border border-[#3d3023] px-1.5 py-0.5 rounded mt-1">
                              Velvet Gift Box
                            </span>
                          )}
                        </div>

                        {/* Quantity Stepper & Price */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#26201a] mt-2">
                          <div className="flex items-center rounded-lg bg-[#12100e] border border-[#2e261f]">
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                              className="w-6 h-6 text-xs text-[#a8a29e] hover:text-[#f5f2eb] flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-mono text-[#f5f2eb]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                              className="w-6 h-6 text-xs text-[#a8a29e] hover:text-[#f5f2eb] flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-xs font-semibold text-[#f5f2eb]">
                            {formatPrice(unitCost * item.quantity, currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer: Coupon & Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-[#181512] border-t border-[#292524] space-y-4">
                {/* Coupon Code Section */}
                <div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#78716c] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Privilege Code (try ROYAL15)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full bg-[#12100e] border border-[#332a24] rounded-xl py-2 pl-9 pr-3 text-xs uppercase tracking-wider text-[#f5f2eb] placeholder-[#78716c] focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      className="py-2 px-4 rounded-xl bg-[#26201a] border border-[#3d332a] hover:border-[#d4af37] text-xs font-medium text-[#d4af37] transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponSuccess && (
                    <p className="text-[11px] text-[#22c55e] mt-1.5 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{couponSuccess}</span>
                    </p>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-[#ef4444] mt-1.5">
                      {couponError}
                    </p>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#a8a29e]">
                    <span>Loom Subtotal</span>
                    <span>{formatPrice(rawSubtotal, currency)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#22c55e]">
                      <span>Royal Privilege Discount ({discountPercent}%)</span>
                      <span>-{formatPrice(discountAmount, currency)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#a8a29e]">
                    <span>Insured Air Courier</span>
                    <span>
                      {remainingForFreeShipping === 0 ? (
                        <span className="text-[#22c55e] font-medium">COMPLIMENTARY</span>
                      ) : (
                        formatPrice(1200, currency)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-semibold text-[#f5f2eb] pt-2 border-t border-[#292524]">
                    <span>Total Amount</span>
                    <span className="font-display-regal text-base text-[#d4af37]">
                      {formatPrice(
                        finalTotal + (remainingForFreeShipping === 0 ? 0 : 1200),
                        currency
                      )}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  id="cart-checkout-proceed-btn"
                  onClick={() => onCheckout(discountPercent)}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c29b2b] text-[#0c0a09] font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#78716c]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>256-Bit Encrypted Checkout • Insured Dispatch Guarantee</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
