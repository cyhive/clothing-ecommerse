/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SAREE_CATALOG } from './data/sarees';
import { SareeProduct, CartItem, Currency } from './types';
import { Navbar } from './components/Navbar';
import { HeroParallax } from './components/HeroParallax';
import { ParallaxShowcase } from './components/ParallaxShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { VirtualDrapeVisualizer } from './components/VirtualDrapeVisualizer';
import { ArtisanParallaxStory } from './components/ArtisanParallaxStory';
import { CustomerTestimonials } from './components/CustomerTestimonials';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { Check, Heart } from 'lucide-react';

export default function App() {
  // Currency State
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('aura_vastra_currency');
      return (saved as Currency) || 'INR';
    } catch {
      return 'INR';
    }
  });

  // Cart State with Local Storage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_vastra_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with Local Storage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura_vastra_wishlist');
      return saved ? JSON.parse(saved) : ['saree-01', 'saree-02'];
    } catch {
      return ['saree-01', 'saree-02'];
    }
  });

  // Modals and Drawers
  const [selectedProduct, setSelectedProduct] = useState<SareeProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeWeaveFilter, setActiveWeaveFilter] = useState<string>('All');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);

  // Toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('aura_vastra_currency', currency);
    } catch (e) {}
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_vastra_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_vastra_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {}
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart Handlers
  const handleAddToCart = (newItem: Omit<CartItem, 'cartItemId'>) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === newItem.product.id &&
        item.blouseOption === newItem.blouseOption &&
        item.blouseSize === newItem.blouseSize &&
        item.fallPicoIncluded === newItem.fallPicoIncluded &&
        item.giftPackaging === newItem.giftPackaging
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += newItem.quantity;
      setCartItems(updated);
    } else {
      const cartItemId = `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      setCartItems((prev) => [...prev, { ...newItem, cartItemId }]);
    }
    showToast(`Added ${newItem.product.title} to Bag`);
  };

  const handleQuickAddToCart = (product: SareeProduct) => {
    handleAddToCart({
      product,
      quantity: 1,
      blouseOption: 'unstitched',
      blouseSize: 'Unstitched',
      fallPicoIncluded: true,
      giftPackaging: false,
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
    } else {
      setCartItems((prev) =>
        prev.map((it) => (it.cartItemId === cartItemId ? { ...it, quantity: newQty } : it))
      );
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  // Wishlist Handlers
  const handleToggleWishlist = (productId: string) => {
    if (wishlistIds.includes(productId)) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from Saved Vault');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      showToast('Saved to Royal Vault');
    }
  };

  // Smooth Navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSelectWeaveFilter = (weave: string) => {
    setActiveWeaveFilter(weave);
    scrollToSection('catalog');
  };

  const handleProceedToCheckout = (discountPercent: number) => {
    setAppliedDiscountPercent(discountPercent);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
    showToast('Your order has been recorded with our master loom registry.');
  };

  // Derived Values
  const cartCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, it) => {
    let itemPrice = it.product.price;
    if (it.blouseOption === 'boat_neck') itemPrice += 1800;
    if (it.blouseOption === 'deep_back') itemPrice += 1500;
    if (it.blouseOption === 'regal_full_sleeve') itemPrice += 2400;
    if (it.giftPackaging) itemPrice += 500;
    return sum + itemPrice * it.quantity;
  }, 0);

  const wishlistProducts = SAREE_CATALOG.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="relative min-h-screen bg-[#0c0a09] text-[#f5f2eb] font-sans selection:bg-[#d4af37]/30 selection:text-[#fbf8f2]">
      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        wishlistCount={wishlistIds.length}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Hero Section with Parallax Scrolling */}
      <main>
        <HeroParallax
          onExploreVault={() => scrollToSection('catalog')}
          onOpenDrapeStudio={() => scrollToSection('drape-studio')}
        />

        {/* The 4 Imperial Weaves Parallax Showcase */}
        <ParallaxShowcase onSelectWeaveFilter={handleSelectWeaveFilter} />

        {/* Curated Saree Catalog with Comprehensive Filters */}
        <ProductCatalog
          products={SAREE_CATALOG}
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={setSelectedProduct}
          onQuickAddToCart={handleQuickAddToCart}
          initialWeaveFilter={activeWeaveFilter}
        />

        {/* Virtual Drape Studio & Silhouette Simulator */}
        <VirtualDrapeVisualizer
          currency={currency}
          onSelectProduct={setSelectedProduct}
        />

        {/* The 108 Hours of Craft Parallax Story */}
        <ArtisanParallaxStory />

        {/* Royal Brides & Patron Chronicles */}
        <CustomerTestimonials />
      </main>

      {/* Royal Atelier Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        currency={currency}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleProceedToCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        currency={currency}
        onRemoveWishlist={(id) => setWishlistIds((prev) => prev.filter((x) => x !== id))}
        onMoveToCart={handleQuickAddToCart}
        onSelectProduct={setSelectedProduct}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        discountPercent={appliedDiscountPercent}
        onOrderCompleted={handleOrderCompleted}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currency={currency}
        onSelectProduct={setSelectedProduct}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 py-3 px-5 rounded-full bg-[#1c1815] border border-[#d4af37] text-xs text-[#f5f2eb] shadow-2xl flex items-center gap-2.5 backdrop-blur-md"
          >
            <Check className="w-4 h-4 text-[#d4af37]" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
