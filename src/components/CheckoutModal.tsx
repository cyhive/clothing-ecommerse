import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { X, ShieldCheck, CheckCircle2, CreditCard, Landmark, Truck, ArrowRight, Sparkles, Download, Check } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  discountPercent: number;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  discountPercent,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Delivery, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: 'Radhika Sharma',
    email: 'radhika.s@heritage.in',
    phone: '+91 98201 45892',
    address: '42, Mayur Villa, Maharani Bagh',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110065',
  });

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
  const shippingFee = rawSubtotal >= 15000 ? 0 : 1200;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleExecutePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrder = `AV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderNumber(randomOrder);
      setStep(3);

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#e5c158', '#b91c1c', '#047857', '#ffffff'],
        });
      } catch (err) {
        // Safe fallback
      }
    }, 1400);
  };

  const handleFinish = () => {
    onOrderCompleted();
    onClose();
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-[#14110e] border border-[#332a24] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#1c1815] border border-[#332a24] text-[#a8a29e] hover:text-[#f5f2eb] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Checkout Steps Header */}
          <div className="flex items-center justify-between border-b border-[#292524] pb-5 mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
                Insured Royal Courier
              </span>
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#fbf8f2]">
                {step === 1 && 'Delivery & Atelier Dispatch'}
                {step === 2 && 'Select Payment Sanctuary'}
                {step === 3 && 'Imperial Order Confirmed'}
              </h2>
            </div>
            
            {/* Step badges */}
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full text-xs flex items-center justify-center font-bold ${
                  step >= 1 ? 'bg-[#d4af37] text-[#0c0a09]' : 'bg-[#29221b] text-[#78716c]'
                }`}
              >
                1
              </span>
              <span className="w-4 h-[1px] bg-[#332a24]" />
              <span
                className={`w-7 h-7 rounded-full text-xs flex items-center justify-center font-bold ${
                  step >= 2 ? 'bg-[#d4af37] text-[#0c0a09]' : 'bg-[#29221b] text-[#78716c]'
                }`}
              >
                2
              </span>
              <span className="w-4 h-[1px] bg-[#332a24]" />
              <span
                className={`w-7 h-7 rounded-full text-xs flex items-center justify-center font-bold ${
                  step === 3 ? 'bg-[#22c55e] text-[#0c0a09]' : 'bg-[#29221b] text-[#78716c]'
                }`}
              >
                ✓
              </span>
            </div>
          </div>

          {/* Step 1: Shipping Address Form */}
          {step === 1 && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a29e] mb-1.5">
                    Patron Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#181512] border border-[#332a24] rounded-xl p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a29e] mb-1.5">
                    Contact Phone (For Courier Updates)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#181512] border border-[#332a24] rounded-xl p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a8a29e] mb-1.5">
                  Email Address for Royal Certificate
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#181512] border border-[#332a24] rounded-xl p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a8a29e] mb-1.5">
                  Delivery Address / Mansion / Suite
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#181512] border border-[#332a24] rounded-xl p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a29e] mb-1.5">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#181512] border border-[#332a24] rounded-xl p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a29e] mb-1.5">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#181512] border border-[#332a24] rounded-xl p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a29e] mb-1.5">Pincode</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-[#181512] border border-[#332a24] rounded-xl p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Order total preview */}
              <div className="pt-4 border-t border-[#292524] flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#78716c] uppercase">Payable at Dispatch</p>
                  <p className="text-xl font-display-regal font-semibold text-[#d4af37]">
                    {formatPrice(grandTotal, currency)}
                  </p>
                </div>
                <button
                  type="submit"
                  className="py-3.5 px-7 rounded-full bg-[#d4af37] hover:bg-[#e5c158] text-[#0c0a09] font-bold text-xs uppercase tracking-[0.18em] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment Simulation */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-3">
                {[
                  {
                    id: 'upi',
                    label: 'Instant UPI / QR (Google Pay, PhonePe, Paytm)',
                    subtext: '0% Surcharge • Instant Priority Dispatch Verification',
                    icon: Sparkles,
                  },
                  {
                    id: 'card',
                    label: 'Luxury Concierge Cards (Visa, MasterCard, Amex)',
                    subtext: '3D Secure 256-Bit Bank Encryption',
                    icon: CreditCard,
                  },
                  {
                    id: 'netbanking',
                    label: 'Direct Bank NetBanking (HDFC, ICICI, SBI, Axis)',
                    subtext: 'Authorized Institutional Gateway',
                    icon: Landmark,
                  },
                  {
                    id: 'cod',
                    label: 'Verified Cash on Delivery',
                    subtext: 'Inspect your saree upon arrival with our white-glove courier',
                    icon: Truck,
                  },
                ].map((m) => {
                  const IconComp = m.icon;
                  const isSelected = paymentMethod === m.id;

                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#d4af37] bg-[#221c17] shadow-xl ring-1 ring-[#d4af37]/40'
                          : 'border-[#292524] bg-[#16120f] hover:border-[#3d332a]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-[#d4af37] text-[#0c0a09]' : 'bg-[#221c17] text-[#a8a29e]'
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#f5f2eb]">{m.label}</p>
                          <p className="text-[11px] text-[#a8a29e] mt-0.5">{m.subtext}</p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#d4af37] bg-[#d4af37]' : 'border-[#3d332a]'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#0c0a09]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Order total recap */}
              <div className="p-4 rounded-xl bg-[#181512] border border-[#2b241d] flex items-center justify-between text-xs">
                <span className="text-[#a8a29e]">Dispatch to: {formData.city}, {formData.state}</span>
                <span className="font-semibold text-[#fbf8f2]">{formatPrice(grandTotal, currency)}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-5 rounded-full border border-[#332a24] text-[#a8a29e] hover:text-[#f5f2eb] text-xs uppercase tracking-wider"
                >
                  Back to Address
                </button>

                <button
                  id="checkout-confirm-pay-btn"
                  type="button"
                  disabled={isProcessing}
                  onClick={handleExecutePayment}
                  className="flex-1 py-4 px-7 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c29b2b] text-[#0c0a09] font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Authenticating Transaction...</span>
                  ) : (
                    <span>Authorize Payment • {formatPrice(grandTotal, currency)}</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Royal Confirmation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              {/* Gold Seal Icon */}
              <div className="w-20 h-20 rounded-full bg-[#241c14] border-2 border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                  Handloom Registry Enrolled
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#fbf8f2] mt-1">
                  Thank You, {formData.fullName}
                </h3>
                <p className="text-xs sm:text-sm text-[#a8a29e] max-w-md mx-auto mt-2">
                  Your bespoke handloom order has been recorded in the Aura Vastra master ledger. A wax-sealed certificate of silk authenticity will accompany your parcel.
                </p>
              </div>

              {/* Order Reference Badge */}
              <div className="p-4 rounded-2xl bg-[#1a1613] border border-[#332a24] max-w-md mx-auto text-left space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#78716c] uppercase">Order Reference:</span>
                  <span className="font-mono font-bold text-[#d4af37] text-sm">{orderNumber}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#78716c] uppercase">Estimated Dispatch:</span>
                  <span className="text-[#f5f2eb] font-medium">Within 48 Hours via Air Express</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#78716c] uppercase">Destination:</span>
                  <span className="text-[#f5f2eb] truncate max-w-[200px]">{formData.city}, {formData.pincode}</span>
                </div>
              </div>

              {/* Finishing Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleFinish}
                  className="py-3.5 px-8 rounded-full bg-[#d4af37] text-[#0c0a09] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#e5c158] transition-all cursor-pointer shadow-lg"
                >
                  Return to Royal Vault
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
